var jsc = require("jsverify");

const additionIsCommutative = jsc.checkForall(jsc.string, jsc.integer, 
    (parameter, b) => a + b === b + a)

console.log(additionIsCommutative);