let elements = require('./elements');
let network = require('./network');
let http = new network.HTTP();


let load = true;

let buttonComplete = ' <button class="button btn-light complete_task">\n' +
    '            <span class="octicon octicon-clippy"></span>\n' +
    '            <img src="icons/check.svg"></button>\n';


let buttonDelete = ' <button class="button btn-light delete_task">\n' +
    '            <span class="octicon octicon-clippy"></span>\n' +
    '            <img src="icons/trashcan.svg"></button>\n';

let buttonEdit = ' <button class="button btn-light edit_task" >\n' +
    '            <span class="octicon octicon-clippy"></span>\n' +
    '            <img src="icons/pencil.svg"></button>\n';

function Task(){
    var tasks = new elements.Table($('#tasks'));
    let lastPercent = 0;
    let _this = this;
    let listId = null;
    let interval_id = null;
    let getId = function(obj){

        return obj.parent().parent().attr('id');
    }

    let getRow = function(obj){ return obj.parent().parent();}
    this.setId = function(id){


    }
    this.bindJSON = function(json){
        // Binds list items to the list table

        json = json.map(function(obj) { // Is used to add button controls and "complete" text to the first column
            let record = {};
            record.id = obj.id;
            if (obj.complete) {
                record.text = 'complete';
                record.class = 'complete';
            }
            else
                record.html1 = buttonComplete;
            record.name = obj.name;
            //record.desc = obj.description;
            record.html2 = buttonGroup;
            return record;
        });
        tasks.bindJSON(json,false);
        progressBar();


    }


    this.getTasks =  function (lId){
        /* Gets all the task associated with a list.  */
        listId = lId;
        http.POST('/tasks/show',{'listId':listId}, function(data) {
            console.log('Task Show')
            console.log(data)
            if(data.length){
                _this.bindJSON(data);
            }else{
                _this.bindJSON([])
            }
        });

    }
    var progressBar = function(){
        // Used to calculate build and calculate the data for the progress bar.
        var obj = $('#myBar');
        var stats = task_stats();
        var percentComplete = Math.round((stats.complete / stats.tasks)* 100);
        percentComplete = percentComplete ? percentComplete : 0;
        var width = lastPercent;
        if(interval_id){
            clearInterval(interval_id);
        }
        interval_id = setInterval(frame, 10);
        width = obj.text().substr(0,obj.text().length-1);
        var increase = (percentComplete - width)>=0;
        let once = true;
        function frame() {
            if(increase){
                if (width >= percentComplete) {
                    clearInterval(interval_id);
                } else {
                    width++;
                }
                console.log(width)


            }else{
                if (width <= percentComplete) {
                    clearInterval(interval_id);
                } else {
                    width--;
                }
            }
            if(width>=100){
                console.log('test')
                $('#you_did_it').css('visibility','visible');


            }else{
                $('#you_did_it').css('visibility','hidden');
            }
            obj.css('width',width + '%');
            obj.text(width * 1  + '%');

        }

    }
    var task_stats = function(){
        return {"tasks":$('#tasks tbody tr').length , "complete":$('#tasks tbody .complete').length} ;
    }
    this.save_edit = function(){

        var task_id = getRow($(this)).attr('id');
        var arr = tasks.makeUnEditable(getRow($(this)),['name','description'],["0","3"]);
        console.log(arr);
        var record = {'name':arr[0],'description':arr[1],'listId':listId};

        let button = $(this);
        if(parseInt(task_id)){

            http.POST('/task/edit/'+task_id,record,function(){
                console.log('edit')
                console.log(record)
                button.children('img').attr('src',"icons/pencil.svg");
                button.attr('class','button btn-light edit_task');
                getRow(button).children('td').children('.complete_task').css('visibility','visible');

                tasks.makeUnEditable(getRow(button),['name'],["0","2"]);

            });


        }else{
            record.listId = listId;
            http.POST('/task/create',record,function(data){
                getRow(button).attr('id',data.id);
                $(button).children('img').attr('src',"icons/pencil.svg");
                getRow($(button)).children('td').children('.complete_task').css('visibility','visible');
                button.attr('class','button btn-light edit_task');
                tasks.makeUnEditable(getRow(button),['name'],["0","2"]);
            });
        }


    }
    this.edit = function(){
        var id = getId($(this));
        $(this).children('img').attr('src',"icons/arrow-down.svg");
        console.log(tasks.makeEditable(getRow($(this)),['name'],["0","2"]));
        $(this).attr('class','button btn-light save_task');
        getRow($(this)).children('td').children('.complete_task').css('visibility','hidden');
    }
    this.del = function(){
        var id = getId($(this));

        http.DEL('/task/delete/'+id,function(){

            $('#tasks tbody #'+id).remove();
            progressBar();
            console.log('delete task')
        })

    }

    this.complete = function(){

        console.log('complete task');
        var row = getRow($(this));
        row.children('td').children('.complete_task').remove();
        row.attr('class','complete');
        row.children('td').first().text('completed');
        var tr = row.clone();
        row.remove();
        $('#tasks tbody').append(tr);
        progressBar();
        let button =  $(this);
        console.log(row.attr('id'))
        http.POST('/task/complete/'+row.attr('id'),{},function(){
            console.log('complete')
            button.children('img').attr('src',"icons/pencil.svg");
            getRow(button).children('td').children('.complete_task').css('visibility','visible');

        });
    }

    this.add = function (){

        let row =  {"id":0,"html1":buttonComplete,"html2":'<input type="text">',"html4":buttonGroup}
        let stats = task_stats();
        let position =  stats.tasks  -  stats.complete;
        row = tasks.addRow(row, position,false);

        row.children('td').children('.edit_task').children('img').attr("src","icons/arrow-down.svg");
        row.children('td').children('.complete_task').css('visibility','hidden');
        row.children('td').children('.edit_task').attr('class','save_task button btn-light ')
        row.children('td:nth(1)').children().focus();
        row.children('td:nth(1)').animate({
            scrollTop: $("#main").offset().top
        }, 2000);

        progressBar();
    }
}
var buttonGroup = buttonEdit+buttonDelete;

