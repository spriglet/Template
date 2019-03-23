

let toDoListController = require('./controllers/c_ToDoList');

var routes = [
    {"type":"get","url":"/tasks","controller":toDoListController.listAll},
    {"type":"delete","url":"/task/delete/:id","controller":toDoListController.delete},
    {"type":"post","url":"/task/add","controller":toDoListController.create},
    {"type":"post","url":"/task/edit/:id","controller":toDoListController.update}
    ]


module.exports = routes;