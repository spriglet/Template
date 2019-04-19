
let connection = require('./connection')
let crypto = require('./cryptoFunctions');
const sequelize = connection.sequelize
const Sequelize = connection.Sequelize;
const User = sequelize.define('user',{
    // attributes
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },email:{
        type:Sequelize.STRING,unique:true
    },
    password:{
        type: Sequelize.STRING
    },
    salt:{
        type:Sequelize.STRING
    }
}, {
    sequelize,
    // options
});

// Note: using `force: true` will drop the table if it already exists
User.sync({ force: false }).then(() => {

    User.findAll().then(users => {
        if(users.length===0){
            User.create({
                firstName: 'Valued',
                lastName: 'Person',
                email:'valued@person.com',
                password:'Grid14234#'}
            );
        }
    });

});


// Method 3 via the direct method
User.beforeCreate((user, options) => {
    let passwordData =  crypto.sha512(user.password,crypto.genRandomString(16));
        user.password = passwordData.passwordHash;
        user.salt = passwordData.salt;

});


module.exports = User;