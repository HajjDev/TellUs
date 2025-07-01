document.getElementById("send-link").addEventListener("click", async () => {
    try {
        const url = "http://localhost:3001/api/reset/emailInput";
        const email = document.getElementById("email").value || "";
        
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            
            body: JSON.stringify({
                email: email
            }),

            credentials: "include"
        });

        if (!response) {
            throw new Error(`Response status: ${response.status}`);
        };

        const json = await response.json();
        console.log(json);
    } catch(err) {
        console.log(err.message);
    };
})