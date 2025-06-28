const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const cookieExtractor = require('../utils/cookie'); 
const {verifyRefreshToken, refreshErrorHandler} = require('../middleware/auth');
const crypto = require('crypto');
require('dotenv').config();

const loginRouter = express.Router();
const logoutRouter = express.Router();
const refreshToken = express.Router();


loginRouter.post('/login', async (req, res)=>{
    try{
        const input = req.body;
        const user = await User.findOne({ 
            $or: [
                {email : input.ename },
                {userName : input.ename }
            ]
        });

        if (!user){
            res.status(401).send("error401");//error file located in the view directory
        }

        
        if (!await user.comparePassword(input.password)){
            res.status(400).send("false credentials");
        }

        //this session creation send automatically a cookie to the client containing the sessionID

        console.log(process.env.ACCESS_TOKEN_SECRET);
        console.log(process.env.REFRESH_TOKEN_SECRET);
        console.log(user);
        console.log(crypto.randomUUID());
        const access_token = jwt.sign({id: user._id,
                                       jti:crypto.randomUUID()}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'0.5m'}); //1800000

        const refresh_token = jwt.sign({id: user._id, 
                                        jti:crypto.randomUUID()}, process.env.REFRESH_TOKEN_SECRET, {expiresIn:'1m'});//90 days

        res.cookie('access_token', access_token, {
            maxAge: 1800000, //1h while
            sameSite:'None', //Against CSRF Attacks
            httpOnly: true, //Aigainst XSS Attacks: never accessible via js
            secure: process.env.NODE_ENV === "production" //it must be false for localhost
        });

        res.cookie('refresh_token', refresh_token, {
            maxAge: 7776000000, //90 days 
            sameSite:'None', //Against CSRF Attacks
            httpOnly: true, //Aigainst XSS Attacks: never accessible via js
            secure: process.env.NODE_ENV === "production" //it must be false for localhost            
        });
        console.log('|||||||||||||||||||||');
        console.log(req.cookies);
        //the frontend will need some user Data, but i need to give only none relevant info which are sufficient to identify the user
        res.status(201).json({message:"successfully connected", user:{
            id:user._id,
            username:user.userName
            //role:user.role
        }});

    }catch(err){
        console.error(err.message);
    }

});



refreshToken.post('/refresh_token', verifyRefreshToken, refreshErrorHandler, (req, res)=>{
    const access_token = jwt.sign({id: req.body.user.id, 
                                    jti:crypto.randomUUID()}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'1800000'});
    //here the request contain the data of the user|| req.params.id could also be used depending on where the frontend has stored the id, URI or req body

    res.clearCookie('access_token', { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: 'None' });

    res.cookie('access_token', access_token, {
        maxAge:1800000, //1h
        sameSite:'None', //Against CSRF Attacks
        httpOnly: true, //Aigainst XSS Attacks: never accessible via js
        secure: process.env.NODE_ENV === "production" //it must be false for localhost
    });

    res.status(201).send('new access_token created');
});

logoutRouter.post('/logout', (req, res)=>{
    
});


module.exports = {loginRouter, logoutRouter, refreshToken};