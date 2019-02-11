const chai = require("chai");
const sinon = require("sinon");

const expect = chai.expect;

class MessageQueue {
  publish(message) {
    console.log(message);
  }
}

  const logger = (message) => {

  }

  class ProductService {
    deletePrice(productId) {
      //some logic & DB work here
      logger(`About to delete product id ${productId}`);
      new MessageQueue().publish({
        productId,
        queueName: "product-deletion"
      });
    }
  }


  it("When a valid product is about to be deleted, ensure an email is sent", async () => {
    //add product here to avoid global and shared state
    const spy = sinon.spy(Emailer.prototype, "sendEmail");
    new ProductService().deletePrice(theProductWeJustAdded);
    //Good: validate things that appear in the requirements document
    expect(spy.calledOnceWith(theProductWeJustAdded.ownerEmail)).to.be.true;
  });

  it("When a valid product is about to be deleted, ensure was called once with the right product", async () => {
    //add product here to avoid global and shared state
    new ProductService().deletePrice(theProductWeJustAdded);

    const dataAccessMock = sinon.mock(DAL);
    dataAccessMock.expects("deleteProduct").once().withArgs(theProductWeJustAdded, true, false);

    //Bad: deal with testing the internals, verify many things at once, 
    mock.verify();
  });

   