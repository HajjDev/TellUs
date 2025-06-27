const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cookieExtractor = require('../utils/cookie'); 
const {verifyRefreshToken, refreshErrorHandler} = require('../middleware/auth');
const crypto = require('crypto');

const loginRouter = express.Router();
const logoutRouter = express.Router();
const refreshToken = express.Router();

loginRouter.use(express.json());
loginRouter.use(morgan('dev'));
loginRouter.use(cookieParser);
loginRouter.use(cors({
    origin:'http://127.0.0.1:5500', //accept request comming from frontend
    credentials: true //allow cookie
}));

logoutRouter.use(express.json());
logoutRouter.use(morgan('dev'));
logoutRouter.use(cookieParser);
logoutRouter.use(cors({
    origin:'http://127.0.0.1:5500', //accept request comming from frontend
    credentials: true //allow cookie
}));

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

        const access_token = jwt.sign({id: user._id,
                                       jti:crypto.randomUUID()}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'1800000'});

        const refresh_token = jwt.sign({id: user._id, 
                                        jti:crypto.randomUUID()}, process.env.REFRESH_TOKEN_SECRET, {expiresIn:'90 days'});

        res.cookie('access_token', access_token, {
            maxAge:1800000, //1h
            sameSite:'Strict', //Against CSRF Attacks
            httpOnly: true, //Aigainst XSS Attacks: never accessible via js
            secure: process.env.NODE_ENV === "production" //it must be false for localhost
        });

        res.cookie('refresh_token', refresToken, {
            maxAge:7776000000, //90 days
            sameSite:'Strict', //Against CSRF Attacks
            httpOnly: true, //Aigainst XSS Attacks: never accessible via js
            secure: process.env.NODE_ENV === "production" //it must be false for localhost            
        });
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
    const access_token = jwt.sign({id: req.user.id, //here the request contain the data of the user
                                    jti:crypto.randomUUID()}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'1800000'});

    res.clearCookie('access_token', { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: 'Strict' });

    res.cookie('access_token', access_token, {
        maxAge:1800000, //1h
        sameSite:'Strict', //Against CSRF Attacks
        httpOnly: true, //Aigainst XSS Attacks: never accessible via js
        secure: process.env.NODE_ENV === "production" //it must be false for localhost
    });

    res.status(201).send('new access_token created');
});

logoutRouter.post('/logout', (req, res)=>{
    
});


module.exports = {loginRouter, logoutRouter, refreshToken};