const resetPassword = async (code, email) => {
    const url = "http://localhost:3001/api/reset/password";

    try {
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
        return json

    } catch(err) {
        console.error(err.message);
    };
};

export default resetPassword;