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
        console.log(res.body)
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

describe('Makes sure routes are returning correct status codes', function() {

    it('should list Task on /tasks GET', async ()=>{
        expectStatusCode('/tasks','get',validateStatusCode(200));
    },'List');
    it('should add task /task/add',async()=>{
        expectStatusCode('/task/add','post',validateStatusCode(200),{"name":"Test Name","description":"Test Description"});
    },'Add');
    it('should delete task /task/delete/1',async()=>{
        expectStatusCode('/task/delete/1','delete',validateStatusCode(200));
    },'Delete');
    it('should delete task /task/edit/1',async()=>{
        expectStatusCode('/task/edit/1','post',validateStatusCode(200),{"name":"Test Name Edit","description":"Test Description"});
    },'Edit');




});