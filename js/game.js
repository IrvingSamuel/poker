var Game = {};

Game.preload = function()
    {
        this.load.image('felt', 'assets/felt.png');
        this.load.image('0', 'svgs/00.svg');
        this.load.image('00', 'assets/p.png');
        for(var cont = 1; cont <= 52; cont++){
            this.load.image(`${cont}`, `svgs/${cont}.svg`);
        }
}

Game.create = function()
    {   
        let scale = (cw)/629;
        let textStyle = {fontSize: `${font}px`, fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }
        this.add.image(midw, midh, 'felt').setScale(scale);
        title = this.add.text(10, 10, '', textStyle);
        potet = this.add.text(10, midh, `Pote atual: $ ${pote},00`, textStyle);
        dinheiromt = this.add.text(10, 100, `Dinheiro da Mesa: $ ${dinheirom},00`, textStyle);
        dinheiropt = this.add.text(10, ch -30, `Dinheiro do Player: $ ${dinheirop},00`, textStyle);
        ct1 = this.physics.add.image(-150, midh, '0').setScale(zoomb);
        ct2 = this.physics.add.image(-150, midh, '0').setScale(zoomb);
        ct3 = this.physics.add.image(-150, midh, '0').setScale(zoomb);
        ct4 = this.physics.add.image(-150, midh, '0').setScale(zoomb);
        ct5 = this.physics.add.image(-150, midh, '0').setScale(zoomb);
        cd1 = this.physics.add.image(mao1, -200, '0').setScale(zoomb).setInteractive().on('pointerdown', async function (){
            if(cd1.x == mao1){
                while(cd1.x != mao1-60){
                    cd1.x = cd1.x - 5;
                    cd2.x = cd2.x + 5;
                    await delay(10);
                }
            }
            else{
                while(cd1.x != mao1){
                    cd1.x = cd1.x + 5;
                    cd2.x = cd2.x - 5;
                    await delay(10);
                }
            }
        });
        cd2 = this.physics.add.image(mao2, -200, '0').setScale(zoomb).setInteractive().on('pointerdown', async function (){
            if(cd1.x == mao1){
                while(cd1.x != mao1-60){
                    cd1.x = cd1.x - 5;
                    cd2.x = cd2.x + 5;
                    await delay(10);
                }
            }
            else{
                while(cd1.x != mao1){
                    cd1.x = cd1.x + 5;
                    cd2.x = cd2.x - 5;
                    await delay(10);
                }
            }
        });
        cm1 = this.physics.add.image(mao1, ch+200, '0').setScale(zoomb).setInteractive().on('pointerdown', async function (){
            if(cm1.x == mao1){
                while(cm1.x != mao1-60){
                    cm1.x = cm1.x - 5;
                    cm2.x = cm2.x + 5;
                    await delay(10);
                }
            }
            else{
                while(cm1.x != mao1){
                    cm1.x = cm1.x + 5;
                    cm2.x = cm2.x - 5;
                    await delay(10);
                }
            }
        });
        cm2 = this.physics.add.image(mao2, ch+200, '0').setScale(zoomb).setInteractive().on('pointerdown', async function (){
            if(cm1.x == mao1){
                while(cm1.x != mao1-60){
                    cm1.x = cm1.x - 5;
                    cm2.x = cm2.x + 5;
                    await delay(10);
                }
            }
            else{
                while(cm1.x != mao1){
                    cm1.x = cm1.x + 5;
                    cm2.x = cm2.x - 5;
                    await delay(10);
                }
            }
        });


        positiveButton = this.add.text(buttonS, vButton, 'Apostar', textStyle)
        .setOrigin(0.5)
        .setPadding(10)
        .setStyle({ fill: '#FFF', backgroundColor: '#26bf08' })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', function (){makeTurn(1);})
        .on('pointerover', () => positiveButton.setStyle({ fill: '#f39c12', backgroundColor: '#111' }))
        .on('pointerout', () => positiveButton.setStyle({ fill: '#FFF', backgroundColor: '#26bf08' }))

        neutralButton = this.add.text(buttonN, vButton, 'Entrar', textStyle)
        .setOrigin(0.5)
        .setPadding(10)
        .setStyle({ fill: '#FFF', backgroundColor: '#8c8c8c' })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', function (){makeTurn(2);})
        .on('pointerover', () => neutralButton.setStyle({ fill: '#f39c12', backgroundColor: '#111' }))
        .on('pointerout', () => neutralButton.setStyle({ fill: '#FFF', backgroundColor: '#8c8c8c' }))

        negativeButton = this.add.text(buttonP, vButton, 'Desistir', textStyle)
        .setOrigin(0.5)
        .setPadding(10)
        .setStyle({ fill: '#FFF', backgroundColor: '#bf0808' })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', function (){makeTurn(3);})
        .on('pointerover', () => negativeButton.setStyle({ fill: '#f39c12', backgroundColor: '#111' }))
        .on('pointerout', () => negativeButton.setStyle({ fill: '#FFF', backgroundColor: '#bf0808' }))

}
    
