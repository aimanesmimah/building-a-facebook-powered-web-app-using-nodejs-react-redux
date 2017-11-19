var passport = require('passport'),
    FacebookStrategy = require('passport-facebook-token');

var asyncLoop = require('node-async-loop');
var FBgraph = require('fbgraph');
//var getImageUrls = require('get-image-urls');
//var url_to_image = require('url-to-image');
//var download = require('image-downloader');

var config = require('./config');




passport.use(new FacebookStrategy({
    clientID : config.facebook.appID ,
    clientSecret : config.facebook.appSecret
},function (accessToken,refreshToken,profile,done) {
    var pics = [];
    var url = null;
    FBgraph.setAccessToken(accessToken);
    FBgraph.get(profile.id + '/photos?type=uploaded',function (err,res) {
        if(err)
            throw err;
        else{
            console.log(res);

            var i = 1 ;
            asyncLoop(res.data,function (item,next) {
                FBgraph.get('/' + item.id,function (err,res) {
                    if(err)
                        throw err;
                    else{
                        //console.log("photo : " + JSON.stringify(res));

                        url = "https://graph.facebook.com/"+ res.id+"/picture?type=normal&access_token=" + accessToken ;


                        pics.push({id : profile.id + "_" + i ,url : url});
                        i++ ;
                        next();

                    }

                });
            },function (res) {
                console.log(pics.length);
                console.log('***********');
                console.log(pics);
                console.log('************');
                console.log(accessToken);
                console.log(profile.photos[0].value);
                console.log('profile id : ' + profile.id);
                console.log(profile);

                done(null,{profile:profile , pics : pics});
            });

        }
    });



}));

passport.serializeUser(function(user, done){
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});


module.exports = passport;