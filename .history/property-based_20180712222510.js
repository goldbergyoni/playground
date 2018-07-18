require('mocha-testcheck').install();
const { expect } = require('chai');
 
describe('MySpec', () => {
  check.it('accepts an int and a string', gen.int, gen.string, (x, y) => {
    expect(x).to.be.a('number');
    expect(y).to.be.a('string');
  });
});