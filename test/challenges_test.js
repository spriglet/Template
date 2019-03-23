var chai = require('chai');
let assert = chai.assert;
let challenges = require('../utils/challenges');


describe('palindrome',function(){


    it("remove all characters but alphanumeric",function(){
        let str = "A Toyota's a toyota";
        assert.equal(challenges.isPalindrome(str),true);

    })
    it("Merge and sort two arrays",function(){
        let arrA = [1,3,9];
        let arrB = [2,9,4];
        let expectedArr = [1,2,3,4,9,9];
        let arr = challenges.mergeSortArray(arrA,arrB);
        for(let i = 0; i<expectedArr.length;i++)
         assert.equal(arr[i],expectedArr[i]);


    });


});