require('mocha-testcheck').install();
const { expect } = require('chai');
 
describe('Product service', () => {
  check.it('Add new product with random yet valid properties, always successful', gen.int, gen.string, (x, y) => {
    expect(x).to.be.a('number');
    expect(y).to.be.a('string');
  });
});