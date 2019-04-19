let elements = require('./elements');

let intervals = [];
// Returns width and height of the html document
let height = $(document).height();
let width = $(document).width();

function create_flower_petal(){

    // Chooses a random area on the x axis to place the flower petal;
    var random = Math.floor((Math.random() * Math.floor((width * 0.90))) + 1);

    // Creates the image element and chooses the image with a random number
    var petal = elements.createElement(('img'));
    var random_image = Math.floor((Math.random() * 4) + 1);

    // Initialize the attributes and CSS properties
    petal.attr('src','assets/images/petal_'+random_image+'.png');
    petal.css('top',0+'px');
    petal.css('left',random+'px');
    petal.css('position','absolute');

    return petal;

}
function destroy_object(){}


module.exports.sakura = function() {



    let time_to_create_new_petal = 0;
    let flower_petal_arr = []; // Stores the flower petal in the array

    // Starts loop


    setInterval(function () {

        time_to_create_new_petal += 25;
        if(time_to_create_new_petal===500){
            let petal = create_flower_petal();
            flower_petal_arr.push(petal);
            if (flower_petal_arr.length > 100) {
                flower_petal_arr.shift().remove();
            }
            // appends the petal to the document body
            $('body').append(petal);
            time_to_create_new_petal = 0;
        }




        ;

        flower_petal_arr.forEach(function (petal) {
            var str_length = petal.css('top').length;
            var integer = parseInt(petal.css('top').substr(0, str_length));
            if (integer < (height) * 0.87) {
                var top = ((integer + 2) + "px").toString();
                petal.css('top', top);
            }

        });

    }, 25);
}