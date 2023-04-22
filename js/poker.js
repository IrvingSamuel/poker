function getCard() {
    return Math.random() * (52 - 1) + 1;
}
//definição de variaveis
function getmao(hands){
    var number;
    var mao = [];
    while(mao.length < 2){
        number = parseInt(getCard());
        if(!mao.includes(number) && !hands.includes(number)){
            mao.push(number);
        }
    }
    return mao;
}
function getdealer(mao){
    var number;
    var dealer = [];
    while(dealer.length < 2){
        number = parseInt(getCard());
        if(!mao.includes(number) && !dealer.includes(number)){
            dealer.push(number);
        }
    }
    return dealer;
}
function getmesa(mao,dealer) {
    var number;
    var mesa = [];
    while(mesa.length < 3){
        number = parseInt(getCard());
        if(!mesa.includes(number) && !mao.includes(number) && !dealer.includes(number)){
            mesa.push(number);
        }
    }
    return mesa;
}

function turnosome(mesa,mao,dealer){
    var number;
    objetivo = mesa.length + 1;
    while(mesa.length < objetivo){
        number = parseInt(getCard());
        if(!mesa.includes(number) && !mao.includes(number) && !dealer.includes(number)){
            mesa.push(number);
        }
    }
    return mesa;
}

function calcularmao(mao, mesa, player){
    var maon = [];
    var mesan = [];
    var destaque = [];
    var destaquem = [];
    var kickers = [];
    var geral = [];

    var carta = 0;
    var combo = [];
    var combom = [];

    var par = false;
    var par2 = false;
    var trinca = false;
    var quadra = false;
    var mpar = false;
    var mpar2 = false;
    var mtrinca = false;
    var mquadra = false;

    var sequencia = 0;
    var sdestaque = [];
    var sdestaquem = [];
    var s = [];

    var flush = 0;
    var fdestaque = [];
    var fdestaquem = [];
    var nflush = 0;
    var f = [];
    var fd = [];
    var fdm = [];
    var nf = [];
    var nipe;
    var nl;
    var n;

    var counts = {};
    var countsm = {};

    //alterador para valor da mesa
    for (var i = 0; i < 5; i++) {
        carta = mesa[i];
        if(carta > 13){
            carta = carta - 13;
        }
        if(carta > 13){
            carta = carta - 13;
        }
        if(carta > 13){
            carta = carta - 13;
        }
        mesan.push(carta);
    }

    //alterador para valor da mão
    for (var i = 0; i < 2; i++) {
        carta = mao[i];
        if(carta > 13){
            carta = carta - 13;
        }
        if(carta > 13){
            carta = carta - 13;
        }
        if(carta > 13){
            carta = carta - 13;
        }
        maon.push(carta);
    }

    // mesan.sort(function(a, b){return a-b});
    // mesa.sort(function(a, b){return a-b});
    // maon.sort(function(a, b){return a-b});
    // mao.sort(function(a, b){return a-b});

    //definição de jogo na mão (Numérico)
    //par, dois pares e trica
    if (maon[1] == maon[0]){
        par = true;
        combo.push(maon[1]);
        destaque.push(0);
        destaque.push(1);
    }

    //straight
    if ((maon[1]+1) == maon[0]){
        if(!s.includes(maon[0])){
            s.push(maon[0]);
            sequencia = sequencia + 1;
            sdestaque.push(0);
        }
        if(!s.includes(maon[1])){
            s.push(maon[1]);
            sequencia = sequencia + 1;
            sdestaque.push(1);
        }
    }
    if ((maon[1]-1) == maon[0]){
        if(!s.includes(maon[0])){
            s.push(maon[0]);
            sequencia = sequencia + 1;
            sdestaque.push(0);
        }
        if(!s.includes(maon[1])){
            s.push(maon[1]);
            sequencia = sequencia + 1;
            sdestaque.push(1);
        }
    }
    if((maon[1] == 1 && maon[0] == 13) || (maon[0] == 1 && maon[1] == 13)){
        if(!s.includes(maon[0])){
            s.push(maon[0]);
            sequencia = sequencia + 1;
            sdestaque.push(0);
        }
        if(!s.includes(maon[1])){
            s.push(maon[1]);
            sequencia = sequencia + 1;
            sdestaque.push(1);
        }
    }
    //flush
    for (var i = 0; i < 2; i++){
        carta = mao[i];
        if(carta > 39){
            nipe = 4;
        }
        else if(carta > 26){
            nipe = 3;
        }
        else if(carta > 13){
            nipe = 2;
        }
        else {
            nipe = 1;
        }
        nl = nipe * 13;
        n = nl - 13
        for(var j = 0; j < 2; j++){
            carta = mao[j];
            if(carta > n && carta <= nl){
                if(!nf.includes(carta)){
                    nf.push(carta);
                    nflush = nflush + 1;
                    fd.push(j);
                } 
            }
        }
        for(var j = 0; j < 5; j++){
            carta = mesa[j];
            if(carta > n && carta <= nl){
                if(!nf.includes(carta)){
                    nf.push(carta);
                    nflush = nflush + 1;
                    fdm.push(j);
                }
            }
        }
        if(nflush > flush){
            flush = nflush;
            f = nf;
            fdestaque = fd;
            fdestaquem = fdm;
        }
        nflush = 0;
        nf = [];
        fd = [];
        fdm = [];
    }

    //definição de jogo da mesa
    for (var i = 0; i < 5; i++){
        for(var j = i; j < 5; j++){
            if(j!=i){
                if(mesan[i]==mesan[j]){
                    if(mpar == true){
                        if(combom.includes(mesan[i])){
                            mtrinca = true;
                            if(mpar2 == false){
                                mpar = false;
                            }
                            combom.push(mesan[i]);
                            destaquem.push(i);
                            destaquem.push(j);
                        }
                        else{
                            mpar2 = true;
                            combom.push(mesan[i]);
                            destaquem.push(i);
                            destaquem.push(j);
                        }
                    }
                    else if(mtrinca == true){
                        if(combom.includes(mesan[i])){
                            mquadra == true;
                            mtrinca == false;
                            combom.push(mesan[i]);
                            destaquem.push(i);
                            destaquem.push(j);
                        }
                    }
                    else{
                        mpar = true
                        combom.push(mesan[i]);
                        destaquem.push(i);
                        destaquem.push(j);
                    }
                }
            }
        }
    }

    //definição de jogo (Numérico)

    for (var i = 0; i < 5; i++) {
        carta = mesan[i];

        //verificação de par
        if(maon.includes(carta) && par == false){
            combo.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
            if (combo.includes(carta) && trinca == true){
                if(counts[`${carta}`]>=2){
                    quadra = true;
                    trinca = false;
                    combo.push(carta);
                    destaque.push(maon.indexOf(carta));
                    destaquem.push(i);
                    if(combom.includes(carta) && combom.length < 3){
                        mtrinca=false;
                    }
                }
            }
            else{
                par = true;
                combo.push(carta);
                destaque.push(maon.indexOf(carta));
                destaquem.push(i);
            } 
        }

        
        else if(maon.includes(carta) && par == true){
            //verificação de trinca
            if (combo.includes(carta)){
                trinca = true;
                if(par2 == false){
                    par = false;
                }
                combo.push(carta);
                destaquem.push(i);
                destaque.push(maon.indexOf(carta));
                if(combom.includes(carta) && combom.length < 2){
                    mpar=false;
                }
            }
            //verificação de 2 pares
            else{
                par2 = true;
                combo.push(carta);
                destaquem.push(i);
                destaque.push(maon.indexOf(carta));
            }
        }

        //verificação de straight
        if(sequencia < 7){
            if(maon.includes(carta-1)){
                if(!s.includes(carta-1)){
                    s.push(carta-1);
                    sdestaque.push(maon.indexOf(carta-1));
                    if(!s.includes(carta)){
                        s.push(carta);
                        sdestaquem.push(i);
                        sequencia = sequencia + 1;
                    }
                    sequencia = sequencia + 1;
                }
                if(!s.includes(carta)){
                    s.push(carta);
                    sdestaquem.push(i);
                    sequencia = sequencia + 1;
                }
            }
            if(maon.includes(carta+1)){
                if(!s.includes(carta+1)){
                    s.push(carta+1);
                    sdestaque.push(maon.indexOf(carta+1));
                    if(!s.includes(carta)){
                        s.push(carta);
                        sequencia = sequencia + 1;
                        sdestaquem.push(i);
                    }
                    sequencia = sequencia + 1;
                }
                if(!s.includes(carta)){
                    s.push(carta);
                    sequencia = sequencia + 1;
                    sdestaquem.push(i);
                }
            }
            if(mesan.includes(carta-1)){
                if(!s.includes(carta-1)){
                    s.push(carta-1);
                    sdestaquem.push(mesan.indexOf(carta-1));
                    if(!s.includes(carta)){
                        s.push(carta);
                        sequencia = sequencia + 1;
                        sdestaquem.push(i);
                    }
                    sequencia = sequencia + 1;
                }
                if(!s.includes(carta)){
                    s.push(carta);
                    sequencia = sequencia + 1;
                    sdestaquem.push(i);
                }
            }
            if(mesan.includes(carta+1)){
                if(!s.includes(carta+1)){
                    s.push(carta+1);
                    sdestaquem.push(mesan.indexOf(carta+1));
                    if(!s.includes(carta)){
                        s.push(carta);
                        sequencia = sequencia + 1;
                        sdestaquem.push(i);
                    }
                    sequencia = sequencia + 1;
                }
                if(!s.includes(carta)){
                    s.push(carta);
                    sequencia = sequencia + 1;
                    sdestaquem.push(i);
                }
            }
            if(carta == 1){
                if(maon.includes(13)){
                    if(!s.includes(13)){
                        s.push(13);
                        sdestaque.push(maon.indexOf(13));
                        sequencia = sequencia + 1;
                    }
                    if(!s.includes(carta)){
                        s.push(carta);
                        sequencia = sequencia + 1;
                        sdestaque.push(i);
                    }
                }
                if(mesan.includes(13)){
                    if(!s.includes(13)){
                        s.push(13);
                        sdestaquem.push(mesan.indexOf(13));
                        sequencia = sequencia + 1;
                    }
                    if(!s.includes(carta)){
                        s.push(carta);
                        sequencia = sequencia + 1;
                        sdestaquem.push(i);
                    }
                }
            }
            if(carta == 13){
                if(maon.includes(1)){
                    if(!s.includes(1)){
                        s.push(1);
                        sdestaque.push(maon.indexOf(1));
                        sequencia = sequencia + 1;
                    }
                    if(!s.includes(carta)){   
                        s.push(carta);
                        sequencia = sequencia + 1;
                        sdestaque.push(i);
                    }
                }
                if(mesan.includes(1)){
                    if(!s.includes(1)){
                        s.push(1);
                        sdestaquem.push(mesan.indexOf(1));
                        sequencia = sequencia + 1;
                    }
                    if(!s.includes(carta)){
                        s.push(carta);
                        sequencia = sequencia + 1;
                        sdestaquem.push(i);
                    }
                }
            }
        }
    }
    
    let sv = [];
    if(s.includes(13)){
        s.push(0);
    }
    let limit = s.length;
    s.sort(function(a, b){return a-b});
    sequencia = 0;
    let vezes = 1;
    //verificação sequencia correta
    for(var x = 0; x < limit; x++){        
        if(x!=0){
            if(sequencia != 5){
                if((s[x]-s[x-1]) != 1){
                    sequencia = 0;
                    sv = [];
                }
                else{
                    if(vezes == 1){
                        sequencia = sequencia + 1;
                        sv.push(s[x-1]);
                        vezes ++;
                    }
                    sv.push(s[x]);
                    sequencia = sequencia + 1;
                }
            }
            else{
                break;
            }
        }
    }
    s = sv;
    if(s.includes(0)){
        s.shift();
    }
    s = s.sort(function(a, b){return a-b});
    s = s.reverse();
    f = f.sort(function(a, b){return a-b});
    f = f.reverse();
    fn = [];
    for (var i = 0; i < f.length ; i++) {
        carta = f[i];
        if(carta > 13){
            carta = carta - 13;
        }
        if(carta > 13){
            carta = carta - 13;
        }
        if(carta > 13){
            carta = carta - 13;
        }
        fn.push(carta);
    }

    console.log("Mão: ",mao);
    console.log("Mesa: ",mesa);
    console.log("Mão numerica: ",maon);
    console.log("Mesa numerica: ",mesan);
    console.log("Combo de: ",combo);
    console.log("Combo da mesa: ",combom);
    console.log("Destaque Mão: ",destaque);
    console.log("Destaque Mesa: ",destaquem);
    console.log("Numeros de sequencia: ",sequencia);
    console.log("Destaque Mão Sequencia: ",sdestaque);
    console.log("Destaque Mesa Sequencia: ",sdestaquem);
    console.log("Sequencia: ",s);
    console.log("Numeros de flush: ",flush);
    console.log("Flush: ",fn);
    console.log("Destaque Mão Flush: ",fdestaque);
    console.log("Destaque Mesa Flush: ",fdestaquem);
    

    let comborn = []
    for(var x = 0; x < combo.length; x++){
        carta = combo[x]+1;
        if(!comborn.includes(carta)){
            comborn.push(carta);
        }
    }
    for(var x = 0; x < combom.length; x++){
        carta = combom[x]+1;
        if(!comborn.includes(carta)){
            comborn.push(carta);
        }
    }
    sr = []
    for(var x = 0; x < s.length; x++){
        carta = s[x]+1;
        if(carta==14){
            sr.push("A");
        }
        else if(carta==11){
            sr.push("J");
        }
        else if(carta==12){
            sr.push("Q");
        }
        else if(carta==13){
            sr.push("K");
        }
        else{
            sr.push(carta);
        }
    }
    fr = [];
    for(var x = 0; x < f.length; x++){
        carta = fn[x]+1;
        if(carta==14){
            fr.push("A");
        }
        else if(carta==11){
            fr.push("J");
        }
        else if(carta==12){
            fr.push("Q");
        }
        else if(carta==13){
            fr.push("K");
        }
        else{
            fr.push(carta);
        }
    }
    let combor = []
    for(var x = 0; x < comborn.length; x++){
        carta = comborn[x];
        if(carta==14){
            combor.push("A");
        }
        else if(carta==11){
            combor.push("J");
        }
        else if(carta==12){
            combor.push("Q");
        }
        else if(carta==13){
            combor.push("K");
        }
        else{
            combor.push(carta);
        }
    }

    combor = combor.sort(function(a, b){return a-b});
    combor = combor.reverse();
    comborn = comborn.sort(function(a, b){return a-b});
    comborn = comborn.reverse();
    s = s.sort(function(a, b){return a-b});
    s = s.reverse();
    f = f.sort(function(a, b){return a-b});
    f = f.reverse();
    for(var x = 0; x < 5; x++){
        if(x < 2){
            geral.push(maon[x]);
            geral.push(mesan[x]);
        }
        else{
            geral.push(mesan[x]);
        }
    }
    geral = geral.sort(function(a, b){return a-b});
    geral = geral.reverse();
    combo.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
    
    combom.forEach(function(x) { countsm[x] = (countsm[x] || 0)+1; });
    if(player == 0){
        if(flush<5 && sequencia<5 && quadra == false){
            for(var x = 0; x < destaque.length; x++){
                // document.getElementById(`mao${destaque[x]}`).style.borderStyle = 'solid';
                // document.getElementById(`mao${destaque[x]}`).style.borderRadius = '5%';
                // document.getElementById(`mao${destaque[x]}`).style.borderColor = 'lime';
            }
            for(var x = 0; x < destaquem.length; x++){
                // document.getElementById(`mesa${destaquem[x]}`).style.borderStyle = 'solid';
                // document.getElementById(`mesa${destaquem[x]}`).style.borderRadius = '5%';
                // document.getElementById(`mesa${destaquem[x]}`).style.borderColor = 'lime';
            }
        }
        else if((trinca == true || mtrinca == true) && (par == true || mpar == true)){
            for(var x = 0; x < destaque.length; x++){
                // document.getElementById(`mao${destaque[x]}`).style.borderStyle = 'solid';
                // document.getElementById(`mao${destaque[x]}`).style.borderRadius = '5%';
                // document.getElementById(`mao${destaque[x]}`).style.borderColor = '#ff6f00';
            }
            for(var x = 0; x < destaquem.length; x++){
                // document.getElementById(`mesa${destaquem[x]}`).style.borderStyle = 'solid';
                // document.getElementById(`mesa${destaquem[x]}`).style.borderRadius = '5%';
                // document.getElementById(`mesa${destaquem[x]}`).style.borderColor = '#ff6f00';
            }
        }
        else if(flush >= 5 && sequencia >= 5){
            for(var x = 0; x < fdestaque.length; x++){
                // document.getElementById(`mao${fdestaque[x]}`).style.borderStyle = 'solid';
                // document.getElementById(`mao${fdestaque[x]}`).style.borderRadius = '5%';
                // document.getElementById(`mao${fdestaque[x]}`).style.borderColor = '#FFD700';
            }
            for(var x = 0; x < fdestaquem.length; x++){
                // document.getElementById(`mesa${fdestaquem[x]}`).style.borderStyle = 'solid';
                // document.getElementById(`mesa${fdestaquem[x]}`).style.borderRadius = '5%';
                // document.getElementById(`mesa${fdestaquem[x]}`).style.borderColor = '#FFD700';
            }
        }
        else if(flush >= 5){
            for(var x = 0; x < fdestaque.length; x++){
                // document.getElementById(`mao${fdestaque[x]}`).style.borderStyle = 'solid';
                // document.getElementById(`mao${fdestaque[x]}`).style.borderRadius = '5%';
                // document.getElementById(`mao${fdestaque[x]}`).style.borderColor = '#6a0dad';
            }
            for(var x = 0; x < fdestaquem.length; x++){
                // document.getElementById(`mesa${fdestaquem[x]}`).style.borderStyle = 'solid';
                // document.getElementById(`mesa${fdestaquem[x]}`).style.borderRadius = '5%';
                // document.getElementById(`mesa${fdestaquem[x]}`).style.borderColor = '#6a0dad';
            }
        }
        else if(sequencia >= 5){
            for(var x = 0; x < sdestaque.length; x++){
                // document.getElementById(`mao${sdestaque[x]}`).style.borderStyle = 'solid';
                // document.getElementById(`mao${sdestaque[x]}`).style.borderRadius = '5%';
                // document.getElementById(`mao${sdestaque[x]}`).style.borderColor = '#3964C3';
            }
            for(var x = 0; x < sdestaquem.length; x++){
                // document.getElementById(`mesa${sdestaquem[x]}`).style.borderStyle = 'solid';
                // document.getElementById(`mesa${sdestaquem[x]}`).style.borderRadius = '5%';
                // document.getElementById(`mesa${sdestaquem[x]}`).style.borderColor = '#3964C3';
            }
        }
    }
    else{
        if(flush<5 && sequencia<5 && quadra == false){
            for(var x = 0; x < destaque.length; x++){
                // document.getElementById(`dealer${destaque[x]}`).style.borderStyle = 'solid';
                // document.getElementById(`dealer${destaque[x]}`).style.borderRadius = '5%';
                // document.getElementById(`dealer${destaque[x]}`).style.borderColor = 'red';
            }
            for(var x = 0; x < destaquem.length; x++){
                // document.getElementById(`mesa${destaquem[x]}`).style.borderStyle = 'solid';
                // document.getElementById(`mesa${destaquem[x]}`).style.borderRadius = '5%';
                // document.getElementById(`mesa${destaquem[x]}`).style.borderColor = 'red';
            }
        }
        else if((trinca == true || mtrinca == true) && (par == true || mpar == true)){
            for(var x = 0; x < destaque.length; x++){
                // document.getElementById(`dealer${destaque[x]}`).style.borderStyle = 'solid';
                // document.getElementById(`dealer${destaque[x]}`).style.borderRadius = '5%';
                // document.getElementById(`dealer${destaque[x]}`).style.borderColor = 'red';
            }
            for(var x = 0; x < destaquem.length; x++){
                // document.getElementById(`mesa${destaquem[x]}`).style.borderStyle = 'solid';
                // document.getElementById(`mesa${destaquem[x]}`).style.borderRadius = '5%';
                // document.getElementById(`mesa${destaquem[x]}`).style.borderColor = 'red';
            }
        }
        else if(flush >= 5 && sequencia >= 5){
            for(var x = 0; x < fdestaque.length; x++){
                // document.getElementById(`dealer${fdestaque[x]}`).style.borderStyle = 'solid';
                // document.getElementById(`dealer${fdestaque[x]}`).style.borderRadius = '5%';
                // document.getElementById(`dealer${fdestaque[x]}`).style.borderColor = 'red';
            }
            for(var x = 0; x < fdestaquem.length; x++){
                // document.getElementById(`mesa${fdestaquem[x]}`).style.borderStyle = 'solid';
                // document.getElementById(`mesa${fdestaquem[x]}`).style.borderRadius = '5%';
                // document.getElementById(`mesa${fdestaquem[x]}`).style.borderColor = 'red';
            }
        }
        else if(flush >= 5){
            for(var x = 0; x < fdestaque.length; x++){
                // document.getElementById(`dealer${fdestaque[x]}`).style.borderStyle = 'solid';
                // document.getElementById(`dealer${fdestaque[x]}`).style.borderRadius = '5%';
                // document.getElementById(`dealer${fdestaque[x]}`).style.borderColor = 'red';
            }
            for(var x = 0; x < fdestaquem.length; x++){
                // document.getElementById(`mesa${fdestaquem[x]}`).style.borderStyle = 'solid';
                // document.getElementById(`mesa${fdestaquem[x]}`).style.borderRadius = '5%';
                // document.getElementById(`mesa${fdestaquem[x]}`).style.borderColor = 'red';
            }
        }
        else if(sequencia >= 5){
            for(var x = 0; x < sdestaque.length; x++){
                // document.getElementById(`dealer${sdestaque[x]}`).style.borderStyle = 'solid';
                // document.getElementById(`dealer${sdestaque[x]}`).style.borderRadius = '5%';
                // document.getElementById(`dealer${sdestaque[x]}`).style.borderColor = 'red';
            }
            for(var x = 0; x < sdestaquem.length; x++){
                // document.getElementById(`mesa${sdestaquem[x]}`).style.borderStyle = 'solid';
                // document.getElementById(`mesa${sdestaquem[x]}`).style.borderRadius = '5%';
                // document.getElementById(`mesa${sdestaquem[x]}`).style.borderColor = 'red';
            }
        }
    }
    
    let r;
    let a;
    let nipef;
    let sfconfirmed = 0;
    let conts = 0;
    for(conts = 0; conts<sdestaquem.length; conts++){
        if(fdestaquem.includes(sdestaquem[conts])){
            sfconfirmed = sfconfirmed;
        }
        else{
            sfconfirmed = 1;
            break;
        }
    }
    if(flush >= 5 && sequencia >= 5 && sfconfirmed == 0){
        if(f[0]>39){
            nipef = "ESPADAS";
        }
        else if(f[0]>26){
            nipef = "COPAS";
        }
        else if(f[0]>13){
            nipef = "OUROS";
        }
        else{
            nipef = "PAUS";
        }
        if(s.includes(12) && s.includes(13)){
            r = `INACREDITÁVEL! VOCÊ TEM UM ROYAL STRAIGH FLUSH DE ${nipef} COM ${sr}!!!`;
            a = 10;
            console.log(r,"\n\n\n");
            return [ r, a, s, kickers];
        }
        else{
            r = `Meu Deus! VOCÊ TEM UM STRAIGH FLUSH DE ${nipef} COM ${sr}!!!`;
            a = 9;
            console.log(r,"\n\n\n");
            return [ r, a, s, kickers];
        }
    }
    else if(quadra == true || mquadra == true){
        for(var x = 0; x < geral.length; x++){
            if(!comborn.includes(geral[x]+1)){
                kickers.push(geral[x]+1);
                if(kickers.length == 1){
                    break;
                }
            }
        }
        r = `UAAAU! Você tem um Quadra de ${combor}!!!`;
        a = 8;
        console.log(r,"\n\n\n");
        return [ r, a, comborn, kickers];

    }
    else if((trinca == true || mtrinca == true) && (par == true || mpar == true)){
        r = `UAAAU! Você tem um Full House de ${combor}!`;
        a = 7;
        console.log(r,"\n\n\n");
        return [ r, a, comborn, kickers];
    }
    else if(flush >= 5){
        if(f[0]>39){
            nipef = "Espadas";
        }
        else if(f[0]>26){
            nipef = "Copas";
        }
        else if(f[0]>13){
            nipef = "Ouros";
        }
        else{
            nipef = "Paus";
        }
        r = `Parabéns! Você tem um Flush de ${nipef} com ${fr}!`;
        a = 6;
        console.log(r,"\n\n\n");
        return [ r, a, f, kickers];
    }
    else if(sequencia >= 5){
        r = `Parabéns! Você tem um Straight com ${sr}!`;
        a = 5;
        console.log(r,"\n\n\n");
        return [ r, a, s, kickers];
    }
    else if(trinca == true || mtrinca == true){
        for(var x = 0; x < geral.length; x++){
            if(!comborn.includes(geral[x]+1)){
                kickers.push(geral[x]+1);
                if(kickers.length == 2){
                    break;
                }
            }
        }
        r = `Parabéns! Você tem uma Trinca de ${combor}!`;
        a = 4;
        console.log(r,"\n\n\n");
        return [ r, a, comborn, kickers];
    }
    else if(par2 == true || mpar2 == true || (par == true && mpar == true)){
        for(var x = 0; x < geral.length; x++){
            if(!comborn.includes(geral[x]+1)){
                kickers.push(geral[x]+1);
                if(kickers.length == 1){
                    break;
                }
            }
        }
        r = `Boa! Você tem Dois Pares de ${combor}!`;
        a = 3;
        console.log(r,"\n\n\n");
        return [ r, a, comborn, kickers];
    }
    else if(par == true || mpar == true){
        for(var x = 0; x < geral.length; x++){
            if(!comborn.includes(geral[x]+1)){
                kickers.push(geral[x]+1);
                if(kickers.length == 3){
                    break;
                }
            }
        }
        r = `Você tem um Par de ${combor}!`;
        a = 2;
        console.log(r,"\n\n\n");
        return [ r, a, comborn, kickers];
    }
    else{
        for(var x = 0; x < geral.length; x++){
            if(!comborn.includes(geral[x]+1)){
                kickers.push(geral[x]+1);
                if(kickers.length == 5){
                    break;
                }
            }
        }
        r = `Você tem apenas Cartas Altas!`;
        a = 1;
        console.log(r,"\n\n\n");
        return [ r, a, comborn, kickers];
    }

}

module.exports = {
    'getmao': getmao, 
    'getdealer': getdealer, 
    'getmesa': getmesa, 
    'turnosome': turnosome, 
    'calcularmao': calcularmao
};
