const express = require('express');
const speakeasy = require('speakeasy');
const crypto = require('crypto');
const userTotp = require('../models/userTotp');
const User = require('../models/user');
const {verifyAccessToken, accessErrorHandler} = require('../middleware/auth');

const router = express.Router();
const middlewares  = [verifyAccessToken, accessErrorHandler];

router.post('/enable-mfa', middlewares, async (req, res) =>{
    const secret = speakeasy.generateSecret();
    const userId = req.body.id;
    try{
        const user = await User.findOne({_id: userId});

        if (!user){
            throw new Error("No User for theses credentials, you will be redirected to the registration page");
        }

        
        totpSecret = secret.base32;
        expireAt = new Date();
        totpObject = new userTotp({
            totpObject,
            expireAt
        });

        await totpObject.save();

        return res.json({ secret : secret.otpauth_url }); 

    }catch(err){
        console.error(err);
        return res.status(422).send('invalid input');
    }
    
    //seend the response
});

router.post('/verify-mfa', middlewares, async (req, res)=>{
    const { token, userId } = req.body;
    try{
         const totpObject = await userTotp.findOne({id: userId});

         if (!totpObject){
            throw new Error("No totpSecret. please restart the loging in");
         }

        attempts = totpObject.attempts;

        if (attempts >= 5){
            user = await findOne({_id:userId});
            user.locked = true;
            await user.save();
            throw new Error('your account has been locked for 1 day');
        }

        const verified = speakeasy.totp.verify({
            secret: totpSecret,
            encoding: 'base32',
            token
        });

        if (verified) {
            return res.send('MFA verified');
        }else{
            return res.status(400).send('Invalid entry. Try again');
        }

    }catch(err){
        console.error(err);
        return res.status(422).send('Something went wrong with your credentials');
    }
   
});

router.get("/", (req, res)=>{
    res.send('Here to perform MFA');
});

module.exports = router;