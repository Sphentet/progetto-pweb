
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
/*velocivolt*/[   90,    70,   120 ],
/*mudgrunt  */[   85,   115,    75 ],
/*nightwing */[   110,   60,   110 ]
];


const battles=[
    [ 3 ],
    [ 4 ],
    [ 0, 5 ],
    [ 2, 1 ],
    [ 1, 0, 2]
]

let BATTLENU=0;
let BATTLE_HISTORY=[];
let LEADERBOARD=[];
let TEAMHP=[];
let PROFHP=[];
let MCCURRENTPACKET=0;
let PROFCURRPACKET=0;


function saveBattleState(){
    const battleState={
        TEAMHP: TEAMHP,
        PROFHP: PROFHP,
        MCCURRENTPACKET: MCCURRENTPACKET,
        PROFCURRPACKET: PROFCURRPACKET

    };
    localStorage.setItem('battle_state', JSON.stringify(battleState));
}

function loadBattleState(){
    const savedState=localStorage.getItem('battle_state');
    if (savedState){
        const state=JSON.parse(savedState);
        TEAMHP=state.TEAMHP;
        PROFHP=state.PROFHP;
        MCCURRENTPACKET=state.MCCURRENTPACKET;
        PROFCURRPACKET=state.PROFCURRPACKET;

        
        createscreen();
        createMc();
        createProf();
        
    }
}





function damage(a,b){
    let dmg=(2*25+10)*100/250;
    dmg*=packetstats[a][0]/packetstats[b][1];
    if(BATTLENU>1){
        dmg*=types[a][b];
    }
    return Math.floor(dmg);
}





function endBattle(win) {
    document.getElementById("battlescreenroot").remove();
    document.getElementById("veil").remove();
    let outcome=0;
    if(win)outcome=1;
    let score=0;
    for(let i=0; i<6; i++){
        if(win&&i<TEAMHP.length&&TEAMHP[i]!=0){
            score++;
        }
        if(!win&&i<PROFHP.length&&PROFHP[i]!=0){
            score++;
        }
    }
    TEAMHP=[];
    PROFHP=[];
    INBATTLE=false;
    saveGameState();
    FAILPRIZE=true;
    if(win){
        if(BATTLENU>=5){
            text("You Won!!!");
        }
        else{
            text("You Won and received a coin!!!");
            COINS++;
            updatecoins(COINS);
        }
        BATTLENU++;
        updatebattles(outcome, score, BATTLENU);
        return;
    }
    text("You Lost...Try again");
    updatebattles(outcome, score, BATTLENU);
    
}



function checkKo(x){
    if(x){
        if(PROFHP[PROFCURRPACKET]===0){
            if(PROFCURRPACKET===PROFHP.length-1){
                endBattle(true);
                return false;
            }
            PROFCURRPACKET++;
            document.getElementById('prt').innerText="100/100";
            document.getElementById('prhp').style.width="100%";
            document.getElementById('battleprofpacket').src='../immagini/'+packetnames[battles[Math.min(BATTLENU, 4)][PROFCURRPACKET]]+'_front.svg';
            return false;
        }
        else{
            return true;
        }
    }
    else{
        if(TEAMHP[MCCURRENTPACKET]===0){
            let allKo=true;

            for(let i=0; i<TEAMHP.length; i++){
                if(TEAMHP[i]>0){
                    allKo=false;
                    break;
                }
            }

            if(allKo){
                endBattle(false);
                return false;
            }
            change();
        }
        else{
            return true;
        }
    }
}


function mcAttack(){
    let dmg=damage(packetnames.indexOf(PLAYER_TEAM[MCCURRENTPACKET]), battles[Math.min(BATTLENU, 4)][PROFCURRPACKET]);
    PROFHP[PROFCURRPACKET]=Math.max(0, PROFHP[PROFCURRPACKET]-dmg);
    document.getElementById('prt').innerText=PROFHP[PROFCURRPACKET]+"/100";
    document.getElementById('prhp').style.width=PROFHP[PROFCURRPACKET]+"%";
    return checkKo(true);
}

