require('mocha-testcheck').install();
const { expect } = require('chai');
const faker = require('faker');

 
describe('Product service', () => {
  describe('Adding new' , ()=>{
    check.it('Add new product with random yet valid properties, always successful', gen.int, gen.oneOf(faker.definitions.commerce.product_name.product), (id, name) => {
      expect(addNewProduct(id, name).status).to.equal('approved');
    });
  })
});









const addNewProduct = (id, name)=>{
    console.log(id, name);
    return {id, name, status:"approved"}
}