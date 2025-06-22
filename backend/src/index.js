require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");
const authRouter = require("../route/auth");
const morgan = require('morgan');

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT

const app = express();
app.use(morgan('dev'));
app.use('/api/auth', authRouter);

<<<<<<< HEAD
mongoose.connect(uri)   
=======

mongoose.connect(MONGO_URI)   
>>>>>>> 7d10afdf864c61d2be238f2b383cd7c467c5d699
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log("Server is running")
});