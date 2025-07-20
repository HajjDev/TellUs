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

        return res.status(200).send("mail sent");

    }catch(err){
        res.status(422).send("Something went wrong");
        console.log(err);

    }
});


router.post('/otp_verification', async (req, res)=>{
    try{
        const userId = req.user.id;
        const token = req.body.token;
        let user = await User.findOne({_id:userId});

        if (!user) {
            throw new Error('User not registered');
        }        

        const verified = speakeasy.totp.verify({
            secret:user.secret,
            encoding:'base32',
            token,
            window:1
        });

        if (verified){
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

            
            res.status(201).json({message:"successfully connected", user:{
                id:user._id,
                username:user.userName
                //role:user.role
            }});

            return res.status(200).send('user loged');
        }else{
            return res.status(400).send('Bad request');
        }

    }catch(err){
        res.status(422).send("Something went wrong");
        console.error(err.message);
    }


});


module.exports = router;