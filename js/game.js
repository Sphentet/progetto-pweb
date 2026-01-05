
"use strict"

const types=[
          /*grass water fire  elect ground flying*/
/*grass */[   1,    2,   0.5,   1,    2,    0.5  ],
/*water */[  0.5,   1,    2,   0.5,   2,    0.5  ],
/*fire  */[   2,   0.5,   1,    1,   0.5,    2   ],
/*elect.*/[  0.5,   2,    1,    1,   0.5,    2   ],
/*ground*/[  0.5,  0.5,   2,    2,    1,     1   ],
/*flying*/[   2,    1,   0.5,  0.5,   1,     1   ]
];

const packetstats=[
              /* atk    def    spe*/
/*vulpine   */[  110,    95,    65 ],
/*bubblotl  */[   90,   110,    80 ],
/*ignispark */[  115,    80,    85 ],
/*velocivolt*/[   85,    65,   130 ],
/*mudgrunt  */[   85,   115,    75 ],
/*nightwing */[   120,   60,   100 ]
];

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


function attack(){
    alert("attack");
}

function change(){
    alert("change");
}




function startBattle(){

    let bs=document.createElement('div');
    bs.id='battlescreen';
    document.getElementById('gamescreen').appendChild(bs);

    let sd=document.createElement('div');
    sd.id='screendiv';
    document.getElementById('gamescreen').appendChild(sd);

    let ab=document.createElement('button');
    ab.id='atkbutton';
    ab.innerText='Attack!';
    document.getElementById('gamescreen').appendChild(ab);

    let cb=document.createElement('button');
    cb.id='changebutton';
    cb.innerText='Change Packètmon';
    document.getElementById('gamescreen').appendChild(cb);

    ab.addEventListener('click', attack);
    cb.addEventListener('click', change);






    let bmc=document.createElement('img');
    bmc.id='battlemaincharacter';
    bmc.src='../immagini/mc_back.svg'
    document.getElementById('gamescreen').appendChild(bmc);

    let bmp=document.createElement('img');
    bmp.id='battlemcpacket';
    bmp.src='../immagini/ignispark_back.svg';
    document.getElementById('gamescreen').appendChild(bmp);

    let mcc=document.createElement('div');
    mcc.id='mccard';
    mcc.innerText='You';
    document.getElementById('gamescreen').appendChild(mcc);

    let mch=document.createElement('div');
    mch.id='mchp';
    mch.innerText='100/100';
    document.getElementById('gamescreen').appendChild(mch);






    let bp=document.createElement('img');
    bp.id='battleprofessor';
    bp.src='../immagini/professor.svg'
    document.getElementById('gamescreen').appendChild(bp);

    let bpp=document.createElement('img');
    bpp.id='battleprofpacket';
    bpp.src='../immagini/ignispark_front.svg';
    document.getElementById('gamescreen').appendChild(bpp);

    let profc=document.createElement('div');
    profc.id='profcard';
    profc.innerText='Prof.';
    document.getElementById('gamescreen').appendChild(profc);

    let profh=document.createElement('div');
    profh.id='profhp';
    profh.innerText='100/100';
    document.getElementById('gamescreen').appendChild(profh);



}














function moveImg(){
    document.getElementById(POSITION[0]+"_"+POSITION[1]).appendChild(document.getElementById("mc"));
}


document.addEventListener('keydown', (event) => {

    let textMessage=document.querySelector(".text");

    if(INBATTLE&&textMessage&&event.code==="Enter"){
        document.getElementById("gamescreen").removeChild(textMessage);

        let veil = document.createElement('div');
        veil.id = 'veil';
        document.getElementById('gamescreen').appendChild(veil);

        startBattle();


        return;
    }

    if(INBATTLE) return;

    let img=document.getElementById("mc");

    switch(event.code) {

        case "KeyW":
        case "ArrowUp":

            img.src="../immagini/mc_back.svg";
            LOOKING[0]=POSITION[0]-1;
            LOOKING[1]=POSITION[1];
            if(POSITION[0]>0 && MAP[(POSITION[0]-1)][POSITION[1]]===0){
                POSITION[0]--;
                LOOKING[0]--;
                moveImg();
            }

            break;
        case "KeyS":
        case "ArrowDown":
            
            img.src="../immagini/mc_front.svg";
            LOOKING[0]=POSITION[0]+1;
            LOOKING[1]=POSITION[1];
            if(POSITION[0]<8 && MAP[(POSITION[0]+1)][POSITION[1]]===0){
                POSITION[0]++;
                LOOKING[0]++;
                moveImg();
            }

            break;
        case "KeyA":
        case "ArrowLeft":
            
            img.src="../immagini/mc_back.svg";
            LOOKING[0]=POSITION[0];
            LOOKING[1]=POSITION[1]-1;
            if(POSITION[1]>0 && MAP[(POSITION[0])][POSITION[1]-1]===0){
                POSITION[1]--;
                LOOKING[1]--;
                moveImg();
            }

            break;
        case "KeyD":
        case "ArrowRight":
            
            img.src="../immagini/mc_back.svg";
            LOOKING[0]=POSITION[0];
            LOOKING[1]=POSITION[1]+1;
            if(POSITION[1]<8 && MAP[(POSITION[0])][POSITION[1]+1]===0){
                POSITION[1]++;
                LOOKING[1]++;
                moveImg();
            }

            break;
        
        case "Enter":
            if(LOOKING[0]===1 && LOOKING[1]===4){
                INBATTLE=true;

                let message=document.createElement('div');
                message.className='text';
                message.innerText="Let's battle!!!";
                document.getElementById("gamescreen").appendChild(message);

            }
                
            break;

        default:
            return;
    }

});


async function fetchpacketmons(){
    try{
        const response=await fetch("../php/gamerequests.php?reqType=fetchpacket");
        if(!response.ok) throw new Error(response.status);

        const data = await response.json();
        PLAYER_NAME = data.username;
        if(data.packetmons[0]==null){
            chosestarter();
        }else{
            PLAYER_TEAM = data.packetmons; 
        }
        

    }catch(e){
        alert(e.message);
        return;
    }
    
    
}

fetchpacketmons();


function chosestarter(){
    let veil = document.createElement('div');
    veil.id = 'veil';
    document.getElementById('gamescreen').appendChild(veil);

    let message=document.createElement('div');
    message.className='text';
    message.innerText="Chose your starter!";
    document.getElementById("gamescreen").appendChild(message);

    let banner = document.createElement('div');
    banner.id = 'banner';
    document.getElementById('gamescreen').appendChild(banner);

    for(let i=0;i<3;i++){
        let slot = document.createElement('div');
        slot.className = 'slot';
        slot.id = 'slot'+i;
        slot.title=packetnames[i];
        document.addEventListener("click", givestarter);
        document.getElementById('gamescreen').appendChild(slot);
    }
    

    

}

function givestarter(e){
    let packet=e.target.id;
    switch (packet) {
        case "slot0":
            packet=packetnames[0];
            break;

        case "slot1":
            packet=packetnames[1];
            break;
    
        default:
            packet=packetnames[2];
            break;
    }

    givepacket(packet);

}



async function givepacket(packet){
    
    
    try{
        const response=await fetch("../php/gamerequests.php?reqType=getpacket&packetmon="+packet);
        if(!response.ok) throw new Error(response.status);

        location.reload();
        

    }catch(e){
        alert(e.message);
        return;
    }

    

}



