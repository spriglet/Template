
let connection = require('./connection')
const sequelize = connection.sequelize
const Sequelize = connection.Sequelize;
const ToDoList = sequelize.define('to_do_list', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING
        // allowNull defaults to true
    }
});



// Note: using `force: true` will drop the table if it already exists
ToDoList.sync({ force: false }).then(() => {

});


module.exports = ToDoList;
