
let User = require('../models/user');
let crypto = require('../models/cryptoFunctions');

function User_Controller(){

    this.create = function (req,res){
        let record  = req.body;
        // Create a new record
        User.findOne({'where':{ 'email': record.email },'attributes':['id','email','password','salt']}).then(user => {

            if(user) {
                console.log('user exists')
                res.end('{"message":"There is already a user with this email"')
            }
            else{
                User.create(record).then(record => {
                    res.end(JSON.stringify({"id": record.id}));

                });
            }


        });


    },this.update = function (req, res) {
        let id = req.params.id
        let data = req.body;

        // updates a record

        if(data.password){
            let passwordData =  crypto.sha512(data.password,crypto.genRandomString(16));
            data.password = passwordData.passwordHash;
            data.salt = passwordData.salt;
        }

        User.update(data, {
            where: {
                id: id
            }
        }).then(() => {

        });
        res.end();

    }

}


module.exports = new User_Controller();