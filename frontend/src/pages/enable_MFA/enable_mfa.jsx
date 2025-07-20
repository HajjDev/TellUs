import {useState, useRef} from 'react'
import SendTokenTOTP from '../../requests/enable_MFA/sendTokenTOTP'
import getQRCode from '../../requests/enable_MFA/getQRCode';

import SendTokenOTP from '../../requests/enable_MFA/sendTokenOTP'
import GetEmailToken from '../../requests/enable_MFA/getEmailToken'


function EnableMFA(){
    const [token, setToken] = useState("");
    const QRCode = useRef()
    const mess = useRef()

    const sendTokenHandlerOTP = async ()=>{
        await SendTokenOTP(token)
    }

    const sendTokenHandlerTOTP = async ()=>{
        await SendTokenTOTP(token)
    }

    const getQRCodeHandler = async()=>{
        QRCode.current.innerHTML = await getQRCode()
        
    }

    const getEmailTokenHandler = async ()=>{
        await GetEmailToken()
        mess.current.innerText = "mail sent"
    }
    return (
        <>
            <div>
                <div ref={QRCode}></div>
                <button onClick={getQRCodeHandler}>GET QRCode</button>
                    
                <div>
                    <input 
                        name="token" 
                        size="6" 
                        onChange={(e)=>setToken(e.target.value)}
                    />
                    <button onClick={sendTokenHandlerTOTP}>Send code</button>
                </div>
            </div>
            <div>
                <p>CLick to get your code by email</p>
                <p ref={mess}></p>
                <button onClick={getEmailTokenHandler}>Get my code</button>
                <div>
                    <input 
                        name="token" 
                        size="6" 
                        onChange={(e)=>setToken(e.target.value)}
                    />
                    <button onClick={sendTokenHandlerOTP}>Send code</button>
                </div>
            </div>
        </>
    )
}


export default EnableMFA