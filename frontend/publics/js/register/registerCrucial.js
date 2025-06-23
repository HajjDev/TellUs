document.getElementById("register").addEventListener('click', async ()=>{
    try{
        const url = "http://localhost:3001/api/register/signup";
        const userName = document.getElementById("userName").value;
        const displayName = document.getElementById("displayName").value;
        const email = document.getElementById("email").value;
        const phoneNumber = document.getElementById("phoneNumber").value;
        const password = document.getElementById("password").value;
        const reEnteredPassword = document.getElementById("password-confirmation").value;

        const personalInfo = JSON.parse(localStorage.getItem("personalInfo")) || {};

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                     'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    ...personalInfo,
                    userName: userName,
                    displayName: displayName,
                    email: email,
                    phoneNumber: phoneNumber,
                    password: password,
                    reEnteredPassword: reEnteredPassword
                })
            });

            console.log({
                    ...personalInfo,
                    userName: userName,
                    displayName: displayName,
                    email: email,
                    phoneNumber: phoneNumber,
                    password: password,
                    reEnteredPassword: reEnteredPassword
                });

            if (!response.ok) {
                throw new Error(`Reponse status: ${response.status}`);
            };

            const json = await response.json();
            console.log(json);
            
        } catch(error) {
            console.log(error.message);
        }
    } catch(error) {
        console.error(error.message);
    };

    console.log("registered");
});