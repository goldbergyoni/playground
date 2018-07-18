var jsc = require("jsverify");

const additionIsCommutative = jsc.checkForall(jsc.string, jsc.integer, 
    (parameterA, parameterB)=> {
        console.log(parameterA, parameterB)
    });

console.log(additionIsCommutative);