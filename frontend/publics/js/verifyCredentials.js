window.addEventListener("DOMContentLoaded", async () => {
    const message = document.getElementById('message');
    
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("userId");
    const token = params.get("token");
    const url = `http://localhost:3001/api/register/verifyAccount/${userId}/${token}`
    
    try {
        const response = await fetch(url, {
            method: "GET",
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        };
        
        const result = await response.json();
        console.log(result)
        message.innerHTML = result.message;

    } catch(err) {
        console.log(err);
        message.innerText = "Email Verification failed";
    }
});