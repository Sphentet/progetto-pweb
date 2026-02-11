
"use strict"



async function fetchpacketcoins(){
    try{
        const response=await fetch("../php/gamerequests.php?reqType=fetchpacketco");
        if(!response.ok) throw new Error(response.status);

        const data = await response.json();
        PLAYER_NAME = data.username;
        COINS = data.coins;
        if(data.packetmons[0]==null){
            chosestarter();
        }else{
            PLAYER_TEAM = data.packetmons; 
        }

        updateTeam();
        await fetchbattles();
        

    }catch(e){
        alert(e.message);
        return;
    }
    
    
}
async function updatecoins(n) {
    try{
        const response=await fetch("../php/gamerequests.php?reqType=updcoins&number="+n);
        if(!response.ok) throw new Error(response.status);
        fetchpacketcoins();
    
    }catch(e){
        alert(e.message);
        return;
    }
}

function chosestarter(){
    veil();
    bsroot();
    text("Chose your starter!");

    let banner = document.createElement('div');
    banner.id = 'banner';
    document.getElementById('battlescreenroot').appendChild(banner);

    for(let i=0;i<3;i++){
        let slot = document.createElement('div');
        slot.className = 'slot';
        slot.id = 'slot'+i;
        slot.title=packetnames[i];
        slot.addEventListener("click", givestarter);
        document.getElementById('battlescreenroot').appendChild(slot);
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
        fetchpacketcoins();

        document.getElementById("battlescreenroot").remove();
        document.getElementById("veil").remove();
        let textMessage=document.querySelector(".text");
        if(textMessage)
            document.getElementById("gamescreen").removeChild(textMessage);
        INPRIZE=false;
        saveGameState();

    }catch(e){
        alert(e.message);
        return;
    }
}



function pickrandom(){
    let pick=Math.floor(Math.random()*6);
    return pick;
}
function giveprize(){
    bsroot();

    let banner = document.createElement('div');
    banner.id = 'banner';
    document.getElementById('battlescreenroot').appendChild(banner);

    let slot = document.createElement('div');
    slot.id = 'slotprize';
    document.getElementById('battlescreenroot').appendChild(slot);


    let index=0;
    let packet;
    slot.className = 'changeSlot';
    slot.classList.add('change'+packetnames[index]);
    const animationInterval = setInterval(() => {
        index++;

        if(index>=7){
            clearInterval(animationInterval);
            COINS--;
            updatecoins(COINS);
            givepacket(packet);
            return;
        }

        if (index == 6) {
            while(packet==null){
               packet=packetnames[pickrandom()];
               if(PLAYER_TEAM.includes(packet)) packet=null; 
            }
            slot.className = 'changeSlot';
            slot.classList.add('change'+packet);
        }
        else{
            slot.className = 'changeSlot';
            slot.classList.add('change'+packetnames[index]);
        }
    }, 900);
}






