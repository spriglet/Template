// using jQuery
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

exports.HTTP = function HTTP(){

    this.DEL = function(url, callback){

        $.ajax({
            url: url,
            type: 'DELETE',
            success: function(result) {
                // Do something with the result
                callback(result);
            }
        });
    }


    this.GET = function(url,callback,dataType){

        $.ajax({
            url: url,
            type:"GET",
            cache: true,
            dataType: dataType,
            success: function(data) {
                callback(data);
            },
            error: function (request, status, error) {
                //console.log(status + ", " + error +","+ url);
            }
        });

    }
    this.POST = function(url,data,callback){
        $.ajax({
            url:url,
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success:function(data){
                callback(data);
            },
            error:callback
        })

    }


}