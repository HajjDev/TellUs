import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import verifyCredentials from "../../../requests/security/verifyCredentials";

const VerifyCredentials = () => {
    const [result, setResult] = useState('');
    const navigate = useNavigate();
    try {
        const params = new URLSearchParams(window.location.search);
        const userId = params.get("userId");
        const token = params.get("token");

        useEffect(() => {
            const data = async () => {
                const message = await verifyCredentials(userId, token);
                setResult(message);

                const timer = setTimeout(() => {
                    navigate('/login');
                }, 5000);
            };
            
            data();
        }, []);

        return (
            <div className="verification-form">
                <h1>Verifying email...</h1>
                <div>{result}</div>
            </div>
        )
    
    } catch(err) {
        console.error(err.message);
        return (
            <div>
                <h1>Error while verifying the mail!</h1>
            </div>
        )
    }
};

export default VerifyCredentials;