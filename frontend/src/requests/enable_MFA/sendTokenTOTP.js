async function SendTokenTOTP(token){
    try{
        const url = "http://localhost:3001/api/mfa/verify_totp";

        const user = JSON.parse(localStorage.getItem('user'));


        const response = await fetch(url, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id:user.id,
                token:token
            }),

            credentials:"include" //allow cookie
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        };

    

    }catch(error){
        console.error(error.message);
    }
}


export default SendTokenTOTP