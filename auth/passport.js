//npm modules


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy


module.exports = function(bodyParser){

    // configure passport.js to use the local strategy
    passport.use(new LocalStrategy(
        { usernameField: 'email' },
        (email, password, done) => {
            console.log('Inside local strategy callback')
            console.log('test');
            User.findOne({'where':{ 'email': email },'attributes':['id','email','password','salt']}).then(user => {

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

    // tell passport how to serialize the user
    passport.serializeUser((user, done) => {
        console.log('Inside serializeUser callback. User id is save to the session file store here')
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        console.log('Inside deserializeUser callback')
        console.log(`The user id passport saved in the session file store is: ${id}`)
        const user = users[0].id === id ? users[0] : false;
        done(null, user);
    });

    return passport;


}

