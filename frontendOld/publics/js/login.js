document.getElementById("login").addEventListener('click', async ()=>{
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
            }),

            credentials:"include" //allow cookie
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        };

        const json = await response.json();
        localStorage.setItem("user", JSON.stringify(json.user));
        console.log(response);
        console.log(json);

    }catch(error){
        console.error(error.message);
    }
})

document.getElementById("newAccRegister").addEventListener('click', () => {
    window.location.href = "../html/register/register_personal.html";
});

document.getElementById("forgotPassword").addEventListener('click', () => {
    window.location.href = "../html/email_verification.html";
});

const button = document.getElementById('send_test');

button.addEventListener('click', async ()=>{
    try{

        const url = "http://localhost:3001/test/test";
        
        const response = await fetch(url, {
            method:"GET",
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

document.getElementById('enable_mfa').addEventListener('click', ()=>{
    window.location.href = "../html/enable_mfa.html";
});