global._ = require('underscore')
var chai = require('chai');
let assert = chai.assert;



describe('Model ToDoList',function() {
    let toDoList = require('../models/todolist');
    // Checks to make sure that the JSON file is being read correctly.
    let record_id;
    it('Add task to to do list', function(done){
        toDoList.create({ name: "Jane", description: "Doe" }).then(task => {
            record_id = task.id;
            assert.equal(record_id>0 ,true);
            done();
        });

    });
    it('Get to do list', function(done){
        toDoList.findAll().then(list => {;
            assert.equal(list.length,1);
            done();

        });
    });

    it('Edit Record', function(done){
        toDoList.update({ name: "Edit" }, {
            where: {
                id: record_id
            }
            }).then(() => {
            console.log("Done");
            done();

        });
    });
    it('Delete Record', function(done){
        toDoList.destroy({
            where: {
                id:record_id
            }
        }).then(() => {

            console.log("Done");
            done();
        });

    });

})


