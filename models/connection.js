const Sequelize = require('sequelize');


/*
let host = 'localhost';   //
let database = 'todolist'; //
let username = 'root'; //
let password = 'Staticpen774@';  //


 */
let host = 'us-cdbr-iron-east-03.cleardb.net';
let database = 'heroku_7ee3abcadd72651';
let username = 'b965c9f20b5784';
let password = '0f2c0e9a';



if (process.env.CLEARDB_DATABASE_UR) {
    // the application is executed on Heroku ... use the postgres database
    sequelize = new Sequelize(process.env.CLEARDB_DATABASE_UR, {
        dialect:  'mysql',
        protocol: 'mysql',
        logging:  true //false
    });
} else {
    // the application is executed on the local machine
    sequelize = new Sequelize("postgres:///my_db");
}


sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;


