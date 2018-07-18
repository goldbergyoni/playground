var jsc = require("jsverify");

const additionIsCommutative = jsc.checkForall(jsc.string, jsc.integer, 
    (parameterA, parameter) => a + b === b + a)

console.log(additionIsCommutative);