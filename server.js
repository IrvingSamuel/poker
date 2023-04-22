var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
const mysql = require('mysql');
const poker = require('./js/poker.js');


app.use('/js',express.static(__dirname + '/js'));
app.use('/assets',express.static(__dirname + '/assets'));
app.use('/svgs',express.static(__dirname + '/svgs'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

app.get('/jogo',function(req,res){
    res.sendFile(__dirname+'/jogo.html');
});



server.lastPlayderID = 0;
server.allHands = [];
server.table = [];

server.listen(process.env.PORT || 8081,function(){
    console.log('Listening on '+server.address().port);
});

io.on('connection',function(socket){

    socket.on('newplayer',function(sprite){
        console.log('generating player...')
        socket.player = {
            id: server.lastPlayderID++,
            x: 100,//randomInt(200,400),
            y: 450,//randomInt(200,400)
            sprite: sprite
        };
        server.lastPlayers = getAllPlayers();
        socket.emit('allplayers',server.lastPlayers,socket.player.id);
        socket.broadcast.emit('newplayer',socket.player);

        socket.on('click',function(data){
            // console.log('click to '+data.x+', '+data.y+', '+socket.player.id);
            socket.player.x = data.x;
            socket.player.y = data.y;
            io.emit('move',socket.player,data.movement);
        });

        socket.on('disconnect',function(){
            if(socket.player.id == socket.isaac){
                socket.isaac = -1;
            }
            io.emit('remove',socket.player.id);
        });

        socket.on('shot',function(data){
            console.log('generating bullet...');
            console.log(data);
            socket.emit('generateShot',data); 
            socket.broadcast.emit('generateShot',data);            
        });

        socket.on('reach',function(id){
            console.log('removing bullet...');
            socket.emit('removeBullet',id); 
            socket.broadcast.emit('removeBullet',id);            
        });

        socket.on('roll',function(data){
            console.log('generating roll...');
            socket.emit('generateRoll',data); 
            socket.broadcast.emit('generateRoll',data);            
        });
        
        socket.on('verify',function(){
            server.verify = getAllPlayers();
            if(server.verify != server.lastPlayers){
                server.lastPlayers = server.verify;
                socket.emit('refreshplayers',server.lastPlayers,socket.player.id);
            }
            
        });
    });

    socket.on('test',function(){
        console.log('test received');
    });

    socket.on('getTurn',function(){
        console.log('Buscando...');
        var playersturn;
        getTurns(function(result){
            playersturn = result;
            socket.emit('turns',playersturn);   
        });     
    });

    socket.on('getMao',function(){
        console.log('Distribuindo cartas...');
        var mao = poker.getmao(server.allHands);
        for(var x = 0; x < 2; x++){
            server.allHands.push(mao[x]);
        }
        console.log(mao);
        console.log('Todas as Cartas: ', server.allHands);
        socket.emit('mao',mao);
    });
});

function getTurns(callback){
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'bdrtv',
      });
    connection.connect((error) => {
        if(error){
          console.log('Error connecting to the MySQL Database');
          return;
        }
        console.log('Conectado com sucesso, buscando informação');
      });
    connection.query("SELECT * FROM players ORDER BY nome ASC", function (err, result, fields) {
        if (err) throw err;
        var query = {};
        Object.keys(result).forEach(function(ID){
            var rows = result[ID];
            Object.keys(rows).forEach(function(key){
                var row = rows[key];
                query[`${key}`] = `${row}`;
            });
        });
        return callback(query);
    });
    connection.end((error) => {
    });
}

function getAllPlayers(){
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var player = io.sockets.connected[socketID].player;
        if(player) players.push(player);
    });
    return players;
}
function getNewPlayers(){
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var player = io.sockets.connected[socketID].player;
        if((player) && lastPlayers.includes(player) == false){
            players.push(player);
            lastPlayers.push(player);
        }
    });
    return players;
}

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
