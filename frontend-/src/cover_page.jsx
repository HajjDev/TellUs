import { useState } from "react"
import sendData from "./requests/auth/login";
import { Outlet, Link } from "react-router-dom" //Link redirect and Outlet render the page 

function LoginForm({user, setUser}){

    const handleChange = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setUser(user=>({...user, [name]:value}));
    }

    return (
        <>
            <h1>Enjoy your login page Bro. And don't try to hack this page. you will fail. Ha ha ha ha... loser!</h1>
            <div>
                <label>Enter your username or email:
                    <input 
                        type="text" 
                        name="ename"
                        value={user.ename}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label>Enter your password:
                    <input 
                        type="text"
                        name="pswd"
                        value={user.pswd}
                        onChange={handleChange}
                    />
                </label>
            </div>
        </>
    )

}

function SendCredentials({ename, pswd}){

    const SendCredentialsHandler = async ()=>{
        await sendData(ename, pswd)
    }

    return (
        <div>
            <button onClick={SendCredentialsHandler}>Log in</button>
        </div>
    )
}

function ResetPassword(){
    return (
        <div>
            <p>Password Forgotten, reset it here: <Link to="/reset_password">reset password</Link></p>
            <Outlet/>
        </div>
    )
}

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