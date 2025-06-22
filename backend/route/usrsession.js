const express = require('express');
const redis = require('redis');
const { v4 : uuidv4 } = require('uuid'); //uuid contient plusiers versions, nous on choisi la v4
require('dotenv').config();

const app = express();
const sessionID = uuidv4();
console.log(sessionID);
console.log(process.env.REDIS_USR);
console.log(process.env.REDIS_SECRET);

const client = redis.createClient({
    username: process.env.REDIS_USR,
    password: process.env.REDIS_SECRET,
    socket: {
        host: 'redis-19121.c283.us-east-1-4.ec2.redns.redis-cloud.com',
        port: process.env.REDIT_PORT
    }
});

async function newUserSession(data){
    client.on('error', err => console.log('Redis Client Error', err));

    await client.connect();

    await client.set(`session_usr:${sessionID}`, 'bar'); 
    const result = await client.get(`session_usr:${sessionID}`);
    console.log(result);

}

newUserSession();


app.listen('3001', ()=>{
    console.log('server is running')
});
// async function { //userdata as parameters
//     await client.connect();

//     const key = uuidv4();

//     await client.hSet(`user-session:${key}`, {
//         //here the user data
//     });

//     const value = await client.get();

// }


