global._ = require('underscore');

$(document).ready(function(){


   var page =  document.location.href;

   if(page.indexOf('dashboard')>0){
      var test = require('./client/dashboard');

   }else{
      var animations = require('./client/animation');
      animations.sakura();
   }


});