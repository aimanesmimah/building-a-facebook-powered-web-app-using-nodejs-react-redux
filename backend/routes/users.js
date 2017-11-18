var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var config = require('../config/config');
var passportConfig = require('../config/passport');
passportConfig(passport);

/* GET users listing. */


router.post('/signin',function (req,res,next) {
    User.getUserByEmail(req.body.email,function (err,user) {
        if(err)
            throw err;
        if(!user){
            res.json({success : false , message : "the email you have entered isn't correct"});
        }
        else{
            User.comparePassword(req.body.password,user.password,function (err,isMatch) {
                if(err) throw err;
                if(isMatch){
                    console.log('is match');
                    var token = jwt.sign(user.toJSON(),config.secret);
                    //console.log(user._id);
                    //res.cookie("exemple", 'ayman', {maxAge : 9999});
                    res.json({success : true , message : "success",
                        token : 'JWT ' + token, userId : user._id, email : user.email });
                }
                else{
                    console.log('invalid password');
                    return res.json({success : false , message: 'Invalid Password'});
                }
            });
        }
    });
});

router.post('/register',function (req,res,next) {
    var email = req.body.email ;
    var password = req.body.password ;
    var newUser = new User({
        email : email ,
        password : password
    });


    User.createUser(newUser,function (err,user) {
        if(err) {
            if(err.code === 11000){
                res.json({success : false ,
                    message : "the email you typed is already attached to another account " });
            }
            else
                throw err;
        }

        if(user){
            res.json({success : true , message : "you are registered successfuly" ,
                email : user.email , password : req.body.password});
        }
        else {
            res.json({success : false , message : "an error has occured. Please try again"});
        }
    });
});


module.exports = router;

