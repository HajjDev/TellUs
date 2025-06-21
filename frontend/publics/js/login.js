document.getElementById("login-button").addEventListener('click', async ()=>{
    try{

        const url = "http://127.0.0.1:3001/api/auth/login";
        const ename = document.getElementById('ename').value;
        const password = document.getElementById('password').value;
        response = await fetch(url, {
            method:"POST",
            header:{
                "Content-Type":"application/json"
            },
            
            body:JSON.stringify({
                ename:ename,
                password:password
            })
        });

    }catch(error){
        console.error(error.message);
    }
})

const url = "mongodb+srv://TellUs-DB-ADMIN-AC-2:5jnpTeBex3aIagLY@tellus-db-provider.x0d5mlm.mongodb.net/TellUs";

fetch(url,{
    method:"GET",
    headers:{
        
    }
}

).then(()=>{console.log()})