document.getElementById('enable_totp').addEventListener('click', async ()=>{
    try{

        const url = "http://localhost:3001/api/mfa/enable_totp";

        const user = JSON.parse(localStorage.getItem('user'));


        const response = await fetch(url, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id:user.id
            }),
            credentials:"include" //allow cookie
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        };

        
        const json = await response.json();
        console.log(response);
        console.log(json);

    }catch(error){
        console.error(error.message);
    }
});