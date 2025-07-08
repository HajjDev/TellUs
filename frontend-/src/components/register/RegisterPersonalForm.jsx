const RegisterPersonalForm = ({setFirstName, setMiddleName, setSurName, setDateOfBirth, setGender, nextPage}) => {
    return (
        <>
            <div className="register-form">
                <div id="basic-information">
                    <div className="name-information">
                        <div>
                            <label htmlFor="firstName">First name</label>  
                            <input
                                id="firstName"
                                type="text"
                                onChange={(e) => setFirstName(e.target.value)}
                                minLength={2}
                                maxLength={25}
                                placeholder="First name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="middleName">Middle name</label>  
                            <input 
                                id="middleName"
                                type="text" 
                                onChange={(e) => setMiddleName(e.target.value)}
                                minLength={2} 
                                maxLength={25}
                                placeholder="Middle name"
                            />
                        </div>
                        <div>
                            <label htmlFor="surname">Surname</label>  
                            <input 
                                id="surname" 
                                type="text"
                                onChange={(e) => setSurName(e.target.value)}
                                placeholder="Surname" 
                                minLength={2}
                                maxLength={25}
                                required
                            />
                        </div>
                        <br />
                    </div>
                    <div className="personal-information">
                        <div>
                            <label htmlFor="dateOfBirth">Date of birth</label>  
                            <input 
                                id="dateOfBirth"
                                type="date"
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <p>Gender</p>
                            <label><input type="radio" id="gender" name="gender" onChange={(e) => setGender(e.target.value)} value="male" required /> Male</label><br />
                            <label><input type="radio" id="gender" name="gender" onChange={(e) => setGender(e.target.value)} value="female" required/> Female</label><br />
                            <label><input type="radio" id="gender" name="gender" onChange={(e) => setGender(e.target.value)} value="other" required/> Other</label>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={nextPage}>Proceed</button>
        </>
    );
};

export default RegisterPersonalForm;