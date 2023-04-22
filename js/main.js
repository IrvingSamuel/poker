/**
 * Created by Jerome on 03-03-16.
 */
//noinspection JSCheckFunctionSignatures,JSCheckFunctionSignatures,JSCheckFunctionSignatures
let w = 1920;
let h = 1920;
var cw = screen.width;
var ch = screen.height;
var zoom = 0.6;
var zoomb = 0.66;
var font = 18;


function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

var midw = cw/2;
var midh = ch/2;
var mesa1 = midw - 300;
var mesa2 = midw - 150;
var mesa3 = midw;
var mesa4 = midw + 150;
var mesa5 = midw + 300;
var buttonS = midw - (midw * 0.25);
var buttonN = midw;
var buttonP = midw + (midw * 0.25);
var vButton = midh + (midh * 0.35);

var mao1 = midw - 10;
var mao2 = midw + 10;
var maoh = ch - 110;
var delh = 110;

var hover = 0;
var hoverr = 0;
var playing = true;
var ingame = false;
var reveled = false;
var reveled1 = false;
var reveled2 = false;
var reveled3 = false;
var reveledr = false;
var round1 = false;
var round2 = false;
var round3 = false;
var result = false;
var p = 0;
var mao = [];
var dealer = [];
var mesa = [];
var allhands = [];
var players = [];
var casa;
var resultado;
var vencedor = 0;
var dinheirom = 1000;
var dinheirop = 1000;
var pote = 0;
var apostap = 0;
var apostam = 0;
var bind = 100;
var vencedorap = 'e';

const delay = ms => new Promise(res => setTimeout(res, ms));

const mobile = detectMob();
if(mobile == true){
  zoom = 0.3;
  zoomb = 0.33;
  maoh = ch - 55;
  delh = 55;
  mesa1 = midw - 150;
  mesa2 = midw - 75;
  mesa4 = midw + 75;
  mesa5 = midw + 150;
  font = 10;
  var buttonS =  midw - (midw * 0.15);
  var buttonN =  midw;
  var buttonP =  midw + (midw * 0.15);
  if(ch > cw){
    cw = screen.height;
    ch = screen.width;
  }
  else{
    cw = screen.width;
    ch = screen.height;
  }
}

var config = {
  type: Phaser.WEBGL,
  width: cw,
  height: ch,
  physics: {
      default: 'arcade',
      arcade: {
          debug: false
      }
  },
  fps: {
      target: 90,
      forceSetTimeOut: true
  },
  scene:{
    preload: Game.preload,
    create: Game.create,
    update: Game.update
  }
};

var game = new Phaser.Game(config);

// click to full screen
function toggleFullscreen(elem) {
    elem = elem || document.documentElement;
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }
  $('#clickFullscreen').on('click', function () {
    toggleFullscreen();
  });