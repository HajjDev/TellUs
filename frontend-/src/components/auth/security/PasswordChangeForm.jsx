const PasswordChangeForm = ({setPassword, setReEnteredPassword, passwordChanged}) => {
    return (
        <>
            <div className="reset-form">
                <h1>Please Type your new password</h1>
                <br />
                <div>
                    <label htmlFor="password">Password</label>
                    <br />
                    <input 
                        id="password" 
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your new password" 
                        required
                    />
                    <br />
                </div>
                <div>
                    <label htmlFor="password-confirmation">Confirm Password</label>
                    <br />
                    <input 
                        id="password-confirmation" 
                        type="password" 
                        onChange={(e) => setReEnteredPassword(e.target.value)}
                        placeholder="Re-enter your password" 
                        required
                    />
                    <br />
                </div>
            </div>
            <button onClick={passwordChanged}>Reset Password</button>
        </>
    );
};

export default PasswordChangeForm;