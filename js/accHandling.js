
"use strict"

let toggled=true;


function togglePassword(e){
    let string=(toggled)?'text':'password';
    document.getElementById("pass").type=string;
    
    let emoji=(toggled)?'🙈':'👁️';
    e.target.innerText=emoji;
    
    toggled=!toggled;
}



async function manageCredentials(e){
    
    let type=e.target.name;


    if(document.querySelector(".message")!==null){
        document.body.removeChild(document.querySelector(".message"));
    }
    document.getElementById("packetCardButton").disabled=true;


    if(document.getElementById('user').checkValidity()&&document.getElementById('pass').checkValidity()){
        
        const data=new FormData();

        data.append('username', JSON.stringify(document.getElementById("user").value));
        data.append('password', JSON.stringify(document.getElementById("pass").value));

        try{
            
            const response=await fetch(((type=="sign-in"||type=="delete")?"../":"")+"php/accHandling.php?reqType="+type,{
                method: 'POST',
                body: data
            })
            if(!response.ok) throw new Error(response.status);
        }
        catch(e){
            alert(e.message);
        }


    }
    else{
        
        let message=document.createElement('div');
        message.className='message';
        message.innerText="Credentials do not match the required patterns";
        document.body.appendChild(message);
    }

    document.getElementById("packetCardButton").disabled=false;
    document.getElementById("user").value="";
    document.getElementById("pass").value="";

    if(type==="sign-in"){
        window.location.href="../index.php";
    }



    if(type==="log-in"){
        window.location.href="html/game.php";
    }




}



document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById("togglePass").addEventListener('click', togglePassword);
    document.getElementById("packetCardButton").addEventListener('click', manageCredentials);
})

