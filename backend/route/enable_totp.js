const express = require('express');
const speakeasy = require('speakeasy');
const path = require('path');
const User = require('../models/user');
const {verifyAccessToken, accessErrorHandler} = require('../middleware/auth');
const { v4 : uuidv4 } = require('uuid');
const QRCode = require('qrcode');

const router = express.Router();

router.use(verifyAccessToken);
router.use(accessErrorHandler);
router.use("/data", express.static(path.join(__dirname, 'views')));


const Generator = async (text, filename) => {
    return await QRCode.toFile(path.join(__dirname, `views/${filename}.svg`), text, function (err) {
    if (err) throw err
    console.log('done')
    });
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
        user.TOTP_enabled = true;
        user.OTP_enabled = false;
        await user.save();  
        
        const filename = uuidv4();
        await Generator(secret.otpauth_url, filename);

        return res.json({filename:`${filename}.svg`});

    }catch(err){
        console.error(err.message);
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