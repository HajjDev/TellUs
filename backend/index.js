require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const uri = process.env.MONGO_URI;
console.log(uri);
// const TestSchema = new mongoose.Schema({
//   name: String
// });

// const TestUserModel = mongoose.model('TestUser', TestSchema);

// const usr = new  TestUserModel({name:"usr"});

// await usr.save();
const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});
const userModel = mongoose.model("emp", userSchema);

const emp1 = new userModel({
    name: "charbel",
    age: 23
})

emp1.save();

mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true})   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

app.listen("3001", () => {
    console.log("Server is running")
});