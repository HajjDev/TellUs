const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    displayName: {type: String, required: true},
    userName: {type: String, required: true},
    name: {
        familyName: {type: String, required: true},
        givenName: {type: String, required: true},
        middleName: String,
    },
    dateOfBirth: Date,
    gender: String,
    email: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    password: {type: String, required: true}
});

const User = mongoose.model("users", userSchema);

module.exports = User;