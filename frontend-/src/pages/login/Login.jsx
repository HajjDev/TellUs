import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const forgotPassword = () => {
        navigate("/emailVerification");
    };

    return (
        <button onClick={forgotPassword}>Reset Password</button>
    );
};

export default Login;