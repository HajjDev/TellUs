const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// User Schema with all the informations provided while registering
const userSchema = new mongoose.Schema({
    displayName: {type: String, required: true},
    userName: {type: String, required: true},
    name: {
        familyName: {type: String, required: true},
        givenName: {type: String, required: true},
        middleName: String,
    },
    createdAt: Date,
    dateOfBirth: Date,
    gender: String,
    email: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    password: {type: String, required: true},
    verified: Boolean,
    totpSecret:String
});



userSchema.pre('save', async function(next){
    if (this.isModified('password')){ //verify that the password is hached only one time: when a new user is created or when a user modify his password
        try{
            this.password = await bcrypt.hash(this.password, 12);
        }catch(err){
            return next(err);
        }
    }

    next();
});


userSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password, this.password);
}; //this method is customized by us to easily verify the password at user login

const User = mongoose.model("users", userSchema);

module.exports = User;