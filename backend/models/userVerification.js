const mongoose = require("mongoose");

// Temporary user Schema that will store some informations temporarily until the user verifies or not their email address
const userVerificationSchema = new mongoose.Schema({
    userId: String,
    uniqueString: String,
    createdAt: Date,
    expiresAt: Date
});

const UserVerfification = mongoose.model("userVerification", userVerificationSchema);

module.exports = UserVerfification;