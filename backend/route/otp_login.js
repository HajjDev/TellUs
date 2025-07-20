const express = require('express');
const transporter = require('../config/transporter');
const User = require('../models/user');
const speakeasy = require('speakeasy');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const {verifyAccessToken, accessErrorHandler, verifyRefreshToken, refreshErrorHandler, updateToken} = require('../middleware/auth');

const router = express.Router();
const middlewares = [verifyAccessToken, accessErrorHandler, verifyRefreshToken, refreshErrorHandler, updateToken];
router.use(middlewares);

router.post('/otp_login',async (req, res)=>{
    try{

        const userId = req.user._id;
        let user = await User.findOne({_id:userId});
        if (!user) {
            throw new Error('User not registered');
        }
        
        if (!user.verified){
            return res.status(400).send("Not verified");
        }

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

        res.cookie('id', userId, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", 
                sameSite: "Lax",       
                path: "/",
                maxAge: 1000 * 60 * 30
        });

        return res.status(200).send('Credentials verified. waiting for verification code');

    }catch(err){
        res.status(422).send("Something went wrong");
        console.log(err);

    }
});



module.exports = router;