import sendTokenAtLogin from "../../../requests/auth/mfa_login";
import { useState } from "react";

function sendMFACode(){
    const [token, setToken] = useState("");

    const handleChange = (event)=>{
        const value = event.target.value;
        setToken(value);
    }

    const sendToken = async ()=>{
        await sendTokenAtLogin(token);
    }

    return (
        <>
            <div>
                <input
                    type="text" 
                    name="token"
                    value={token}
                    onChange={handleChange}              
                />
                <button onclick={sendToken}></button>
            </div>
        </>
    )

}

export default sendMFACode;