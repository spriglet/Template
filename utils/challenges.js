


exports.isPalindrome = function(str){

    str = str.replace(/\W/g, '').toLowerCase();
    return str.split("").reverse().join('') === str;
}


exports.mergeSortArray =  function(arr1,arr2){

    return arr1.concat(arr2).sort();

}