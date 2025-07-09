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

        const QRCode = document.querySelector(".qrcode");
        QRCode.innerHTML = `<img src="http://localhost:3001/api/mfa/data/${json.filename}">`;
        

    }catch(error){
        console.error(error.message);
    }
});

document.getElementById('send_token').addEventListener("click", async ()=>{
    try{
        const url = "http://localhost:3001/api/mfa/verify_totp";

        const user = JSON.parse(localStorage.getItem('user'));

        const token = document.getElementById('token').value;


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

        
        const json = await response.json();
        console.log(json);

    }catch(error){
        console.error(error.message);
    }
});