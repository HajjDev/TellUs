const registerCrucial = async (userName, displayName, email, phoneNumber, password, reEnteredPassword, personalInfo) => {
    const url = "http://localhost:3001/api/register/signup";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...personalInfo,
                userName,
                displayName,
                email,
                phoneNumber,
                password,
                reEnteredPassword
            }),

            credentials: "include"
        });

        if (!response) {
            throw new Error(`status: ${response.status}`);
        };

        const json = await response.json();
        console.log(json);

    } catch(err) {
        console.log(err);
    };

    console.log("Registered");
}

export default registerCrucial;