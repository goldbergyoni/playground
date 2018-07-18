var jsc = require("jsverify");

const additionIsCommutative = jsc.checkForall(jsc.string, jsc.integer, 
    (parameterA, parameterB)=> {
        a + b === b + a})

console.log(additionIsCommutative);