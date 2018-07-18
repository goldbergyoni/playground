var jsc = require("jsverify");

const additionIsCommutative = jsc.checkForall(jsc.integer, jsc.integer, 
    (a, b) => a + b === b + a)

    cons