import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordChangeForm from "../../components/security/PasswordChangeForm";
import resetPasswordChange from "../../requests/security/resetPasswordChange";

const ResetPasswordChange = () => {
    const [password, setPassword] = useState('');
    const [reEnteredPassword, setReEnteredPassword] = useState('');
    const email = JSON.parse(localStorage.getItem("mailVerification")) || {};
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const changePassword = async () => {
        try {
            const result = resetPasswordChange(email, password, reEnteredPassword);
            setMessage(result.message);

            const timer = setTimeout(() => {
                navigate('/login');
            }, 5000);

        } catch(err) {
            console.error(err.message);
        };
    };

    return (
        <>
            <PasswordChangeForm 
                setPassword = {setPassword}
                setReEnteredPassword = {setReEnteredPassword}
                passwordChanged = {changePassword}
            />
        </>
    );
};

export default ResetPasswordChange;