let mToDoLists = require('../models/todolist');

function ToDoListController(){


    this.listAll = function(req,res){
        // List all records in ToDoList
        mToDoLists.findAll({
            attributes: ['id', 'name','description']
        }).then(toDoList => {
            res.end(JSON.stringify(toDoList));
        });

    };

    this.create = function (req, res) {
        let record  = req.body;
        // Create a new record
        mToDoLists.create(record).then(record => {
            res.end(JSON.stringify({"id": record.id}));

        });

    };
    this.update = function (req, res) {
        let id = req.params.id;
        let task  = req.body;
        // updates a record
        mToDoLists.update(task, {
            where: {
                id: id
            }
        }).then(() => {

        });
        res.end();

    };
    this.delete = function(req,res){
        let id = req.params.id;
        mToDoLists.destroy({
            where: {
                id:id
            }
        }).then(() => {
            res.end(JSON.stringify({"record_id": id}));
        });;

    };

}

module.exports = new ToDoListController();