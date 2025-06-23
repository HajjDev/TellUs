const express = require('express');
const mongoose = require('mongoose');
const sessionMiddleware = require('../middleware/usrSession');
const User = require('../models/user');
const cors = require('cors');
const morgan = require('morgan');
const router = express.Router();

router.use(express.json());
router.use(morgan('dev'));
router.use(sessionMiddleware);
router.use(cors({
    origin:'http://127.0.0.1:5500', //accept request comming from frontend
    credentials: true //allow cookie
}));

router.post('/login', async (req, res)=>{

    try{
        const input = req.body;
        const user = await User.findOne({ 
            $or: [
                {email : input.ename },
                {userName : input.ename }
            ]
        });

        if (!user){
            res.status(401).send("error401");//error file located in the view directory
        }

        

        if (! await user.comparePassword(input.password)){
            res.status(400).send("false credentials");
        }

        //this session creation send automatically a cookie to the client containing the sessionID
        req.session.user = {
            id : user._id,
            username : user.userName,
            email: user.email,
            displayName: user.displayName
        };

        console.log(req.session);
        //the frontend will need some user Data, but i need to give only none relevant info which are sufficient to identify the user
        res.status(201).json({message:"successfully connected", user:req.session.user});

    }catch(err){
        console.error(err.message);
    }

});

module.exports = router;