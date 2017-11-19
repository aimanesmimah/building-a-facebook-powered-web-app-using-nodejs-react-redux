var express = require('express');
var router = express.Router();
var passport = require('../config/passportfacebook');
var config = require('../config/config');



router.post('/auth/facebook',passport.authenticate('facebook-token',
    {scope : ['user_photos']}),
    function (req,res) {
        console.log("success");
        //console.log(req.user);
        if(req.user) {
            console.log(req.user);
            res.json({success: true,user : req.user});
        }
        else{
            res.json({success : false});
        }
    });



module.exports = router;