Game.update = function()
    {       
        if(playing == true){
            if(ingame == false){
                positiveButton.visible = false;
                neutralButton.visible = false;
                negativeButton.visible = false;
            }
            if(ct1.x < mesa1 - 10){
                this.physics.moveTo(ct1, mesa1, midh, 1000);
            }
            else{
                ct1.x = mesa1;
            }
            if(ct2.x < mesa2 - 10){
                this.physics.moveTo(ct2, mesa2, midh, 1000);
            }
            else{
                ct2.x = mesa2;
            }
            if(ct3.x < mesa3 - 10){
                this.physics.moveTo(ct3, mesa3, midh, 1000);
            }
            else{
                ct3.x = mesa3;
            }
            if(ct4.x < mesa4 - 10){
                this.physics.moveTo(ct4, mesa4, midh, 1000);
            }
            else{
                ct4.x = mesa4;
            }
            if(ct5.x < mesa5 - 10){
                this.physics.moveTo(ct5, mesa5, midh, 1000);
            }
            else{
                ct5.x = mesa5;
            }
            if(cm1.y > maoh + 10){
                this.physics.moveTo(cm1, mao1, maoh, 1000);
                this.physics.moveTo(cm2, mao2, maoh, 1000);
            }
            else{
                cm1.y = maoh;
                cm2.y = maoh;
            }
            if(cd1.y < delh - 10){
                this.physics.moveTo(cd1, mao1, delh, 1000);
                this.physics.moveTo(cd2, mao2, delh, 1000);
            }
            else{
                cd1.y = delh;
                cd2.y = delh;
            }
            if(ct5.x == mesa5){
                ingame = true;
                positiveButton.visible = true;
                neutralButton.visible = true;
                negativeButton.visible = true;
            }
        }
        if(playing == false){
            positiveButton.visible = false;
            neutralButton.visible = false;
            negativeButton.visible = false;
            if(ct1.x > cw){
                playing = true;
                ingame = false;
                ct1.x = -150;
                ct2.x = -150;
                ct3.x = -150;
                ct4.x = -150;
                ct5.x = -150;
                cm1.y = ch + 200;
                cm2.y = ch + 200;
                cd1.y = -200;
                cd2.y = -200;
                cm1.setTexture('0').setScale(zoomb);
                cm2.setTexture('0').setScale(zoomb);
                cd1.setTexture('0').setScale(zoomb);
                cd2.setTexture('0').setScale(zoomb);
                ct1.setTexture('0').setScale(zoomb);
                ct2.setTexture('0').setScale(zoomb);
                ct3.setTexture('0').setScale(zoomb);
                ct4.setTexture('0').setScale(zoomb);
                ct5.setTexture('0').setScale(zoomb);
                cm1.x = mao1;
                cm2.x = mao2;
                cd1.x = mao1;
                cd2.x = mao2;
                ingame = false;
                reveled = false;
                reveled1 = false;
                reveled2 = false;
                reveled3 = false;
                reveledr = false;
                round1 = false;
                round2 = false;
                round3 = false;
                result = false;
                mao = [];
                mesa = [];
                dealer = [];
                players = [];
                player = [];
                allhands = [];
                combop = [];
                comboc = [];
                kickersp = [];
                kickersc = [];
                vencedor = 0;
                p = 0;
                casa = 0;
                resultado = '';
                title.setText(`${resultado}`);
                // positiveButton.setText('Virar Cartas');
            }
        }
        if(ingame == true){
            if(cm1.scaleX > 0 && reveled == false){
                cm1.scaleX -= 0.055;
                cm2.scaleX -= 0.055;
            }
            else if(reveled == false){
                reveled = true;
                mao = getmao([]);
                dealer = getdealer(mao);
                cm1.setTexture(`${mao[0]}`).setScale(zoom);
                cm2.setTexture(`${mao[1]}`).setScale(zoom);
            }
            if(cm1.scaleX < zoom && reveled == true){
                cm1.scaleX += 0.05;
                cm2.scaleX += 0.05;
            }
            if(round1 == true){
                if(ct1.scaleX > 0 && reveled1 == false){
                    ct1.scaleX -= 0.055;
                    ct2.scaleX -= 0.055;
                    ct3.scaleX -= 0.055;
                }
                else if(reveled1 == false){
                    reveled1 = true;
                    mesa = getmesa(mao, dealer);
                    // positiveButton.setText('Virar Carta');
                    ct1.setTexture(`${mesa[0]}`).setScale(zoom);
                    ct2.setTexture(`${mesa[1]}`).setScale(zoom);
                    ct3.setTexture(`${mesa[2]}`).setScale(zoom);
                }
                if(ct1.scaleX < zoom && reveled1 == true){
                    ct1.scaleX += 0.05;
                    ct2.scaleX += 0.05;
                    ct3.scaleX += 0.05;
                }
            }
            if(round2 == true){
                if(ct4.scaleX > 0 && reveled2 == false){
                    ct4.scaleX -= 0.055;
                }
                else if(reveled2 == false){
                    mesa = turnosome(mesa,mao, dealer);
                    reveled2 = true;
                    // positiveButton.setText('Virar Carta');
                    ct4.setTexture(`${mesa[3]}`).setScale(zoom);
                }
                if(ct4.scaleX < zoom && reveled2 == true){
                    ct4.scaleX += 0.05;
                }
            }
            if(round3 == true){
                if(ct5.scaleX > 0 && reveled3 == false){
                    ct5.scaleX -= 0.055;
                }
                else if(reveled3 == false){
                    mesa = turnosome(mesa,mao, dealer);
                    reveled3 = true;
                    // positiveButton.setText('Ver Resultado');
                    ct5.setTexture(`${mesa[4]}`).setScale(zoom);
                }
                if(ct5.scaleX < zoom && reveled3 == true){
                    ct5.scaleX += 0.05;
                }
            }
            if(result == true){
                if(cd1.scaleX > 0 && reveledr == false){
                    cd1.scaleX -= 0.055;
                    cd2.scaleX -= 0.055;
                }
                else if(reveledr == false){
                    reveledr = true;
                    allhands.push(mao);
                    allhands.push(dealer);
                    cd1.setTexture(`${dealer[0]}`).setScale(zoom);
                    cd2.setTexture(`${dealer[1]}`).setScale(zoom);
                    // positiveButton.setText('Jogar Novamente');
                    for(var x = 0; x<allhands.length; x++){
                        var player = [];
                        resultado = calcularmao(allhands[x], mesa, x);
                        player.push(resultado[0]);
                        player.push(resultado[1]);
                        player.push(resultado[2]);
                        player.push(resultado[3]);
                        players.push(player);
                    }
                    if(players[0][1]>players[1][1]){
                        resultado =  players[0][0] + " Você ganhou da casa!";
                        vencedorap = 'p';
                    }
                    else if(players[0][1] == players[1][1]){
                        let combop = players[0][2];
                        let comboc = players[1][2];
                        let kickersp = players[0][3];
                        let kickersc = players[1][3];
                        for(var x = 0; x < combop.length; x++){
                            if(combop[x] > comboc[x]){
                                vencedor = 1;
                                resultado = "Ambos tiveram o mesmo jogo, mas o seu Jogo foi maior que o da casa!";
                                vencedorap = 'p';
                            }
                            else if(combop[x] < comboc[x]){
                                vencedor = 2;
                                resultado = "Ambos tiveram o mesmo jogo, mas a casa teve um Jogo maior que o seu!";
                                vencedorap = 'c';
                            }
                            if(vencedor != 0){
                                break;
                            }
                        }
                        if(vencedor == 0){
                            for(var x = 0; x < kickersp.length; x++){
                                if(kickersp[x] > kickersc[x]){
                                    vencedor = 1;
                                    resultado = "Ambos tiveram o mesmo jogo, mas o seu Kicker foi maior que o da casa!";
                                    vencedorap = 'p';
                                }
                                else if(kickersp[x] < kickersc[x]){
                                    vencedor = 2;
                                    resultado = "Ambos tiveram o mesmo jogo, mas a casa teve um Kicker maior que o seu!";
                                    vencedorap = 'c';
                                }
                                if(vencedor != 0){
                                    break;
                                }
                            }
                        }
                        if(vencedor == 0){
                            resultado = "Houve um empate, o pote será dividido!";
                            vencedorap = 'e';
                        }
    
                    }
                    else{
                        vencedorap = 'c';
                        resultado =  players[0][0] + " Mas a casa ganhou com";
                        casa = players[1][1];
                        if(casa == 10){
                            resultado =  resultado + " um Royal Straight Flush!";
                        }
                        else if(casa == 9){
                            resultado =  resultado + " um Straight Flush!";
                        }
                        else if(casa == 8){
                            resultado =  resultado + " uma Quadra!";
                        }
                        else if(casa == 7){
                            resultado =  resultado + " um Full House!";
                        }
                        else if(casa == 6){
                            resultado =  resultado + " um Flush!";
                        }
                        else if(casa == 5){
                            resultado =  resultado + " um Straight!";
                        }
                        else if(casa == 4){
                            resultado =  resultado + " uma Trinca!";
                        }
                        else if(casa == 3){
                            resultado =  resultado + " Dois Pares!";
                        }
                        else if(casa == 2){
                            resultado =  resultado + " um Par!";
                        }
                        else if(casa == 1){
                            resultado =  resultado + " uma Carta mais alta!";
                        }
                    }
                    title.setText(`${resultado}`);
                }
                if(cd1.scaleX < zoom && reveledr == true){
                    cd1.scaleX += 0.05;
                    cd2.scaleX += 0.05;
                }
            }
        }
        
}

