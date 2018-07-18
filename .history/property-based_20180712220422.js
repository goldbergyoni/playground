var jsc = require("jsverify");

const additionIsCommutative = jsc.checkForall(jsc.string, jsc.integer, 
    (param, b) => a + b === b + a)

console.log(additionIsCommutative);