function profAttack(){
    let dmg=damage(battles[Math.min(BATTLENU, 4)][PROFCURRPACKET], packetnames.indexOf(PLAYER_TEAM[MCCURRENTPACKET]));
    TEAMHP[MCCURRENTPACKET]=Math.max(0, TEAMHP[MCCURRENTPACKET]-dmg);
    document.getElementById('mct').innerText=TEAMHP[MCCURRENTPACKET]+"/100";
    document.getElementById('mchp').style.width=TEAMHP[MCCURRENTPACKET]+"%";
    return checkKo(false);
}


function attack(){
    document.getElementById('atkbutton').disabled = true;
    document.getElementById('changebutton').disabled = true;

    let cont;
    if(packetstats[packetnames.indexOf(PLAYER_TEAM[MCCURRENTPACKET])][2]>=packetstats[battles[Math.min(BATTLENU, 4)][PROFCURRPACKET]][2]){
        
        setTimeout(() => {
            cont=mcAttack();
        }, 700);
        
        setTimeout(() => {
            if(!cont){
                if(document.getElementById('atkbutton')) document.getElementById('atkbutton').disabled = false;
                if(document.getElementById('changebutton')) document.getElementById('changebutton').disabled = false;
                saveBattleState();
                return;
            }
            profAttack();
            if(document.getElementById('atkbutton')&&document.getElementById('changebutton')){
                document.getElementById('atkbutton').disabled = false;
                document.getElementById('changebutton').disabled = false;
            }
            saveBattleState();
            
        }, 1400);
        
    }
    else{
        setTimeout(() => {
            cont=profAttack();
        }, 700);
        
        setTimeout(() => {
            if(!cont){
                if(document.getElementById('atkbutton')) document.getElementById('atkbutton').disabled = false;
                if(document.getElementById('changebutton')) document.getElementById('changebutton').disabled = false;
                saveBattleState();
                return;
            }
            mcAttack();
            if(document.getElementById('atkbutton')&&document.getElementById('changebutton')){
                document.getElementById('atkbutton').disabled = false;
                document.getElementById('changebutton').disabled = false;
            }
            saveBattleState();
        }, 1400);
    }

    
}





function setPacketBattle(e) {
    document.getElementById('changeBanner').remove();
    MCCURRENTPACKET=parseInt(e.target.id);
    document.getElementById('mct').innerText=TEAMHP[MCCURRENTPACKET]+"/100";
    document.getElementById('mchp').style.width=TEAMHP[MCCURRENTPACKET]+"%";
    document.getElementById("battlemcpacket").src='../immagini/'+PLAYER_TEAM[MCCURRENTPACKET]+'_back.svg';
    
    if(document.getElementById('atkbutton')) document.getElementById('atkbutton').disabled = true;
    if(document.getElementById('changebutton')) document.getElementById('changebutton').disabled = true;

    setTimeout(() => {
        let cont=profAttack();
        if(cont){
            if(document.getElementById('atkbutton')) document.getElementById('atkbutton').disabled = false;
            if(document.getElementById('changebutton')) document.getElementById('changebutton').disabled = false; 
        }
        saveBattleState();
    }, 700);
    
    
}

function setPacket(e){
    MCCURRENTPACKET=parseInt(e.target.id);
    document.getElementById('mct').innerText=TEAMHP[MCCURRENTPACKET]+"/100";
    document.getElementById('mchp').style.width=TEAMHP[MCCURRENTPACKET]+"%";
    document.getElementById("battlemcpacket").src='../immagini/'+PLAYER_TEAM[MCCURRENTPACKET]+'_back.svg';
    document.getElementById('changeBanner').remove();
    document.getElementById('atkbutton').disabled = false;
    document.getElementById('changebutton').disabled = false;

    saveBattleState();
}


function noChange(){
    document.getElementById('changeBanner').remove();

    document.getElementById('atkbutton').disabled = false;
    document.getElementById('changebutton').disabled = false;
}
function goBackButton() {
    let back=document.createElement('div');
    back.className="changeSlot";
    back.innerText="Go back";
    back.addEventListener("click", noChange);
    document.getElementById('changeBanner').appendChild(back);
}


