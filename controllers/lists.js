
let List = require('../models/list');


function List_Controller(){

    this.showAll = function(req,res){
        // List all records in ToDoList

        List.findAll({
            where:{userId:req.user.id},
            attributes: ['id', 'name','description']
        }).then(toDoList => {
            res.end(JSON.stringify(toDoList));
        });

    };

    this.create = function (req, res) {
        let record  = req.body;
        record.userId = req.user.id;
        if(record.userId){
            List.create(record).then(record => {
                res.end(JSON.stringify({"id": record.id,"userId":req.user.id}));

            });

        }

    };
    this.update = function (req, res) {
        let id = req.params.id
        let data = req.body;
        List.update(data, {
            where: {
                id: id,
                userId:req.user.id
            }
        }).then(() => {

        });
        res.end();
    }
    this.delete = function(req,res){
        let id = req.params.id;
        List.destroy({
            where: {
                id:id,
                userId:req.user.id
            }
        }).then(() => {
            res.end(JSON.stringify({"record_id": id}));
        });;

    }

}


module.exports = new List_Controller();