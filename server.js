var express = require('express');
var app = express();
let routes = require('./routes');
var bodyParser = require('body-parser');
global._ = require('underscore');
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// static files
app.use(express.static(__dirname + '/public'));
app.use('/popper',express.static(__dirname+ '/node_modules/popper.js/dist/umd/popper.js'));
app.use("/bootstrap/css", express.static(__dirname+ '/node_modules/bootstrap/dist/css'));
app.use("/bootstrap/js", express.static(__dirname+ '/node_modules/bootstrap/dist/js'));
app.use("/jquery", express.static(__dirname+ '/node_modules/jquery/dist/jquery.js'));



// loads the routes from the routes.js file
routes.forEach(function(route){
     app[route.type](route.url,route.controller);

})

// use res.render to load up an ejs view file



// set the view engine to ejs
app.set('view engine', 'ejs');

// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});



var server = app.listen(5000, function () {
    console.log('Node server is running..');
})
