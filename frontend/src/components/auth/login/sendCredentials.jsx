import { useState } from "react";
import sendData from "../../../requests/auth/login";
import ReCAPTCHA from "react-google-recaptcha";

function SendCredentials({ename, pswd}){
    const [captchaToken, setCaptchaToken] = useState('');
    const SendCredentialsHandler = async ()=>{
        if (!captchaToken) {
            alert("Please, complete the captcha");
        } else {
            await sendData(ename, pswd, captchaToken)
        }
    }

    return (
        <div>
            <div className="captcha-container">
                <ReCAPTCHA 
                    sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY || ""}
                    onChange={(token) => setCaptchaToken(token)}
                />
            </div>
            <button onClick={SendCredentialsHandler}>Log in</button>
        </div>
    )
}

export default SendCredentials