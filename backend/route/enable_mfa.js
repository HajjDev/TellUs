const express = require('express');
const speakeasy = require('speakeasy');
const passport = require('passport');
const router = express.Router();


router.post('/enable-mfa', passport.authenticate('jwt', {session: false}), async (req, res) =>{
    const secret = speakeasy.generateSecret();
    req.user.totpSecret =  secret.base32;
    await req.user.save();
    res.json({ secret : secret.otpauth_url }); //seend the response
});

router.post('/verify-mfa', passport.authenticate('jwt', { session: false }), (req, res)=>{
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