function change(e){
    if(document.getElementById('changeBanner')) return;

    document.getElementById('atkbutton').disabled = true;
    document.getElementById('changebutton').disabled = true;

    let changeBanner = document.createElement('div');
    changeBanner.id = 'changeBanner';
    document.getElementById('battlescreenroot').appendChild(changeBanner);

    for(let i=0;i<6;i++){
        let slot = document.createElement('div');
        slot.className = 'changeSlot';
        slot.id=i.toString();
        if(PLAYER_TEAM[i]!=null){
            slot.title=PLAYER_TEAM[i];
            slot.style.backgroundImage = "url('../immagini/" +PLAYER_TEAM[i]+ "_front.svg')";
            if(TEAMHP[i]===0){
                slot.style.backgroundColor="black";
            }
            else{
                if(i===MCCURRENTPACKET){
                    slot.style.backgroundColor="lightgreen";
                }
                else{
                    if(e&&e.target.id=="changebutton"){
                        slot.addEventListener("click", setPacketBattle);
                    }
                    else{
                        slot.addEventListener("click", setPacket);
                    }
                }
            }
        }
        document.getElementById('changeBanner').appendChild(slot);
    }
    if(e&&e.target.id=="changebutton"){
        goBackButton();
    }
}


function createscreen(){
    bsroot();

    let bs=document.createElement('div');
    bs.id='battlescreen';
    document.getElementById('battlescreenroot').appendChild(bs);

    let sd=document.createElement('div');
    sd.id='screendiv';
    document.getElementById('battlescreenroot').appendChild(sd);

    let ab=document.createElement('button');
    ab.id='atkbutton';
    ab.innerText='Attack!';
    document.getElementById('battlescreenroot').appendChild(ab);

    let cb=document.createElement('button');
    cb.id='changebutton';
    cb.innerText='Change Packètmon';
    document.getElementById('battlescreenroot').appendChild(cb);

    ab.addEventListener('click', attack);
    cb.addEventListener('click', change);
}

function createMc(){
    let bmc=document.createElement('img');
    bmc.id='battlemaincharacter';
    bmc.src='../immagini/mc_back.svg'
    document.getElementById('battlescreenroot').appendChild(bmc);

    

    let bmp=document.createElement('img');
    bmp.id='battlemcpacket';
    bmp.src='../immagini/'+PLAYER_TEAM[MCCURRENTPACKET]+'_back.svg';
    document.getElementById('battlescreenroot').appendChild(bmp);

    let mcc=document.createElement('div');
    mcc.id='mccard';
    mcc.innerText='You';
    document.getElementById('battlescreenroot').appendChild(mcc);

    let mccont=document.createElement('div');
    mccont.id="mccont";

    let mct=document.createElement('div');
    mct.id='mct';
    mct.innerText=TEAMHP[MCCURRENTPACKET]+"/100";

    let mch=document.createElement('div');
    mch.id='mchp';
    mch.style.width=TEAMHP[MCCURRENTPACKET]+"%";
    mccont.appendChild(mch);
    mccont.appendChild(mct);
    document.getElementById('battlescreenroot').appendChild(mccont);

    
    
}

function createProf(){
    let bp=document.createElement('img');
    bp.id='battleprofessor';
    bp.src='../immagini/professor.svg'
    document.getElementById('battlescreenroot').appendChild(bp);

    

    let bpp=document.createElement('img');
    bpp.id='battleprofpacket';
    bpp.src='../immagini/'+packetnames[battles[Math.min(BATTLENU, 4)][PROFCURRPACKET]]+'_front.svg';
    document.getElementById('battlescreenroot').appendChild(bpp);

    let profc=document.createElement('div');
    profc.id='profcard';
    profc.innerText='Prof.';
    document.getElementById('battlescreenroot').appendChild(profc);

    let prcont=document.createElement('div');
    prcont.id="prcont";

    let profht=document.createElement('div');
    profht.id='prt';
    profht.innerText=PROFHP[PROFCURRPACKET]+"/100";

    let prh=document.createElement('div');
    prh.id='prhp';
    prh.style.width=PROFHP[PROFCURRPACKET]+"%";
    prcont.appendChild(prh);
    prcont.appendChild(profht);
    document.getElementById('battlescreenroot').appendChild(prcont);

    
    
}

function startBattle(){

    
    createscreen();

    MCCURRENTPACKET=0;
    for (let tl=teamlength(); tl>0; tl--) {
        TEAMHP.push(100);
    }
    createMc();
    

    PROFCURRPACKET=0;
    for (let i=0; i<battles[Math.min(BATTLENU, 4)].length; i++) {
        PROFHP.push(100);
    }
    createProf();
    

    saveBattleState();
}



