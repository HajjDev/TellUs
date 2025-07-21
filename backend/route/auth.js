const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const crypto = require('crypto');
const transporter = require('../config/transporter');
require('dotenv').config();
const {verifyCaptcha} = require("../middleware/recaptcha");
const loginRouter = express.Router();
const logoutRouter = express.Router();



loginRouter.post('/login', verifyCaptcha, async (req, res)=>{
    try{
        const input = req.body;
        const user = await User.findOne({ 
            $or: [
                {email : input.ename },
                {userName : input.ename }
            ]
        });

        if (!user){
            return res.status(401).send("error401");//error file located in the view directory
        }

        
        if (!await user.comparePassword(input.password)){
            return res.status(400).send("false credentials");
        }

        
        // If the user is not verified, they can't log-in
        if (!user.verified) {
            return res.status(400).send("Not verified");
        }

        if (user.OTP_enabled){
            req.user = user;
            res.cookie('id', user._id, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", 
                sameSite: "Lax",       
                path: "/",
                maxAge: 1000 * 60 * 30
            });

            const secret = speakeasy.generateSecret({length: 20});
            user.secret = secret.base32;
            await user.save();

            const token = speakeasy.totp({
                secret: secret.base32,
                encoding: 'base32',
            });

            mailOptions = {
                from:process.env.AUTH_MAIL,
                to:user.email,
                subject:"TellUs connection code",
                html:`<p>Hello there,</p></br><p>Your verification code is : ${token}</p>`
            };

            await transporter.sendMail(mailOptions);        

            res.cookie('id', user._id, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", 
                sameSite: "Lax",       
                path: "/",
                maxAge: 1000 * 60 * 30
            });

            return res.status(200).send('Credentials verified. waiting for verification code');
        }

        if (user.TOP_enabled){
            req.user = user;
            res.cookie('id', user._id, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", 
                sameSite: "Lax",       
                path: "/",
                maxAge: 1000 * 60 * 30
            });

            return res.status(200).send('Credentials verified. waiting for verification code');
        }

        //this session creation send automatically a cookie to the client containing the sessionID

        const access_token = jwt.sign({id: user._id,
                                       jti:crypto.randomUUID()}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'30m'}); //1800000

        const refresh_token = jwt.sign({id: user._id, 
                                        jti:crypto.randomUUID()}, process.env.REFRESH_TOKEN_SECRET, {expiresIn:'90 days'});//90 days

        res.cookie("access_token", access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: "Lax",       
            path: "/",
            maxAge: 1000 * 60 * 30
        });


        res.cookie("refresh_token", refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",         
            sameSite: "Lax",       
            path: "/",
            maxAge: 1000 * 60 * 30 * 2
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



module.exports = {loginRouter, logoutRouter};