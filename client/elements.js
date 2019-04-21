function createElement(type){
    /*
            creates a dom element and converts it to a jquery object
     */
    var element = document.createElement(type);        // Create a <button> element
    return new $(element);
}


function Table(table){

    this.jQ = table;
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
    this.getRowData = function(obj,keys,ignore){
        let record = {};
        let keyIndex = ignore[0];
        obj.find('td').each(function(index, val){
            console.log(ignore);
            console.log('index:'+index)
            if(ignore.indexOf(index.toString())===-1){
                console.log(val)
                console.log($(val).text());
                record[keys[keyIndex]] = $(val).text();
                keyIndex++;
            }

        })
        return record;

    }
    this.makeEditable = function(obj,keys,ignore){

        let record = {};
        let keyIndex = ignore[0];
        obj.find('td').each(function(index, val){
            console.log(ignore);
            console.log('index:'+index)
            if(ignore.indexOf(index.toString())===-1){
                console.log(val)
                console.log($(val).text());
                let text = $(val).text();
                $(val).html('<input type="text" value="'+text+'">')
                keyIndex++;
            }

        })
        return record;


    }
    this.makeUnEditable = function(obj,keys,ignore){
        let record = [];
        let keyIndex = ignore[0];
        obj.find('td').each(function(index, val){
            if(ignore.indexOf(index.toString())===-1){
                var val = $(this).children('input').val();
                record.push(val);
                $(this).text(val);
            }

        })
        return record;

    }


    this.addRow = function(json,pos,append){
        let keys = _.keys(json);
        pos = pos !== undefined ? pos : null;
        append = append !== undefined ? append : false;
        let tr = createElement('tr');
        keys.forEach(function(key){
            let td = createElement('td');
                if(key==="id"){
                    tr.attr("id",json[key])
                }else if(key==='class'){
                    tr.attr('class',json[key]);
                }
                else{
                    if(key.indexOf("html")>=0){
                        td.html(json[key])
                    }else{
                        td.text(json[key])
                    }
                    tr.append(td);

                }

        });
        console.log(pos)
        if(pos===false || pos===0) {
            console.log('test')
            if(append){
                table.children('tbody').append(tr);
            }else{
                table.children('tbody').prepend(tr);
            }


        }
        else{

            table.children('tbody').children('tr:nth('+(pos-1)+')').after(tr);

        }

        return tr;
    }
    this.deleteRow = function(id){
        table.children('tbody').children('#'+id).remove()
    }
    this.deleteALLRows  = function(){
        table.children('tbody').empty();
    }
    this.bindJSON = function(arr,string){
        // Converts a json object array rows of the table
        if(string){
            arr = JSON.parse(arr);
        }

        table.children('tbody').empty();
        let _this = this;
        arr.forEach(function(json,index){

            _this.addRow(json,index);
        });

    }

}



module.exports.createElement  = createElement;
module.exports.Table =  Table;