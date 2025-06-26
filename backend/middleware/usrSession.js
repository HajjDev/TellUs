const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { v4 : uuidv4 } = require('uuid'); //uuid contient plusiers versions, nous on choisi la v4
require('dotenv').config();



const sessionMiddleware = session({
    secret: process.env.SECRET,
    cookie:{
        maxAge:60000, //1min
        sameSite:'Strict', //Against CSRF Attacks
        httpOnly: true, //Aigainst XSS Attacks: never accessible via js
        secure: process.env.NODE_ENV === "production" //it must be false for localhost
    },

    resave:false, // required: force lightweight session keep alive
    saveUninitialized:false, // recommended: only save session when data exists
    rolling:true //refresh after each get request a cleint side
});


module.exports = sessionMiddleware;