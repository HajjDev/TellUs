import { useState } from "react";
import LoginForm from "../../../components/auth/login/loginForm"
import SendCredentials from '../../../components/auth/login/sendCredentials'
import ResetPassword from '../../../components/auth/login/resetPassword'
import SendMFATokenAtLogin from "../../../components/auth/login/sendCode";


function LoginPage(){
  
    const [user, setUser] = useState({
        ename:"",
        pswd:""
    });


    return (
        <div>
            <LoginForm user={user} setUser={setUser}/>
            <SendCredentials ename={user.ename} pswd={user.pswd}/>
            <SendMFATokenAtLogin GoodCredentials={true}/>
            <ResetPassword/>
        </div>
    )
}



export default LoginPage