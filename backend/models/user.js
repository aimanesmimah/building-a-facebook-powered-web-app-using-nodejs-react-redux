/**
 * Created by cloudStrife on 08/04/2017.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
mongoose.connect("mongodb://localhost/facebookapp",{
    useMongoClient: true
});
//var db = mongoose.connection;

var userSchema = mongoose.Schema({

    email : {
        type: String,
        unique: true
    },
    password : {
        type : String

    }

});



var User = module.exports = mongoose.model('User',userSchema);

module.exports.createUser = function (newUser,callback) {
    bcrypt.genSalt(10,function (err,salt) {
        bcrypt.hash(newUser.password,salt,function (err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.updateUser = function (id,email,password,callback) {
    User.findById(id,function (err,user) {
       if(err)
           throw err;
       if(user){
           user.id = id ;
           user.email = email ;
           bcrypt.genSalt(10,function (err,salt) {
               bcrypt.hash(password,salt,function (err, hash) {
                   user.password = hash;
                   user.save(callback);
               });
           });

       }
       else{
           throw new Error('user not found');
       }
    });
}

module.exports.getUserByEmail = function (email,callback) {
    var query = {email : email};
    User.findOne(query,callback);
}

module.exports.getUserById = function (id,callback) {
    //var query = {username : username};
    User.findById(id,callback);
}

module.exports.comparePassword = function (candidatePassword,hash,callback) {
    bcrypt.compare(candidatePassword,hash,function (err, isMatch) {
        if(err) throw err;
        callback(null,isMatch);
    });
}
