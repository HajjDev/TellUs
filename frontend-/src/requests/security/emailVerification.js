const emailVerification = async (email) => {
    const url = "http://localhost:3001/api/reset/emailInput";

    try {
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
            throw new Error(`status: ${response.status}`);
        };

        const json = await response.json();
        console.log(json)
        localStorage.setItem('mailVerification', JSON.stringify({
            json
        }));

    } catch(err) {
        console.error(err.message);
    };
};

export default emailVerification;