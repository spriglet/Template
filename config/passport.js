var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
let User = require('../models/user');
let crypto = require('../models/cryptoFunctions');



passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log('test');
        User.findOne({'where':{ 'email': username },'attributes':['id','email','password','salt']}).then(user => {

            if(user){
                if(crypto.sha512(password,user.salt).passwordHash===user.password){
                    console.log('success');

                    return done(null, user);

                }else{
                    console.log('incorrect password')
                    return done(null, false, { message: 'Incorrect password.' });
                }


            }else{
                console.log('incorrect username');
                return done(null, false, { message: 'Incorrect username.' });

            }
        });


    }
));
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
module.exports = passport;