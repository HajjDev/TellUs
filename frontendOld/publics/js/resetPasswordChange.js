document.getElementById("reset-send").addEventListener('click', async () => {
    try {
        const url = "http://localhost:3001/api/reset/password-change";

        const password = document.getElementById("password").value;
        const passwordConfirmation = document.getElementById("password-confirmation").value;
        const email = JSON.parse(localStorage.getItem('mailVerification')) || {};

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                email: email,
                password: password,
                passwordConfirmation: passwordConfirmation
            }),

            credentials: "include",
        });

        if (!response) {
            throw new Error(`Response status: ${response.status}`);
        };

        const json = await response.json();
        console.log(json);
    } catch(err) {
        console.log(err);
    }
})