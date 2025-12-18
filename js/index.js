
let toggled=true;


function togglePassword(e){
    let string=(toggled)?'text':'password';
    document.getElementById("pass").type=string;
    
    let emoji=(toggled)?'🙈':'👁️';
    e.target.innerText=emoji;
    
    toggled=!toggled;
}



async function manageCredentials(){
    if(document.querySelector(".messaggio")!==null){
        document.body.removeChild(document.querySelector(".messaggio"));
    }
    document.getElementById("packetCardButton").disabled=true;


    if(document.getElementById('user').checkValidity()&&document.getElementById('pass').checkValidity()){
        
        const data=new FormData();

        data.append('username', JSON.stringify(document.getElementById("user").value));
        data.append('password', JSON.stringify(document.getElementById("pass").value));

        try{
            const response=await fetch("php/login.php",{
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
        message.className='messaggio';
        message.innerText="Credentials do not match the required patterns";
        document.body.appendChild(message);
    }

    document.getElementById("packetCardButton").disabled=false;

}



document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById("togglePass").addEventListener('click', togglePassword);
    document.getElementById("packetCardButton").addEventListener('click', manageCredentials);
})

