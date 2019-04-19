//npm modules
const express = require('express');
const uuid = require('uuid/v4')
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
let User = require('./models/user');
let crypto = require('./models/cryptoFunctions');


/*
*  -- Begin Authentication
*  */
// configure passport.js to use the local strategy
passport.use(new LocalStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
        console.log('Inside local strategy callback');


        User.findOne({'where':{ 'email': email },'attributes':['id','email','password','salt']}).then(user => {

            if(user){
                console.log(user.password);
                console.log(crypto.sha512(password,user.salt));
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
    done(null, user.id);
});

// deserialize user
passport.deserializeUser(function(id, done) {

    User.findByPk(id).then(function(user) {

        if (user) {

            done(null, user.get());

        } else {

            done(user.errors, null);

        }

    });

});
// create the server
const app = express();

// add & configure middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    genid: (req) => {
        console.log('Inside session middleware genid function')
        console.log(`Request object sessionID from client: ${req.sessionID}`)
        return uuid() // use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: 'keyboard cat'
}))
app.use(passport.initialize());
app.use(passport.session());





app.get('/authrequired', (req, res) => {
    console.log('Inside GET /authrequired callback')
    console.log(`User authenticated? ${req.isAuthenticated()}`)
    if(req.isAuthenticated()) {
        res.send('you hit the authentication endpoint\n')
    } else {
        res.redirect('/login')
    }
})

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(info) {return res.send(info.message)}
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.login(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/dashboard');
        });
    })(req, res, next);
})
// -- End Authentication --

app.use(bodyParser.json());

// static files
app.use(express.static(__dirname + '/public'));
app.use('/popper',express.static(__dirname+ '/node_modules/popper.js/dist/umd/popper.js'));
app.use("/bootstrap/css", express.static(__dirname+ '/node_modules/bootstrap/dist/css'));
app.use("/bootstrap/js", express.static(__dirname+ '/node_modules/bootstrap/dist/js'));
app.use("/jquery", express.static(__dirname+ '/node_modules/jquery/dist/jquery.js'));
app.use("/primer", express.static(__dirname+ '/node_modules/primer-css/build/build.css'));
app.use("/octicons", express.static(__dirname+ '/node_modules/octicons/build/build.css'));
app.use("/icons", express.static(__dirname+ '/node_modules/octicons/build/svg/'));
// node_modules/owl.carousel/dist/assets/owl.carousel.min.css
const Routes = require('./routes');
const routes =Routes.routes;




// loads the routes from the routes.js file
routes.forEach(function(route){


    if(route.auth){
        app[route.type](route.url,Routes.authReq(route.controller));
    }else{

        app[route.type](route.url,route.controller)
    }


});

// use res.render to load up an ejs view file
app.get('/authrequired', (req, res) => {
    if(req.isAuthenticated()) {
        res.send('you hit the authentication endpoint\n')
    } else {
        res.redirect('/')
    }
})


// set the view engine to ejs
app.set('view engine', 'ejs');

// index page
app.get('/', function(req, res,next) {
    res.render('pages/index');
});


// create the login get and post routes
app.get('/login', (req, res) => {
    res.render('pages/login');
})


// tell the server what port to listen on
app.listen(5000, () => {
    console.log('Listening on localhost:5000')
})