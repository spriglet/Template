function CRUD_Test(model,assert){
    this.create = function(record,done){
        model.create(record).then(task => {
            record_id = task.id;
            assert.equal(record_id > 0, true, 'add record');
            done();
        });
    }
    this.readAll = function(done){


        model.findAll().then(list => {;
            assert.equal(list.length,1,'Get all records');
            done();

        }).then(()=>{

        });



    }
    this.update = function(data,query,done){
        model.update(data, {
            where:query
        }).then(() => {
            done();

        });

    }
    this.delete = function(query,done){
        model.destroy({
            where:query
        }).then(() => {

            done();
        });

    }

}

module.exports = CRUD_Test;