
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


const battles=[
    [ 4 ],
    [ 3 ],
    [ 0, 5 ],
    [ 2, 1 ],
    [ 1, 0, 2]
]





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






