let elements = require('../client/elements');
const jsdom = require("jsdom");
var chai = require('chai');
let assert = chai.assert;
const { JSDOM } = jsdom;
let doc = require('./testdocs/htmlDoc');
const dom = new JSDOM(doc, {
    url: "https://test.org/",
    referrer: "https://test.com/",
    contentType: "text/html",
    userAgent: "micah/9000",
    includeNodeLocations: true
});
global.window = dom.window;
global.document = window.document;
global.$ = require('jquery');
global._ = require('underscore');

describe('Table', function () {

    let content;
    let div = elements.createElement('div');
    it('create table',function(){
        let table = elements.createElement('table');
        table.append(elements.createElement('thead')).append(elements.createElement('tbody'));
        div.append(table);


        assert.equal(div.html(),"<table><thead></thead><tbody></tbody></table>")
        table.attr('id','toDoList');
        let t = new elements.Table(table);
        t.addHeaders(['name','description']);
        assert.equal(table.html(),'<thead><tr><th>name</th><th>description</th></tr></thead><tbody></tbody>');
        let json =  [
            {
                "name": "Test Name Edit",
                "description": "Test Description"
            },
            {
                "name": "Test Edit",
                "description": "Test Description"
            }
        ]
        t.bindJSON(JSON.stringify(json));
        let str = '<thead><tr><th>name</th><th>description</th></tr></thead><tbody><tr id="0"><td>Test Name Edit</td><td>Test Description</td></tr><tr id="1"><td>Test Edit</td><td>Test Description</td></tr></tbody>';
        assert.equal(str,table.html(),'JSON BIND');
        t.deleteALLRows();
        assert.equal('<thead><tr><th>name</th><th>description</th></tr></thead><tbody></tbody>',table.html(),'delete all rows');
        let row = {"name": "Test Edit 1", "description": "Test Description"};
        t.addRow(row,0);
        console.log(table.html());
        t.deleteRow(0);
        console.log(table.html());




    });


});