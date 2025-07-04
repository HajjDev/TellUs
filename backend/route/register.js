const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const registerPersonalCheck = require('../middleware/register/registerPersonalCheck');
const registerCrucialCheck = require('../middleware/register/registerCrucialCheck');
const User = require('../models/user');
const UserVerification = require('../models/userVerification');
const {v4: uuidv4} = require('uuid');
const transporter = require("../config/transporter");
require('dotenv').config();

const sendVerificationEmail = async ({_id, email}, res) => {
    const url = "http://localhost:5500/";
    const uniqueString = uuidv4() + _id; // The unique string generated everytime a user want to register

    // Options used in the mail
    const mailOptions = {
        from: process.env.AUTH_MAIL,
        to: email, // User's registered email
        subject: "TellUs - Verify Your email Address",
        html: `<p>Welcome,</p><p>Please verify your email address to complete the sign up process and login to your account.</p><p>This link expires in <b>6 hours</b>.</p><p>Press <a href=${url + "frontend/publics/html/verify_credentials.html?userId=" + _id + "&token=" + uniqueString}>here</a> to proceed./</p>`,
        
    };

    try {
        const saltRounds = 10; // rounds to hash the uniqueString
        const hashedUniqueString = await bcrypt.hash(uniqueString, saltRounds);
        // We create a new Temporary User in the verification Table
        const newVerification = new UserVerification({
            userId: _id,
            uniqueString: hashedUniqueString,
            createdAt: Date.now(),
            expiresAt: Date.now() + 21600000
        });

        // We save it and then we send the mail to the registered email
        await newVerification.save();
        await transporter.sendMail(mailOptions);

    } catch(err) {
        console.log(err);
    }
};

router.get("/verifyAccount/:userId/:uniqueString", async (req, res) => {
    let {userId, uniqueString} = req.params; // We get the user's ID and uniqueString

    try {
        // We try to find if the user's is actually registered
        const userIdVerification = await UserVerification.find({userId});
        if (userIdVerification.length > 0) {
            const {expiresAt} = userIdVerification[0]; // Get the expiration date of the link sent by the email
            const hashedUniqueString = userIdVerification[0].uniqueString;
            
            // If the link is not longer valid, we delete the user in both tables
            if (expiresAt < Date.now()) {
                await UserVerification.deleteOne({userId});
                await User.deleteOne({_id: userId});
                res.json({message: "Link has expired. Sign up"});
            
            // If it is still valid
            } else {
                // We compare the unique Strings to make sure the string provided is not corrupted
                const compareStrings = await bcrypt.compare(uniqueString, hashedUniqueString);
                if (compareStrings) {
                    // We change the status of verified to true if everything is alright, then we delete the temporary user in the database
                    await User.updateOne({_id: userId}, {verified: true});
                    await UserVerification.deleteOne({userId});
                    res.json({message: "<p>Email has been verified, you can now <a href='http://localhost:5500/frontend/publics/html/login.html'>log in</a></p>"});
                } else {
                    res.json({message: "Error while checking for existing user verification, invalid details"});
                }
            }
        } else {
            res.json({message: "Error, user not registered or user already verified"});
        }
    } catch(error) {
        console.log(error);
    }
})

// Register Route
const registerCheck = [registerCrucialCheck, registerPersonalCheck];
router.post("/signup", registerCheck, async (request, res) => {
    try {
        const {
            firstName,
            middleName,
            surName,
            dateOfBirth,
            gender,
            userName,
            displayName,
            email,
            phoneNumber,
            password
        } = request.body;

        const newUser = new User({
            displayName,
            userName,
            name:{
                familyName:surName,
                givenName:firstName,
                middleName:middleName
            },
            createdAt: Date.now(),
            dateOfBirth,
            gender,
            email,
            phoneNumber,
            password,
            verified: false,
        });

        const registeredUser = await newUser.save(); // We save the user (temporarily) after they provided the information
        sendVerificationEmail(registeredUser, res); // We send the email to verify the account

    } catch(err) {
        console.log(err.message)
    };
});

module.exports = router; 