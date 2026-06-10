
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


function saveGameState(){
    const gameState={
        POSITION: POSITION,
        LOOKING: LOOKING,
        INBATTLE: INBATTLE,
        INPRIZE: INPRIZE

    };
    localStorage.setItem('game_state', JSON.stringify(gameState));
}

function loadGameState(){
    const savedState=localStorage.getItem('game_state');
    if (savedState) {
        const state=JSON.parse(savedState);
        POSITION=state.POSITION;
        LOOKING=state.LOOKING;
        INBATTLE=state.INBATTLE;
        INPRIZE=state.INPRIZE;
        if(INBATTLE){
            veil();
            loadBattleState();

        }
        if(INPRIZE){
            veil();
            giveprize();
        }
    }
}


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
    saveGameState();
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
                saveGameState();
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
                saveGameState();
            }
            break;

        default:
            return;
    }
});
function updateTeam(){
    for(let i=0; i<PLAYER_TEAM.length;i++){
        let slot=document.getElementById("packet_"+i);
        slot.classList.add(PLAYER_TEAM[i]);
        slot.title=PLAYER_TEAM[i];
    }
    document.getElementById("coinsnumber").innerText="Coins: "+COINS;
}
async function fetchbattles(){
    try{
        const response=await fetch("../php/gamerequests.php?reqType=fetchbatt");
        if(!response.ok) throw new Error(response.status);
        const data=await response.json();
        BATTLENU=data.battnu;
        BATTLE_HISTORY=data.battles;
        LEADERBOARD=data.leaderboard;
        updatehistory();
        updateleader();
    }catch(e){
        alert(e.message);
        return;
    }
}
function updatehistory(){
    const histdiv=document.getElementById('history');
    while(histdiv.hasChildNodes()){
        histdiv.removeChild(histdiv.lastChild);
    }
    if(BATTLE_HISTORY.length === 0){
        let tmp=document.createElement('div');
        tmp.className="listitem";
        tmp.innerText="No Battles Yet";
        histdiv.appendChild(tmp);
        return;
    }
    let battlerev=[...BATTLE_HISTORY].reverse();
    for(let i=0; i<battlerev.length; i++){
        let item=document.createElement('div');
        item.className="listitem";
        if(battlerev[i][0]==1){
            item.innerText="You Won "+battlerev[i][1]+"-0";
            item.classList.add("winrecord");
        }
        else{
            item.innerText="You Lost 0-"+battlerev[i][1];
            item.classList.add("lossrecord");
        }
        histdiv.appendChild(item);
    }
}
function updateleader(){
    const leaddiv=document.getElementById('leaderboard');
    while(leaddiv.hasChildNodes()){
        leaddiv.removeChild(leaddiv.lastChild);
    }
    if(LEADERBOARD.length === 0){
        let tmp=document.createElement('div');
        tmp.className="listitem";
        tmp.innerText="No Players Yet";
        leaddiv.appendChild(tmp);
        return;
    }
    let leadord=[...LEADERBOARD].sort((a, b) => b[1]-a[1]);

    for(let i=0; i<leadord.length; i++){
        if(leadord[i][1]==0)continue;
        let item=document.createElement('div');
        item.className="listitem";
        item.innerText="#"+(i+1)+" "+leadord[i][0]+" - "+leadord[i][1]+" Wins!";
        if(leadord[i][0]==PLAYER_NAME){
            item.classList.add("winrecord");
        }
        
        leaddiv.appendChild(item);
    }
}
async function updatebattles(o, s, w) {
    try{
        const response=await fetch("../php/gamerequests.php?reqType=updbatt&outcome="+o+"&score="+s+"&wins="+w);
        if(!response.ok) throw new Error(response.status);
        fetchbattles();
    }catch(e){
        alert(e.message);
        return;
    }
}
document.addEventListener('DOMContentLoaded', async ()=>{
    await fetchpacketcoins();
    loadGameState();
    let startmc=document.createElement("img");
    if(LOOKING[1]==POSITION[1]){
        if(LOOKING[0]<POSITION[0]){
            startmc.src="../immagini/mc_back.svg";
        }
        else{
            startmc.src="../immagini/mc_front.svg";
        }
    }
    else{
        if(LOOKING[1]<POSITION[1]){
            startmc.src="../immagini/mc_left.svg";
        }
        else{
            startmc.src="../immagini/mc_right.svg";
        }
    }
    startmc.alt="mainCharacter";
    startmc.id="mc";
    document.getElementById(POSITION[0]+"_"+POSITION[1]).appendChild(startmc);
})





