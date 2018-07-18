var jsc = require("jsverify");

const additionIsCommutative = jsc.checkForall(jsc.string, jsc.integer, 
    (a, b) => a + b === b + a)

console.log(additionIsCommutative);