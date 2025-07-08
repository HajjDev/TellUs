import { useState } from "react";
import { useNavigate } from "react-router-dom";
import registerCrucial from "../../requests/auth/register/registerCrucial";
import RegisterCrucialForm from "../../components/register/RegisterCrucialForm";

const RegisterCrucial = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [reEnteredPassword, setReEnteredPassword] = useState('');
    const personalInfo = JSON.parse(localStorage.getItem("personalInfo")) || {};

    const register = () => {
        try {
            registerCrucial(userName, displayName, email, phoneNumber, password, reEnteredPassword, personalInfo);
            navigate('/login');

        } catch(err) {
            console.error(err.message);
        }
    };

    return (
        <>
            <RegisterCrucialForm 
                setUserName = {setUserName}
                setDisplayName = {setDisplayName}
                setEmail = {setEmail}
                setPhoneNumber = {setPhoneNumber}
                setPassword = {setPassword}
                setReEnteredPassword = {setReEnteredPassword}
                register = {register}
            />
        </>
    );
    
};

export default RegisterCrucial;