
let Task = require('../models/task');


function Task_Controller(){

    this.showAll = function(req,res){
        // List all records in ToDoList
        let data = req.body;
        console.log('Show All Task');
        Task.findAll({
            where:{listId:data.listId},
            attributes: ['id', 'name','description','complete'],
            order: [
                ['complete', 'ASC'],
                ['updatedAt', 'ASC'],
            ]
        }).then(toDoList => {
            res.end(JSON.stringify(toDoList));
        });

    };

    this.create = function (req, res) {
        let record  = req.body;
        // Create a new record
        Task.create(record).then(record => {
            res.end(JSON.stringify({"id": record.id}));

        });

    };
    this.update = function (req, res) {
        let id = req.params.id
        let data = req.body;
        console.log(data);
        Task.update(data, {
            where: {
                id: id
            }
        }).then(() => {

        }).catch(function(err) {
            // print the error details
            console.log(err, request.body.email);
        });;
        res.end();
    }
    this.complete = function (req, res) {
        let id = req.params.id
        console.log(id);
        Task.update({complete:1}, {
            where: {
                id: id
            }
        }).then(() => {

        }).catch(function(err) {
            // print the error details
            console.log(err, id);
        });
        res.end();
    }
    this.delete = function(req,res){
        let id = req.params.id;
        Task.destroy({
            where: {
                id:id
            }
        }).then(() => {
            res.end(JSON.stringify({"record_id": id}));
        });;

    }

}


module.exports = new Task_Controller();