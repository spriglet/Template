global._ = require('underscore');

$(document).ready(function(){

 require('./client/toDoList')();
 let challenges = require('./client/challenges');

 $('#palindromeClick').click(function(){
  console.log('tests')
  let str =   $('#isPalindrome').val();
  if(str==''){
   $('#hIsPalindrome').text('Please enter a string');
  }else if(challenges.isPalindrome(str)){

   $('#hIsPalindrome').text('It is a palindrome!');
  }
  else{
   $('#hIsPalindrome').text("It isn't a palindrome");
  }
 })
});