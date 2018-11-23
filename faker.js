const chai = require("chai");
const expect = chai.expect;
const faker = require('faker');


const addProduct = (name, price) =>{
    const productNameRegexNoSpace = /^\S*$/; // a string consisting only of non-whitespaces

    if(!productNameRegexNoSpace.test(name))
        return false;
    
        //some logic here
    return true;
};

it("Wrong: When adding new product with valid properties, get successful confirmation", async () => {
    const addProductResult = addProduct("Foo", 5);
    expect(addProductResult).to.be.true;
    //Positive-false: the operation succeeded because we never tried with long product name including spaces
});
it("Better: When adding new product with valid properties, get successful confirmation", async () => {
    const addProductResult = addProduct(faker.commerce.productName(), faker.random.number());
    //Generated random input: {'Sleek Cotton Computer',  85481}
    expect(addProductResult).to.be.true;
    //Negative-true: the operation failed because the given string included space. We discovered a bug early
});