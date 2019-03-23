let elements = require('./elements');
let network = require('./network');
let http = new network.HTTP();


// initializes the editable table api
function initEditableTable(){
    let id = '#toDoList';
    let keys = ['name','description'];

    $(id).SetEditable({
        $addButton: $('#but_add'),
        onEdit: function(obj) {
            //console.log(obj.attr('data'));
            let record = {};
            obj.find('td').each(function(index, val){
                 console.log($(val).text());
                 record[keys[index]] = $(val).text();
            })

            let id = obj.attr('data');
            if(id==0){
                http.POST('/task/add/',record,function(data){
                    console.log('add');
                    console.log(data.id);

                    obj.attr("data",data.id);
                })
            }else {
                http.POST('/task/edit/' + id.toString(), record, function (data) {

                })
            }
        },
        onDelete: function(obj) { },
        onBeforeDelete: function(obj) {
            let id = obj.attr('data');
            console.log(id);
            http.DEL('/task/delete/'+id.toString() ,function(){

            })
        },
        onAdd: function() {

            $('#toDoList tbody tr:last' ).attr('data');

        }

    });

}
module.exports = function(){
    let tableToDo = new elements.Table($('#toDoList'));
    tableToDo.addHeaders(['name','description']);

    // retrieves the data from the server and builds the rows of the table.
    http.GET('/tasks',function(data){
        console.log(data);
        tableToDo.bindJSON(data)
        initEditableTable();
    });
}

