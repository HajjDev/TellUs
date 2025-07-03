const express = require("express");
const router = express.Router();
const speakeasy = require('speakeasy');
const bcrypt = require("bcrypt");
const User = require('../models/user');
const transporter = require("../config/transporter");
require('dotenv').config();

const createToken = () => {
    /**
     * Creates a unique secret key and a token that will be sent to the user to reset their password, this token has a lifetime of 15 minutes
     * 
     * @returns {{ secret: string, token: string}}
     * secret: the secret that has been generated that will be used to verify the token
     * token: unique key
     */

    // secret used to verify the token
    const secret = speakeasy.generateSecret({ length: 20 });

    // token that will be sent to the user
    const token = speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32',
        step: 900, // 15 minutes
    });

    return { secret: secret.base32, token };
};


const sendMail = async (email, token) => {
    /**
     * Sends the mail containing the token to the user
     * 
     * @param email - The email of the user
     * @param token - The unique token generated with createToken()
     * 
     */

    // Options used in the mail
    const mailOptions = {
        from: process.env.AUTH_MAIL,
        to: email, // User's registered email
        subject: "TellUs - Reset Your Password",
        html: `<p>Dear,</p><p>We have receive a reset password request from this account.</p><p>Here is your code:</p><h2>${token}</h2><p>This code will expire in <b>15 minutes</b></p><p>If you did not make this request please ignore this mail</p>`,
    };

    await transporter.sendMail(mailOptions); // Send the mail
};


const sendSuccessfulMail = async (email) => {
    /**
     * Sends a mail to the user notifying them that their password has been changed.
     * 
     * @param email - The email of the user
     * 
     */

    // Options used in the mail 
    const mailOptions = {
        from: process.env.AUTH_MAIL,
        to: email, // User's registered email
        subject: "TellUs - Password Changed Successfully",
        html: `<p>Dear,</p><p>Your <b>password has been changed</b> successfully!</p><p>Please make sure to log in <a href='http://localhost:5500/frontend/publics/html/login.html'>here</a></p><h4>If you did not make this change, please contact support immediately!</h4>`,
    };

    await transporter.sendMail(mailOptions); // Send the mail
};

// Route to verify the email of the user before sending the token.
router.post("/emailInput", async (req, res) => {
    try {
        // We take our data from the body sent
        const email = req.body;
        
        const user = await User.findOne({email: email["email"]}); // Check if a user exists with the email sent
        if (user) {
            if (user.verified) {
                const { secret, token } = createToken(); // We create the token using our function
                await user.updateOne({ resetPasswordSecret: secret }); // We store it in the database
                await sendMail(email["email"], token); // WE send the mail to the user
                res.json({message: "Successfully sent mail", email: email["email"]})

            // Specify an error if the user is not registered or if they are not verified
            } else {
                res.json({message: "please verify your account before resetting your password"});
            }
        } else {
            res.json({message: "User not registered with this email"});
        };
    } catch(err) {
        console.log(err.message)
    };
});

// Route to verify the token
router.post('/password', async (req, res) => {
    // We take our data from the body sent
    const sentCode = req.body.code;

    try {
        const email = req.body.email['json']['email'];
        const user = await User.findOne({email: email});

        // If the user is in the database
        if (user) {
            // We verify the token that has been sent to check if it is still valid or expired
            const verify = speakeasy.totp.verify({
                secret: user.resetPasswordSecret, // secret that we stored earlier
                encoding: 'base32',
                token: sentCode, // code sent by the user
                step: 900,
                window: 1,
            });
            
            // We send true or false based on the verification
            if (verify) {
                res.json(true);
            } else {
                res.json(false);
            }
        }
    } catch(err) {
        console.log(err);
    };
});

// Route used to change the password of the user
router.post("/password-change", async (req, res) => {
    try {
        // We begin by taking the data from our request
        const password = req.body.password;
        const passwordConfirmation = req.body.passwordConfirmation;
        const email = req.body.email['json']['email'];

        // We check if both of the passwords are equal, if not the user did not input the same password twice
        if (password != passwordConfirmation) {
            res.json({message: 'The passwords do not match'});
        } else {
            // We find the user by it's email that has been saved earlier in the local storage
            const user = await User.findOne({email: email});
            if (user) {
                // We hash the password to secure it in the database, then update the user in our database
                const hashedPassword = await bcrypt.hash(password, 12);
                await user.updateOne({password: hashedPassword});
                sendSuccessfulMail(email); // After these steps, we send the successful mail
                res.json({message: 'User password Updated Successfully'});
            } else {
                res.json({message: 'User not registered'});
            }
        }
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;