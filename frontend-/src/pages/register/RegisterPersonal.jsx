import { useState } from "react";
import { useNavigate } from "react-router-dom";
import registerPersonal from "../../requests/auth/register/registerPersonal";
import RegisterPersonalForm from "../../components/register/RegisterPersonalForm";

const RegisterPersonal = () => {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [surName, setSurName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');

    const navigate = useNavigate();

    const nextPage = async () => {
        try {
            await registerPersonal(firstName, middleName, surName, dateOfBirth, gender);
            navigate('/register-crucial');
        } catch(err) {
            console.error(err.message);
        }
    }

    return (
        <>
            <RegisterPersonalForm
                setFirstName = {setFirstName}
                setMiddleName = {setMiddleName}
                setSurName = {setSurName}
                setDateOfBirth = {setDateOfBirth}
                setGender = {setGender}
                nextPage = {nextPage}
            />
        </>
    );
};

export default RegisterPersonal;