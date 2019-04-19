let User = require('./controllers/user');
let List = require('./controllers/lists');
let Task = require('./controllers/task');
let authRequired = function(callback){

        return function(req,res) {

          if (req.isAuthenticated()) {
                callback(req, res);

            } else {

                res.redirect('/login')
            }
        }


}

let isSignedIn = function(req,res){

    if(req.isAuthenticated()){
        res.send({'loggedIn':true});
    }else{
        res.send({'loggedIn':false});
    }

}
var render =function(page){
    return function(req,res){

        res.render(page);

    }
}

var routes = [
    // Dashboard route
    {"type":"get","url":"/dashboard","controller":render('pages/dashboard'),"auth":true },

    // User Routes
    {"type":"post","url":"/user/create","controller":User.create,"auth":false },
    {"type":"post","url":"/user/update/:id","controller":User.update,"auth":true },
    // List Routes
    {"type":"get","url":"/lists/show","controller":render('pages/lists'),"auth":true },
    {"type":"post","url":"/lists/show","controller":List.showAll,"auth":true },
    {"type":"post","url":"/list/create","controller":List.create,"auth":true },
    {"type":"delete","url":"/list/delete/:id","controller":List.delete,"auth":true },
    {"type":"post","url":"/list/edit/:id","controller":List.update,"auth":true },
    // Task routes
    {"type":"post","url":"/task/create","controller":Task.create,"auth":true },
    {"type":"post","url":"/tasks/show","controller":Task.showAll,"auth":true },
    {"type":"delete","url":"/task/delete/:id","controller":Task.delete,"auth":true },
    {"type":"post","url":"/task/edit/:id","controller":Task.update,"auth":true },
    {"type":"post","url":"/task/complete/:id","controller":Task.complete,"auth":true },
    {"type":"get","url":"/about","controller":render('pages/about'),"auth":false },

    ]

module.exports.authReq = authRequired;
module.exports.routes = routes;