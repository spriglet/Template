global._ = require('underscore')
var chai = require('chai');
let assert = chai.assert;
let CRUD_Test = require('./crud_test');

describe('Model user',function() {
    let User =  require('../models/user');
    // Checks to make sure that the JSON file is being read correctly.
    let crud = new CRUD_Test(User,assert);
    it('Add user', function(done){
        crud.create({ firstName: "Jane", lastName: "Doe",email:'test@test.com',password:'test' },done);
    });
    it('Get users', function(done){
        crud.readAll(done)
    });
    it('Edit Record', function(done){
        crud.update({firstName:'Same'},{ firstName: "Jane" },done);
    });
    it('Delete Record', function(done){
        crud.delete({firstName:'Same'},done);

    });


});


describe('Model List',function() {
    let List =  require('../models/list');
    // Checks to make sure that the JSON file is being read correctly.
    let record_id;
    let crud = new CRUD_Test(List,assert);
    it('Add List', function(done){
        crud.create({ name:'Test Title' },done);
    });
    it('Get List', function(done){
        crud.readAll(done)
    });
    it('Edit List', function(done){
        crud.update({name:'Test Title'},{ name: "Change Test Title" },done);
    });
    it('Delete List', function(done){
        crud.delete({name:'Test Title'},done);

    });


})



describe('Model Task',function() {
    let User =  require('../models/task');
    // Checks to make sure that the JSON file is being read correctly.
    let record_id;
    let crud = new CRUD_Test(User,assert);
    it('Add Task', function(done){
        crud.create({name:"Task 1",complete:false},done);
    });
    it('Get Task', function(done){
        crud.readAll(done)
    });
    it('Edit Task', function(done){
        crud.update({name:'Task 1 Edited'},{ name: "Task 1" },done);
    });
    it('Delete Task', function(done){
        crud.delete({name:'Task 1 Edited'},done);

    });


})
