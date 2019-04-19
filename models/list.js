let connection = require('./connection')
const sequelize = connection.sequelize
const Sequelize = connection.Sequelize;
const User = require('./user');
const List = sequelize.define('list',{
    // attributes
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },description:{
        type: Sequelize.STRING,
        allowNull:true
    }
}, {
    sequelize,
    // options
});

User.hasMany(List); // Will add userId to List model
List.belongsTo(User); // Will also add userId to List model


// Note: using `force: true` will drop the table if it already exists
List.sync({ force: false }).then(() => {

});


module.exports = List;