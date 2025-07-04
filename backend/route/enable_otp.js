const express = require('express');
const speakeasy = require('speakeasy');
const transporter = require('../config/transporter.js');
const User = require('../models/user');
const {verifyAccessToken, accessErrorHandler} = require('../middleware/auth');
require('dotenv').config();

const router = express.Router();
router.use(verifyAccessToken);
router.use(accessErrorHandler);


router.post('/enable_otp', async (req, res)=>{
    try{
        const userId = req.body.id;
        let user = await User.findOne({_id:userId});
        
        if (!user){
            throw new Error('User not found');
        }

        const secret = speakeasy.generateSecret({length: 20});

        user.secret = secret.base32;
        user.OTP_enabled = true;
        user.TOTP_enabled = false;
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
        console.error(err.message);
    }
});

router.post('/verify_otp', async (req, res)=>{
    

    try{
        const userId = req.body.id;
        const token = req.body.token;
        let user = await User.findOne({_id:userId});

        if (!user) {
            throw new Error('User not registered');
        }

        if (!user.OTP_enabled){
            throw new Error('You must first enable OTP 2FA');
        }

        const verified = speakeasy.totp.verify({
            secret:user.secret,
            encoding:'base32',
            token,
            window:1
        });

        if (verified){
            return res.status(200).send('user loged');
        }else{
            return res.status(400).send('Bad request');
        }
    }catch(err){
        console.error(err.message);
    }
});

module.exports = router;