const express = require('express');
const mongoose = require('mongoose');
const usrSession = require('../middleware/usrSession');
const User = require('../models/user');
const cors = require('cors');
const morgan = require('morgan');
const router = express.Router();

router.use(express.json());
router.use(morgan('dev'));
router.use(usrSession);

router.post('/login', async (req, res)=>{

    try{
        const input = req.body;
        const user = await User.findOne({ 
            $or: [
                {email : input.ename },
                {username : input.ename }
            ]
        });

        if (!user || ! await user.comparePassword(input.password)){
            res.status(401).render("error401");//error file located in the view directory
        }

        //this session creation send automatically a cookie to the client containing the sessionID
        req.session.user = {
            id : user._id,
            username : user.username,
            email: user.email,
            displayName
        };

        //the frontend will need some user Data, but i need to give only none relevant info which are sufficient to identify the user
        res.status.json({message:"successfully connected", user:req.session.user});
        
    }catch(err){
        console.error(err.message);
    }

});
