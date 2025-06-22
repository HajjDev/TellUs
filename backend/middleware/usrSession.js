const express = require('express');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const { v4 : uuidv4 } = require('uuid'); //uuid contient plusiers versions, nous on choisi la v4
require('dotenv').config();

const router = express.Router();
const sessionID = uuidv4();

console.log(sessionID);
console.log(process.env.REDIS_USR);
console.log(process.env.REDIS_SECRET);

const RedisClient = redis.createClient({
    username: process.env.REDIS_USR,
    password: process.env.REDIS_SECRET,
    socket: {
        host: process.env.REDIS_URI,
        port: process.env.REDIS_PORT
    }
});

router.use(session({
    secret: process.env.SECRET,
    store: new RedisStore({ client : RedisClient, prefix: "tellus" }),
    cookie:{
        maxAge:60000, //1min
        sameSite:'Strict', //Against CSRF Attacks
        httpOnly: true, //Aigainst XSS Attacks: never accessible via js
        secure: process.env.NODE_ENV == "production" //it must be false for localhost
    },

    resave:false, // required: force lightweight session keep alive
    saveUninitialized:false, // recommended: only save session when data exists
    rolling:true //refresh after each get request a cleint side
}));


module.exports = router;