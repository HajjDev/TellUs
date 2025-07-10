async function GetEmailToken(){
    try{
        const url = "http://localhost:3001/api/mfa/enable_otp";

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

    

    }catch(error){
        console.error(error.message);
    }
}

export default GetEmailToken