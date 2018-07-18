var jsc = require("jsverify");
test('Given all, status 403', () => {

});

const additionIsCommutative = jsc.checkForall(jsc.string, jsc.integer, 
    (parameterA, parameterB)=> {
        console.log(parameterA, parameterB);
        return true;
    });

console.log(additionIsCommutative);