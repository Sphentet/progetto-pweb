
"use strict"

const packetnames=[
    "vulpine"   ,
    "bubblotl"  ,
    "ignispark" ,
    "velocivolt",
    "mudgrunt"  ,
    "nightwing"
];


let POSITION=[8,4];
let LOOKING=[9,4];
let INBATTLE=false;
let INPRIZE=false;
let FAILPRIZE=false;
let TEAMFULL=false;
let COINS=0;

let PLAYER_NAME="";
let PLAYER_TEAM=[];

let MAP=[
    [-1, -1,  0, -1, -1, -1,  0, -1, -1],
    [ 0,  0,  0,  0, -1,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0],
    [ 0,  0,  0,  0,  0,  0,  0,  0,  0]
];



function moveImg(){
    document.getElementById(POSITION[0]+"_"+POSITION[1]).appendChild(document.getElementById("mc"));
}

function veil(){
    let veil = document.createElement('div');
    veil.id = 'veil';
    document.getElementById('gamescreen').appendChild(veil);
}

function bsroot(){
    let bsr=document.createElement('div');
    bsr.id='battlescreenroot';
    document.getElementById('gamescreen').appendChild(bsr);
}

function text(s){
    let message=document.createElement('div');
    message.className='text';
    message.innerText=s;
    document.getElementById("gamescreen").appendChild(message);
}

function movement(y,x){
    LOOKING[0]=POSITION[0]+y;
    LOOKING[1]=POSITION[1]+x;
    if(POSITION[Math.abs(x)]+x+y>=0 && POSITION[Math.abs(x)]+x+y<=8 && MAP[POSITION[0]+y][POSITION[1]+x]===0){
        POSITION[0]+=y;
        POSITION[1]+=x;
        LOOKING[0]+=y;
        LOOKING[1]+=x;
        moveImg();
    }
}

function teamlength(){
    let tl=0;
    for (let i = 0; i < PLAYER_TEAM.length; i++) {
        if(PLAYER_TEAM[i]!=null){
            tl++;
        }
    }
    return tl;
}

document.addEventListener('keydown', (event) => {
    let textMessage=document.querySelector(".text");

    if(INBATTLE&&textMessage&&event.code==="Enter"){
        document.getElementById("gamescreen").removeChild(textMessage);
        veil();
        startBattle();
        return;
    }

    if(INPRIZE&&textMessage&&event.code==="Enter"){
        document.getElementById("gamescreen").removeChild(textMessage);
        veil();
        giveprize();
        return;
    }

    if((FAILPRIZE||TEAMFULL)&&textMessage&&event.code==="Enter"){
        document.getElementById("gamescreen").removeChild(textMessage);
        FAILPRIZE=false;
        TEAMFULL=false;
        return;
    }


    if(INBATTLE||INPRIZE||FAILPRIZE||TEAMFULL) return;

    let img=document.getElementById("mc");
    switch(event.code) {
        case "KeyW":
        case "ArrowUp":
            img.src="../immagini/mc_back.svg";
            movement(-1,0);
            break;

        case "KeyS":
        case "ArrowDown":
            img.src="../immagini/mc_front.svg";
            movement(1,0);
            break;

        case "KeyA":
        case "ArrowLeft":
            img.src="../immagini/mc_left.svg";
            movement(0,-1);
            break;

        case "KeyD":
        case "ArrowRight":
            img.src="../immagini/mc_right.svg";
            movement(0,1);
            break;
        
        case "Enter":
            if(LOOKING[0]===1 && LOOKING[1]===4){
                INBATTLE=true;
                text("Let's battle!!!");
            }
            if(LOOKING[0]===0 && (LOOKING[1]===3||LOOKING[1]===5)){
                if(COINS==0){
                    FAILPRIZE=true;
                    text("You don't have enough coins...");
                    return;
                }
                
                let tl=teamlength();
                if(tl >= packetnames.length){
                    TEAMFULL=true;
                    text("Your team is full.");
                    return;
                }

                text("Get ready for a new Packètmon!");
                INPRIZE=true;
            }
            break;

        default:
            return;
    }

});





document.addEventListener('DOMContentLoaded', ()=>{
    let startmc=document.createElement("img");
    startmc.src="../immagini/mc_front.svg";
    startmc.alt="mainCharacter";
    startmc.id="mc";
    document.getElementById(POSITION[0]+"_"+POSITION[1]).appendChild(startmc);
    fetchpacketcoins();
})





