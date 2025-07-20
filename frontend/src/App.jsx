import {Routes, Route } from "react-router-dom"
import Layout from './pages/auth/Layout.jsx'
import LoginPage from './pages/auth/login/Login'
import Home from './home.jsx'
import EnableMFA from './pages/enable_MFA/enable_mfa'

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
          <Route path="/register" element={<RegisterPersonal />}>
            <Route path="crucial-info" element={<RegisterCrucial />} />
            <Route path="emailVerification" element={<EmailVerification />} />
          </Route>
      </Route>
      
      <Route path="/verify-credentials" element={<VerifyCredentials />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="/changePassword" element={<ResetPasswordChange />} />
      <Route path="/enable_mfa" element={<EnableMFA/>}>
      </Route>
    </Routes>
  );
};

export default App;
