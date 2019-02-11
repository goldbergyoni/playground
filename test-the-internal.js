const chai = require("chai");

const expect = chai.expect;

class ProductService{
  //this method is only used internally
  //Change this name will make the tests fail
  internalCalculateVATAdd(priceWithoutVAT){
    return {finalPrice: priceWithoutVAT * 1.2};
    //Change the result format or key name above will make the tests fail
  }

  //public method
  getPrice(productId){
    const desiredProduct= DB.getProduct(productId);
    finalPrice = this.internalCalculateVATAdd(desiredProduct.price).finalPrice;
  }
}


it("White-box test: When the internal methods get 0 vat, it return 0 response", async () => {
    //There's no requirement to allow users to calculate the VAT, only show the final price. Nevertheless we falsely insist here to test the class internals
    expect(new ProductService().internalCalculateVATAdd(0).finalPrice).to.equal(0);
});