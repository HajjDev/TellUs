document.getElementById("code-send").addEventListener('click', async () => {
    
    try {
        const url = "http://localhost:3001/api/reset/password";
        const code = document.getElementById("code").value || "";
        const email = JSON.parse(localStorage.getItem('mailVerification')) || {};
        console.log(email);
        
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            
            body: JSON.stringify({
                code: code,
                email: email
            }),

            credentials: "include"
        });

        if (!response) {
            throw new Error(`Response status: ${response.status}`);
        };

        const json = await response.json();
        if (json) {
            window.location.href = "../html/reset_password_change.html";
        }
    } catch(err) {
        console.log(err.message);
    };
});