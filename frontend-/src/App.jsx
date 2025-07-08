import {Routes, Route} from "react-router-dom";
import RegisterPersonal from "./pages/register/RegisterPersonal";
import RegisterCrucial from "./pages/register/RegisterCrucial";
import VerifyCredentials from "./pages/security/VerifyCredentials";
import Login from "./pages/login/Login";
import EmailVerification from "./pages/security/EmailVerification";
import ResetPassword from "./pages/security/ResetPassword";
import ResetPasswordChange from "./pages/security/ResetPasswordChange";
import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path="/register-personal" element={<RegisterPersonal />} />
      <Route path="/register-crucial" element={<RegisterCrucial />} />
      <Route path="/verify-credentials" element={<VerifyCredentials />} />
      <Route path="/login" element={<Login />} />
      <Route path="/emailVerification" element={<EmailVerification />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="/changePassword" element={<ResetPasswordChange />} />
    </Routes>
  );
};

export default App;
