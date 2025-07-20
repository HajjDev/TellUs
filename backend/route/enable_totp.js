const express = require('express');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const User = require('../models/user');
const {verifyAccessToken, accessErrorHandler, verifyRefreshToken, refreshErrorHandler, updateToken} = require('../middleware/auth');
const { v4 : uuidv4 } = require('uuid');
const path = require("path");

const router = express.Router();
const middlewares = [verifyAccessToken, accessErrorHandler, verifyRefreshToken, refreshErrorHandler, updateToken];
router.use(middlewares);
router.use("/data", express.static(path.join(__dirname, 'views')));


router.post('/enable_totp', async (req, res) =>{
    try{
        const userId = req.user.id;
        const user = await User.findOne({_id:userId});

        if (!user){
            return res.status(404).send('User Not found');
        }

        if (!user.verified){
            return res.status(400).send("Not verified");
        }

        const secret = speakeasy.generateSecret();
        user.secret = secret.base32;
        user.TOTP_enabled = true;
        user.OTP_enabled = false;
        await user.save();  
        
        
        const qrcode = await QRCode.toDataURL(secret.otpauth_url);

        return res.json({tag:`<img src="${qrcode}" />`});

    }catch(err){
        console.error(err.message);
        return res.status(422).send('invalid input');
    }

});

router.post('/verify_totp', async (req, res)=>{
    
    try{
        const userId = req.user.id;
        const token = req.body.token;
        console.log(userId);
        const user = await User.findOne({_id: userId});

        if (!user){
            throw new Error("User Not Found.");
        }

        if (!user.TOTP_enabled){
            throw new Error("Enable TOTP first.");
        }

        const verified = speakeasy.totp.verify({
            secret: user.secret,
            encoding: 'base32',
            token,
            window:1
        });

        if (verified) {
            return res.status(200).send('MFA verified');
        }else{
            return res.status(400).send('Invalid entry. Try again');
        }

    }catch(err){
        console.error(err);
        return res.status(422).send('Something went wrong with your credentials');
    }
   
});



module.exports = router;