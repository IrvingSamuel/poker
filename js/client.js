var Client = {};
Client.socket = io.connect();

Client.sendTest = function(){
    console.log("test sent");
    Client.socket.emit('test');
};

Client.verifyPlayers = function(){
    Client.socket.emit('verify');
};

Client.askNewPlayer = function(sprite){
    console.log('asking...');
    Client.socket.emit('newplayer',sprite);
};

Client.sendClick = function(x,y,movement){
    Client.socket.emit('click',{x:x,y:y,movement:movement});
};

Client.getTurns = function(){
    Client.socket.emit('getTurns');
};

Client.getMao = function(){
    Client.socket.emit('getMao');
};

Client.socket.on('allplayers',function(data,client){
    for(var i = 0; i < data.length; i++){
        Game.addNewPlayer(data[i].id,data[i].x,data[i].y,client,data[i].sprite);
    }

    Client.socket.on('move',function(data,movement){
        Game.movePlayer(data.id,data.x,data.y,movement);
    });

    Client.socket.on('remove',function(id){
        Game.removePlayer(id);
    });
});

Client.socket.on('refreshplayers',function(data, client){
    for(var i = 0; i < data.length; i++){
        Game.resetPlayers(data[i].id,data[i].x,data[i].y, client, data[i].sprite);
    }
});


