require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user")

const app = express();
const uri = process.env.MONGO_URI;

const newUser = new User({
    id: "1",
    displayName: "Charbel El Hajj",
    userName: "Charbel",
    name: {
        familyName: "El Hajj",
        givenName: "Charbel",
        middleName: "",
    },
    emails: "charbelhajj129@gmail.com",
    phoneNumber: "+32495825529",
    password: "test123",
})

newUser.save()

mongoose.connect(uri)   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

app.listen("3001", () => {
    console.log("Server is running")
});