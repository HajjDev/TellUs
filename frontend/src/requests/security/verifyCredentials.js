const verifyCredentials = async (userId, token) => {
    const url = `http://localhost:3001/api/register/verify-credentials/${userId}/${token}`;
    try {
        const response = await fetch(url, {
            method: "GET",
            credentials: "include"
        });

        if (!response) {
            throw new Error(`status: ${response.status}`);
        };

        const result = await response.json();
        console.log(result);
        return result.message;

    } catch(err) {
        console.error(err.message);
        return "Email Verification failed";
    }
}

export default verifyCredentials;