function dashboard(){
    var tasks = new Task();
    var clickEvents = [,
        {"top":"#tasks","selector":".edit_task","func":tasks.edit},
        {"top":"#tasks","selector":".delete_task","func":tasks.del},
        {"top":"#tasks","selector":".complete_task","func":tasks.complete},
        {"top":"#tasks","selector":".save_task","func":tasks.save_edit},
        {"top":"#lists","selector":".delete_list","func":deleteList},

    ];

    function hideTaskControl(){
        var num_list = $('#lists').children().length;
        console.log('Hide Tasks')
        console.log(num_list)
        if(num_list===0){
            $('#cTask').css('visibility','hidden');
        }else{
            $('#cTask').css('visibility','visible');
        }
    }
    function getList(){
        /* Gets a list and all associated task with that list
        * */
        let listId = $(this).attr('id');
        tasks.getTasks(listId);
        $('#list_title').text($(this).text());
    }
    //var lists = $('lists');

    $('#add_task').click(tasks.add);

    http.POST('/lists/show',{}, function(data) {
         data.forEach(function(row){
             addList(row.id,row.name);
             selectFirstList();
         });
         hideTaskControl();
    });

    function selectFirstList(){
        let lists = $('#lists a');
        var first = $(lists.get(0));

        tasks.getTasks(first.attr('id'));
        $('#list_title').text(first.text());
    }
    function addList(id,name){
        // Adds a list to the dom and selects it as the main list to work on
        var html = ' <a href="#menu2" id='+id+' class="list-group-item" data-toggle="collapse" data-parent="#sidebar"><span class="hidden-sm-down">'+name+'<i  class="fa fa-trash delete_list" aria-hidden="true"></i></a>';
        var item = $(html);
        $('#lists').append(item);
        tasks.getTasks(id);

        item.click(getList);
    }
    function deleteList(){
        var list_item = $(this).parent().parent();
        // Deletes a list from the dom and calls appropriate route
        http.DEL('/list/delete/'+list_item.attr('id'), function(data) {

            list_item.remove();
            if($('#lists a').length>0){

                selectFirstList();
            }
            hideTaskControl();
        });
    }

    $("#add_list").click(function(){
        // Adds a list to the dom and calls the route /list/create
       let name =  $('#list_name').val();
       console.log(name);
       if(name!==''){
           var record = {"name":name};

           http.POST('/list/create/',record,function(data) {
                addList(data.id,name);
                tasks.setId(data.id);
                $('#list_title').text(name);
                $('#list_name').val('');
                hideTaskControl();
           });

       }

    });
    clickEvents.forEach(function(obj) {

        // Attach a directly bound event handler
        $(obj.top).on("click", obj.selector,obj.func);
    });

}



module.exports = dashboard();