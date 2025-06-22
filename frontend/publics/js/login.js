document.getElementById("login-button").addEventListener('click', async ()=>{
    try{

<<<<<<< HEAD
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
=======
        const url = "http://localhost:3001/api/auth/login";
        const ename = document.getElementById('ename').value;
        const password = document.getElementById('password').value;
        
        const response = await fetch(url, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
               ename:ename,
               password:password 
            })
        })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = response.json();
        console.log(json);
>>>>>>> 7d10afdf864c61d2be238f2b383cd7c467c5d699

    }catch(error){
        console.error(error.message);
    }
})
<<<<<<< HEAD

const url = "mongodb+srv://TellUs-DB-ADMIN-AC-2:5jnpTeBex3aIagLY@tellus-db-provider.x0d5mlm.mongodb.net/TellUs";

fetch(url,{
    method:"GET",
    headers:{
        
    }
}

).then(()=>{console.log()})
=======
>>>>>>> 7d10afdf864c61d2be238f2b383cd7c467c5d699
