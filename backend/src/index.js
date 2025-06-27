require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const {loginRouter, refreshToken} = require("../route/auth");
const registerRouter = require("../route/register")
const morgan = require('morgan');

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/auth', loginRouter);
app.use('/api/refresh_token', refreshToken);
app.use('/api/register', registerRouter);

mongoose.connect(MONGO_URI)   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});