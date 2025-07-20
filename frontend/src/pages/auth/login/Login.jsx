import { useState } from "react";
import LoginForm from "../../../components/auth/login/loginForm"
import SendCredentials from '../../../components/auth/login/sendCredentials'
import ResetPassword from '../../../components/auth/login/resetPassword'



function LoginPage(){
  
    const [user, setUser] = useState({
        ename:"",
        pswd:""
    });


    return (
        <div>
            <LoginForm user={user} setUser={setUser}/>
            <SendCredentials ename={user.ename} pswd={user.pswd}/>
            <ResetPassword/>
        </div>
    )
}



export default LoginPage