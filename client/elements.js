function createElement(type){
    /*
            creates a dom element and converts it to a jquery object
     */
    var element = document.createElement(type);        // Create a <button> element
    return new $(element);
}



function Table(table){


    this.addHeaders = function (headers){
        let tr = createElement('tr');

        headers.forEach(function(val){
            let th = createElement('th');
            th.text(val);
            console.log(val);
            tr.append(th);
        })
        table.children('thead').append(tr);
    }
    this.addRow = function(json){
        let keys = _.keys(json);
        let tr = createElement('tr');
        keys.forEach(function(key){


            if(key=="id")
                tr.attr('data',json[key])
            else{
                let td = createElement('td');
                td.text(json[key]);
                tr.append(td);
            }

        });
        table.children('tbody').append(tr);
    }
    this.deleteRow = function(id){
        table.children('tbody').children('#'+id).remove()
    }
    this.deleteALLRows  = function(){
        table.children('tbody').empty();
    }
    this.bindJSON = function(arr){
        // Converts a json object array rows of the table
        arr = JSON.parse(arr);
        table.children('tbody').empty();
        let _this = this;
        arr.forEach(function(json,index){
            _this.addRow(json,index);
        });
    }

}



module.exports.createElement  = createElement;
module.exports.Table =  Table;