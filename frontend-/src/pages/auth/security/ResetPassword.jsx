import { useState } from "react";
import { useNavigate } from "react-router-dom";
import resetPassword from "../../../requests/security/resetPassword";

const ResetPassword = () => {
    const [code, setCode] = useState('');
    const email = JSON.parse(localStorage.getItem('mailVerification')) || {};
    const navigate = useNavigate();

    const checkCode = async () => {
        try {  
            const result = resetPassword(code, email);
            if (result) {
                navigate('/changePassword');
            } else {
                console.log("error, incorrect credentials");
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <>
            <div className="reset-form">
                <div>
                    <label htmlFor="code">Please type the code sent by mail</label>
                    <br />
                    <input 
                        id="code" 
                        type="text" 
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter the code" 
                        required
                    />
                </div>
            </div>
            <button onClick={checkCode}>Reset Password</button>
        </>
    );
};

export default ResetPassword;