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
                        type="password"
                        name="pswd"
                        value={user.pswd}
                        onChange={handleChange}
                    />
                </label>
            </div>
        </>
    )

}

export default LoginForm