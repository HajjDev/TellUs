const express = require('express');
const speakeasy = require('speakeasy');
const crypto = require('crypto');
const router = express.Router();


router.post('/enable-mfa', async (req, res) =>{
    const secret = speakeasy.generateSecret();
    req.user.totpSecret = secret.base32;
    await req.user.save();
    res.json({ secret : secret.otpauth_url }); //seend the response
});c    

router.post('/verify-mfa', (req, res)=>{
    const { token } = req.body;
    const verified = speakeasy.totp.verify({
        secret: req.user.totpSecret,
        encoding: 'base32',
        token
    });

    if (verified) {
        res.send('MFA verified');
    }else{
        res.status(400).send('Invalid token');
    }
});

router.get("/", (req, res)=>{
    res.send('Here to perform MFA');
});

module.exports = router;