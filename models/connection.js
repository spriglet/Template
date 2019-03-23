const Sequelize = require('sequelize');


/*
let host = 'localhost';   //
let database = 'todolist'; //
let username = 'root'; //
let password = 'Staticpen774@';  //


 */
let host = ' us-cdbr-iron-east-03.cleardb.net';
let database = 'heroku_7ee3abcadd72651';
let username = 'b965c9f20b5784';
let password = '90ac0673';

// Option 1: Passing parameters separately
const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect:'mysql'
});
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


