const RegisterCrucialForm = ({setUserName, setDisplayName, setEmail, setPhoneNumber, setPassword, setReEnteredPassword, register}) => {
    return (
        <>
            <div className="crucial-information">
                <div className="profile-information">
                    <div>
                        <label htmlFor="userName">Username</label>  
                        <input 
                            id="userName" 
                            type="text"
                            onChange={(e) => setUserName(e.target.value)}
                            minLength={2}
                            maxLength={30}
                            placeholder="Username" 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="displayName">Display name</label>  
                        <input 
                            id="displayName" 
                            type="text"
                            onChange={(e) => setDisplayName(e.target.value)}
                            minLength={2}
                            maxLength={40}
                            placeholder="Display name" 
                            required
                        />
                    </div>
                </div>
                <br />
                <div>
                    <label htmlFor="email">Email</label>  
                    <input 
                        id="email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter a valid email address" 
                        required
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="phoneNumber">Phone number</label>  
                    <input 
                        id="phone"
                        onChange={(e) => setPhoneNumber(e.target.value)} 
                        type="tel"
                    />
                </div>
                <br />
                <div className="password-div">
                    <div>
                        <label htmlFor="password">Password</label>  
                        <input 
                            id="password" 
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            maxLength={32}
                            placeholder="Password" 
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password-confirmation">Confirm your password</label>  
                        <input 
                            id="password-confirmation" 
                            type="password"
                            onChange={(e) => setReEnteredPassword(e.target.value)}
                            maxLength={32}
                            placeholder="Re-enter your password" 
                            required
                        />
                    </div>
                </div>
                <br />
            </div>
            <button onClick={register}>Register</button>
        </>
    );
};

export default RegisterCrucialForm;