function changePoint(choose){
    if(ingame == true){
        if(round1 == false){
            round1 = true;
            neutralButton.setText('Passar');
        }
        else if(round2 == false){
            round2 = true;
        }
        else if(round3 == false){
            round3 = true;
        }
        else if(result == false){
            result = true;
            positiveButton.visible = false;
            negativeButton.visible = false;
            neutralButton.setText('Jogar Novamente');
        }
        else if(playing == true){
            console.log(vencedor);
            if(vencedorap == 'p'){
                dinheirop += pote;
                pote = 0;
            }
            else if(vencedorap == 'c'){
                dinheirom += pote;
                pote = 0;
            }
            else{
                dinheirom += pote/2;
                dinheirop += pote/2;
                pote = 0;
            }
            if(dinheirom == 0){
                dinheirom = 1000;
            }
            potet.setText(`Pote atual: ${pote}`);
            dinheiropt.setText(`Dinheiro do Player: ${dinheirop}`);
            dinheiromt.setText(`Dinheiro da Mesa: ${dinheirom}`);
            neutralButton.setText('Entrar');
            playing = false;
        }
    }
}

function odd(choose){
    if(choose == 1){
        if(dinheirop > 0){
            pote += 100;
            apostap += 100;
            dinheirop -= 100;
            potet.setText(`Pote atual: ${pote}`);
            dinheiropt.setText(`Dinheiro do Player: ${dinheirop}`);
            // let decision = parseInt(Math.random() * 2);
            let decision = 1;
            if(decision == 1){
                pote += 100;
                apostam += 100;
                dinheirom -= 100;
                potet.setText(`Pote atual: ${pote}`);
                dinheiromt.setText(`Dinheiro da Mesa: ${dinheirom}`);
            }
            else{
                makeTurn(3);
            }
        }
        if(dinheirop == 0 || dinheirom == 0){
            makeTurn(3);
        }
    }
}

