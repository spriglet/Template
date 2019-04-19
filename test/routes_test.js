/*
   This file test the routes of the application by making http request using http chai.
   To test this part of the code make sure the node server is running with node server.js.
*/

let chai = require('chai')
    , chaiHttp = require('chai-http');;
const expect = require('chai').expect;
chai.use(chaiHttp);
let server_url = 'http://localhost:5000';  // The url port number the server is running on.


// this function is used to check the status code
function validateStatusCode(statusCode){

    return function(err, res) {

        expect(err).to.be.null;
        expect(res).to.have.status(statusCode);
    }
}

// this function is used to make http request
function expectStatusCode(url,type,callback,data=null){
    if(data==null){
        chai.request(server_url)[type](url)
            .end(callback);

    }else{
        chai.request(server_url)[type](url)
            .send(data)
            .end(callback);

    }

}

describe('User',function() {

    it('Create user', async () => {
        expectStatusCode('/user/create', 'post', validateStatusCode(200),
            {'firstName': 'micah', 'lastName': 'Bell', 'password': 'test', 'email': 'test@test.com'});
    }, 'Create user failed ');


    it('login user', async () => {
        expectStatusCode('/login', 'post', validateStatusCode(200), {"username": "test@test.com", "password": "test"});
    }, 'Login User');

    it('edit user', async () => {
        expectStatusCode('/user/update/1', 'post', validateStatusCode(200), {"lastName": "Smith", "password": "test"});
    }, 'Edit');

    it('logout user', async () => {
        expectStatusCode('/logout', 'get', validateStatusCode(200));
    }, 'Edit');

});


describe('List routes', function() {

    it('add list',async()=>{
        expectStatusCode('/list/create','post',validateStatusCode(200),{"name":"Test Name","description":"Test Description"});
    },'Add');
    it('Show lists', async ()=>{
        expectStatusCode('/lists/show','get',validateStatusCode(200));
    },'List');
    it('should Edit task',async()=>{
        expectStatusCode('/list/edit/1','post',validateStatusCode(200));
    },'Edit')
    it('should delete ',async()=>{
        expectStatusCode('/list/delete/1','delete',validateStatusCode(200),{"name":"Test Name Edit","description":"Test Description"});
    },'Delete');

});


describe('Task routes', function() {

    it('add task',async()=>{
        expectStatusCode('/task/create','post',validateStatusCode(200),{"name":"Test Name","description":"Test Description"});
    },'Add');
    it('Show task', async ()=>{
        expectStatusCode('/task/show','get',validateStatusCode(200));
    },'List');
    it('should mark complete ',async()=>{
        expectStatusCode('/task/edit/1','post',validateStatusCode(200),{"name":"Test Name Edit","description":"Test Description"});
    },'Edit');
    it('should delete task',async()=>{
        expectStatusCode('/task/delete/1','delete',validateStatusCode(200));
    },'Delete')


});
