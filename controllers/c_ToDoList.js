let mToDoLists = require('../models/todolist');

function ToDoListController(){

    // List all the tasks on the
    this.listAll = function(req,res){
        mToDoLists.findAll({
            attributes: ['id', 'name','description']
        }).then(toDoList => {
            console.log("All users:", JSON.stringify(toDoList, null, 4));
            res.end(JSON.stringify(toDoList));
        });

    };

    this.create = function (req, res) {
        let record  = req.body;
        // Create a new record
        mToDoLists.create(record).then(record => {
            console.log("Jane's auto-generated ID:", record.id);
            res.end(JSON.stringify({"id": record.id}));

        });

    };
    this.update = function (req, res) {
        let id = req.params.id;
        let task  = req.body;
        // Change everyone without a last name to "Doe"
        mToDoLists.update(task, {
            where: {
                id: id
            }
        }).then(() => {
            console.log("Done");
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
            console.log("Done");
            res.end(JSON.stringify({"record_id": id}));
        });;

    };

}

module.exports = new ToDoListController();