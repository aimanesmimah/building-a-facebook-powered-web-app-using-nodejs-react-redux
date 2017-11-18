var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require('../models/user');
var config = require('./config');

module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret ;
    console.log('password config entered');
    passport.use(new JwtStrategy(opts,function (jwt_payload,done) {
        console.log('jwt strategy entered');
        console.log(jwt_payload._id);
        User.getUserById(jwt_payload._id,function (err,user) {
           if(err){
               return done(err,false);
           }
           if(user){
               console.log('user found');
               done(null,user);
           }
           else{
               console.log('user not found');

               done(null,false);
           }
        });
    }));
};

