const Sequelize = require('sequelize');
let sequelize;






if (process.env.CLEARDB_DATABASE_URL) {
    // the application is executed on Heroku ... use the mysql database
    sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL, {
        dialect:  'mysql',
        protocol: 'mysql',
        logging:  false //false
    });
} else {
    // the application is executed on the local machine
    // Option 1: Passing parameters separately
    let config = require('../localconfig');
    sequelize = new Sequelize(config.database, config.username, config.password, {
        host: 'localhost',
        dialect:'mysql',
        logging:false
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


