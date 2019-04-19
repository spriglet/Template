let connection = require('./connection')
const sequelize = connection.sequelize
const Sequelize = connection.Sequelize;
const List = require('./list');
const Task = sequelize.define('task',{
    // attributes
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },complete:{
        type:Sequelize.BOOLEAN,defaultValue:false
    },

}, {
    sequelize,
    // options
});

List.hasMany(Task, { onDelete: 'cascade' }); // Will add userId to Task model
Task.belongsTo(List); // Will also add userId to Task model
// Note: using `force: true` will drop the table if it already exists
Task.sync({ force: false }).then(() => {

});

module.exports = Task;