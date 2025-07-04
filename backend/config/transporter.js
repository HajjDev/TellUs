const nodemailer = require("nodemailer");
require("dotenv").config();

// Transporter, the key for sending mails with nodemailer in our program.
// We specify the service used, that is gmail and it creates a new transport, the system used to send mails to users
let transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: process.env.AUTH_MAIL, // sender mail
        pass: process.env.AUTH_PASS // GMAIL App Key
    }
});

// Before proceeding, we verify if the Key provided is valid
transporter.verify((err, succ) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Can send emails (Verified): ${succ}`);
        console.log(`Ready to send emails from ${process.env.AUTH_MAIL}`);
    }
});

module.exports = transporter;