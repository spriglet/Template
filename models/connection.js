const Sequelize = require('sequelize');


let sequelize;
let host = 'localhost';   //
let database = 'todolist'; //
let username = 'root'; //
let password = 'Staticpen774@';  //





if (process.env.CLEARDB_DATABASE_URL) {
    // the application is executed on Heroku ... use the postgres database
    sequelize = new Sequelize(process.env.CLEARDB_DATABASE_UR, {
        dialect:  'mysql',
        protocol: 'mysql',
        logging:  true //false
    });
} else {
    // the application is executed on the local machine
    // Option 1: Passing parameters separately
    sequelize = new Sequelize(database, username, password, {
        host: 'localhost',
        dialect:'mysql'
    });
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


