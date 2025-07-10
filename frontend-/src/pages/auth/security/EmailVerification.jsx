import { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailVerification from "../../../requests/security/emailVerification";

const EmailVerification = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    
    const verified = async () => {
        try {
            await emailVerification(email);
            navigate("/resetPassword");
        } catch(err) {
            console.error(err.message);
        }
    };

    return (
        <>
            <div className="reset-password-form">
                <div>
                    <label htmlFor="email">Please type the email associated with your account</label>
                     <br />
                    <input 
                        id="email" 
                        type="text" 
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email" 
                        required
                    />
                </div>
                <button onClick={verified}>Send Reset Link</button>
            </div>
        </>
    );
};

export default EmailVerification;