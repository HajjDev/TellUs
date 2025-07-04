const express = require('express');
const speakeasy = require('speakeasy');
const path = require('path');
const User = require('../models/user');
const {verifyAccessToken, accessErrorHandler} = require('../middleware/auth');
const QRCode = require('qrcode');

const router = express.Router();

router.use(verifyAccessToken);
router.use(accessErrorHandler);
router.use(express.static(path.join(__dirname, 'views')));


const Generator = async (text) => {
    return await QRCode.toFile(path.join(__dirname, "views/qrcode.svg"), text, function (err) {
    if (err) throw err
    console.log('done')
    })
}


router.post('/enable_totp', async (req, res) =>{
    try{
        const userId = req.body.id;
        const user = await User.findOne({_id:userId});

        if (!user){
            return res.status(404).send('User Not found. Please register first');
        }


        const secret = speakeasy.generateSecret();
        user.secret = secret.base32;
        user.TOTP_secret = true;
        user.OPT_secret = false;
        await user.save();    
        await Generator(secret.otpauth_url);

        return res.sendFile(path.join(__dirname, '/views/qrcode.svg')); 

    }catch(err){
        console.error(err);
        return res.status(422).send('invalid input');
    }
});

router.post('/verify_totp', async (req, res)=>{
    
    try{
        const { token, userId } = req.body;
        const user = await User.findOne({id: userId});

        if (!user){
        throw new Error("User Not Found.");
        }

        if (!TOTP_enabled){
            throw new Error("Enable TOTP first.");
        }

        const verified = speakeasy.totp.verify({
            secret: totpObject.totpSecret,
            encoding: 'base32',
            token,
            window:1
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



module.exports = router;