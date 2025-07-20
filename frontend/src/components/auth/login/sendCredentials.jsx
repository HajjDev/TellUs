import sendData from "../../../requests/auth/login";

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

export default SendCredentials