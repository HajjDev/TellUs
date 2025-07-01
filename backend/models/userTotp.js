const mongoose = require('mongoose');

const totpSecretSchema = new mongoose.Schema({
    id:{type:String, required:true},
    attempts:{type:Number, default:0},
    totpSecret:{type:String, required:true},
    expireAt:{type:Date, expires:80}
})

const userTotp = mongoose.model('totpSecret', totpSecretSchema);

module.exports = userTotp;