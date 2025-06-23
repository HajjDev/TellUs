const express = require('express');
const session = require('express-session');
const redis = require('redis');
const connectRedis = require('connect-redis');
const { v4 : uuidv4 } = require('uuid'); //uuid contient plusiers versions, nous on choisi la v4
require('dotenv').config();

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

RedisClient.connect().catch(console.error);


let redisStore = new connectRedis.RedisStore({
  client: RedisClient,
  prefix: "tellus:",
})

const sessionMiddleware = session({
    secret: process.env.SECRET,
    store: redisStore,
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