import {Routes, Route } from "react-router-dom"
import Layout from './pages/auth/Layout.jsx'
import LoginPage from './pages/auth/login/Login'
import Home from './home.jsx'
import EnableMFA from './pages/enable_MFA/enable_mfa'
import AdminProfile from "./pages/admin_view/admin_profile.jsx"

import RegisterPersonal from "./pages/auth/register/RegisterPersonal";
import RegisterCrucial from "./pages/auth/register/RegisterCrucial";
import VerifyCredentials from "./pages/auth/security/VerifyCredentials";

import EmailVerification from "./pages/auth/security/EmailVerification";
import ResetPassword from "./pages/auth/security/ResetPassword";
import ResetPasswordChange from "./pages/auth/security/ResetPasswordChange";
import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
          <Route index element={<Home />}/>
          <Route path='login' element={<LoginPage/>}/>
          <Route path="register/personal-info" element={<RegisterPersonal />} />
          <Route path="register/crucial-info" element={<RegisterCrucial />} />
          <Route path="register/verify-credentials" element={<VerifyCredentials />} />
      </Route>
      <Route path="/profile" element={<AdminProfile authorized={false} />}/>
      <Route path="password/reset" element={<EmailVerification />} />
      <Route path="password/verify" element={<ResetPassword />} />
      <Route path="password/change" element={<ResetPasswordChange />} />
      <Route path="/enable_mfa" element={<EnableMFA/>}>
      </Route>
    </Routes>
  );
};

export default App;
