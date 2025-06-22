const express = require('express');
const mongoose = require('mongoose');
<<<<<<< HEAD
const session = require();
const cookie_parser = require('cookie-parser');
=======
const usrSession = require('../middleware/usrSession');
const User = require('../models/user');
>>>>>>> 7d10afdf864c61d2be238f2b383cd7c467c5d699
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const router = express.Router();

router.use(cookie-parser('1234'));
router.use(express.json());
router.use(morgan('dev'));
router.use(usrSession);
app.use(cors({
    origin:'http://127.0.0.1:5500' //accept request comming from frontend
}));

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
            displayName: user.displayName
        };

        //the frontend will need some user Data, but i need to give only none relevant info which are sufficient to identify the user
        res.status.json({message:"successfully connected", user:req.session.user});

    }catch(err){
        console.error(err.message);
    }

<<<<<<< HEAD
router.post('/login', (req, res)=>{
    req.
=======
>>>>>>> 7d10afdf864c61d2be238f2b383cd7c467c5d699
});

module.exports = router;