function makeTurn(turn){
    if(ingame == true){
        if(turn == 1){
            odd(turn);
        }
        else if(turn == 2){
            changePoint(turn);
        }
        else if(turn == 3){
            while(result == false){
                changePoint(turn);
            }
        }
    }
}

Game.addNewPlayer = function (id, x, y,client,sprite){
    playerids.push(id);
    if(me == -1 && id == client){
        me = client;
        indexMe = playerids.indexOf(me);
        spriteCli = spriteMe;
    }
    else{
        indexCli = playerids.indexOf(id);
        spriteCli = sprite;
    }
    if(id == client){
        Game.playerMap[id] = Cthis.physics.add.sprite(x, y, 'fake');
    }
    else{
        Game.playerMap[id] = Cthis.physics.add.sprite(x, y, `${spriteCli}`);
    }
}

Game.removePlayer = function(id){
    var index = playerids.indexOf(id);
    if (index !== -1) {
        playerids.splice(index, 1);
    }
    indexMe = playerids.indexOf(me);
};

Game.resetPlayers = function(id,x,y,client,sprite){
    found = 0;
    for(var i = 0; i < playerids.length; i++){
        if(id == playerids[i]){
            found = 1;
            break;
        }
    }
    if(found == 0){
        Game.addNewPlayer(id,x,y,client,sprite);
    }
};