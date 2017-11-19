var express = require('express');
var router = express.Router();
var passport = require('passport');
var config = require('../config/config');
var User = require('../models/user');




/* GET home page. */
router.get('/testDashboard',passport.authenticate('jwt', { session: false}),
    function(req, res, next) {
        var token = config.getToken(req.headers);
        if(token){
            console.log("succeess toookeeeen tocken");
            console.log(req.user);
            console.log('**************');
            //console.log(req.signedCookies);
            //console.log(req.cookies);
            //res.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
            res.json({success : true});
        }
        else{
            console.log('failure');
            res.json({success : false});
        }
    });

router.get('/account',passport.authenticate('jwt', { session: false}),
    function (req,res,next) {

        console.log(req.user);
        res.json({userId : req.user._id , email : req.user.email });

    });

router.post('/updateUser',passport.authenticate('jwt', { session: false}),
    function (req,res,next) {
        console.log('update entered');
        User.updateUser(req.user._id,req.body.email,req.body.password,function (err,user) {
            if(err)
                throw err ;
            else
                res.json({userId :user._id , email : user.email});
        });
    });



module.exports = router;
