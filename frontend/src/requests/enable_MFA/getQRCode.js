async function getQRCode(){
    try{

        const url = "http://localhost:3001/api/mfa/enable_totp";

        const user = JSON.parse(localStorage.getItem('user'));


        const response = await fetch(url, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },

            credentials:"include" //allow cookie
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        };

        
        const json = await response.json();

        return json.tag;
        

    }catch(error){
        console.error(error.message);
        return null;
    }
}

export default getQRCode