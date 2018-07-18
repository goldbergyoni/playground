var jsc = require("jsverify");
test('No auth, status 403', () => {
    
})

const additionIsCommutative = jsc.checkForall(jsc.string, jsc.integer, 
    (parameterA, parameterB)=> {
        console.log(parameterA, parameterB);
        return true;
    });

console.log(additionIsCommutative);