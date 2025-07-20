require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const {loginRouter, refreshToken} = require("../route/auth");
const registerRouter = require("../route/register");
const testRoute = require('../route/test');
const resetRoute = require("../route/reset");
const enable_totp=require('../route/enable_totp');
const enable_otp = require('../route/enable_otp');
const otp_login = require('../route/otp_login');
const mfa_login= require('../route/mfa_login');
const morgan = require('morgan');
const cookies = require('cookie-parser');
const cors = require('cors');
const limiter = require('../middleware/limiter');

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3001;


const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cookies());
app.use(cors({
    origin:['http://127.0.0.1:5500', 'http://localhost:5500', 'http://localhost:5173'], 
    credentials: true
}));
app.use(limiter);
app.use('/api/auth', loginRouter);
app.use('/api/register', registerRouter);
app.use('/api/reset', resetRoute);
app.use('/test', testRoute);
app.use('/api/mfa', enable_otp);
app.use('/api/mfa', enable_totp);
app.use('/api/auth', otp_login);
app.use('/api/auth', mfa_login);


mongoose.connect(MONGO_URI)   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});