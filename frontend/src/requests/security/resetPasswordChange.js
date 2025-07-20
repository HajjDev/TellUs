const resetPasswordChange = async (email, password, reEnteredPassword) => {
    const url = "http://localhost:3001/api/reset/password-change";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                email: email,
                password: password,
                passwordConfirmation: reEnteredPassword
            }),

            credentials: "include",
        });

        if (!response) {
            throw new Error(`status: ${response.status}`);
        };

        const json = await response.json();
        console.log(json);

    } catch(err) {
        console.error(err.message);
    };
};

export default resetPasswordChange;