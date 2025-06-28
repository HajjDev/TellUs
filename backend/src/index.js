require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const {loginRouter, refreshToken} = require("../route/auth");
const registerRouter = require("../route/register");
const testRoute = require('../route/test');
const morgan = require('morgan');
const cookies = require('cookie-parser');
const cors = require('cors');

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cookies());
app.use(cors({
    origin:'http://127.0.0.1:5500', //accept request comming from frontend
    credentials: true //allow cookie
}));
app.use('/api/auth', loginRouter);
app.use('/api/refresh_token', refreshToken);
app.use('/api/register', registerRouter);
app.use('/', testRoute);



mongoose.connect(MONGO_URI)   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});