document.getElementById("login-button").addEventListener('click', async ()=>{
    try{

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

    }catch(error){
        console.error(error.message);
    }
})
