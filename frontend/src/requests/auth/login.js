async function sendData(ename, pswd, captcha){
    try{

        const url = "http://localhost:3001/api/auth/login";

        
        const response = await fetch(url, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
               ename,
               password:pswd,
               captcha
            }),

            credentials:"include" //allow cookie
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        };

        const json = await response.json();
        localStorage.setItem("user", JSON.stringify(json.user));

        console.log(json);

    }catch(error){
        console.error(error.message);
    }
}



export default sendData;