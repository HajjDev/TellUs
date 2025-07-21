import sendTokenAtLogin from "../../../requests/auth/mfa_login";
import { useState } from "react";

function SendMFATokenAtLogin({ GoodCredentials }){

    if (!GoodCredentials){
        return null
    }

    const [token, setToken] = useState("");

    const sendToken = async ()=>{
        await sendTokenAtLogin(token);
    }

    return (
        <>
            <div>
                <p>Please enter the code provided by your authentificator app, or the one you just received by mail.</p>
                <input
                    type="text" 
                    name="token"
                    value={token}
                    onChange={(e)=>{setToken(e.target.value)}}              
                />
                <button onClick={sendToken}>Send Code</button>
            </div>
        </>
    )

}

export default SendMFATokenAtLogin;