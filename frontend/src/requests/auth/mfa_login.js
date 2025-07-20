async function sendTokenAtLogin(token){
    try{

        const url = "http://localhost:3001/api/auth/mfa_login";

        
        const response = await fetch(url, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                token
            }),

            credentials:"include" //allow cookie containing the user id
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        };

        const json = await response.json();

        console.log(json);

    }catch(error){
        console.error(error.message);
    }
}



export default sendTokenAtLogin;