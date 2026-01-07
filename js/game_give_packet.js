
"use strict"



function chosestarter(){
    veil();
    text("Chose your starter!");

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
        fetchpacketmons();

        location.reload();
        

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
        let banner = document.createElement('div');
        banner.id = 'banner';
        document.getElementById('gamescreen').appendChild(banner);

        let slot = document.createElement('div');
        slot.className = 'slot';
        slot.id = 'slotprize';
        document.getElementById('gamescreen').appendChild(slot);


        let index=0;
        let packet;
        slot.style.backgroundImage = "url('../immagini/" + packetnames[index] + "_front.svg')";
        const animationInterval = setInterval(() => {
            index++;

            if(index>=7){
                clearInterval(animationInterval); 
                givepacket(packet);
                return;
            }

            if (index == 6) {
                while(packet==null){
                   packet=packetnames[pickrandom()];
                   if(PLAYER_TEAM.includes(packet)) packet=null; 
                }
                slot.style.backgroundImage = "url('../immagini/" + packet + "_front.svg')";
            }
            else{
                slot.style.backgroundImage = "url('../immagini/" + packetnames[index] + "_front.svg')";
            }
        }, 900);
}




