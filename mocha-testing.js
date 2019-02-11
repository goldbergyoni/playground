// /* eslint-disable */
const chai = require("chai");
const expect = chai.expect;
const chaiSubset = require("chai-subset");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

chai.use(chaiSubset);


// before(async () => {
//   //adding sites and admins data to our DB. Where is the data? at some external json or migration framework
//   await DB.AddSeedDataFromJson('seed.json');  
// });

// it("When updating site name, get successful confirmation", async () => {
//     //I know that site name "portal" exists - I saw it in the seed files
//     const siteToUpdate = await new SiteService.getSiteByName("Portal");
//     const updateNameResult = await new SiteService.changeName(siteToUpdate , "newName");
//     expect(updateNameResult).to.be(true);
// });

// it("When querying by site name, get the right site", async () => {
//   //I know that site name "portal" exists - I saw it in the seed files
//   const siteToCheck = await new SiteService.getSiteByName("Portal");
//   expect(updateNameResult).to.be.equal("Portal");//Failure! The previous test change the name :[
// });




// //option1 - DI, things are going outside our test
// it("Scenario - when there's no user, Expectation - Return the right error" , async () =>{
//   const userService = new userService();
//   userService.DBProvider = myStubbedNotRealDBProvider;//hmmm what this class is actually doing? what will it return for user 2? hmm not sure
//   expect(userService.getUser(2)).to.throw(AppError).with.property('code' , "NotFound");
// })

// //option2 - Explicit stubbing as part of the test
// it("Scenario - when there's no user, Expectation - Return the right error" , async () =>{
//   const userService = new userService();
//   sinon.stub(dataAccess, 'getUser').withArgs("userId", 2).throws(new AppError("NotFound"));
//   expect(userService.getUser(2)).to.throw(AppError).with.property('code' , "NotFound");
// })



// it("When settings exist, expect manager to be able to read them", async () => {
//     //Explicitly set pre-conditions 
//     request.withAuth(config.superAdminToken).post("/api/website/settings", {site:1 , color:"blue"});

//     //Now time for expectation
//     const result = await request.withAuth(config.managerToken).get("/api/website/settings");
//     expect(result).to.equal({ site: 1, color: "blue" });
//   });

// describe("Product service", () => {
//   describe("Adding new", () => {
//     it("When no name supplied, it throws back the right error", () => {
//       // expect(addNewProduct.bind(1)).to.throw(AppError).with.property('code' , "InvalidInput");
//       expect(addNewProduct.bind(1))
//         .to.throw(AppError)
//         .to.containSubset({ code: "InvalidInput", httpError: "400" });
//     });

//   });

// describe("Product service", () => {
//   describe("Adding new", () => {
//     it("When no name supplied, it throws back the right error", () => {
//       // expect(addNewProduct.bind(1)).to.throw(AppError).with.property('code' , "InvalidInput");
//       expect(addNewProduct.bind(1))
//         .to.throw(AppError)
//         .to.containSubset({ code: "InvalidInput", httpError: "400" });
//     });
//   });
// });



it.only("When no product name supplied, it throws back bad request error 400", async() => {
  expect(addNewProduct.bind({name:'nest'})).to.eventually.throw(AppError).with.property('code', "InvalidInput");
});

it("When no product name is supplied, it throws back bad request error 400", async() => {
  let errorWeExceptFor = null;
  try {
    const result = await addNewProduct({name:'nest'});
  } catch (error) {
    
    //good, we expected for this error so test is great
    expect(error.code).to.equal('InvalidInput');
    errorWeExceptFor = error;
  }

  

  expect(errorWeExceptFor).not.to.be.null;
});


async function addNewProduct (newProduct) {
  return new Promise((resolve, reject) =>{
    setImmediate(() => {
      if (newProduct.age) {
        return reject(new AppError("InvalidInput"));
      } 
      return resolve({
        id:newProduct.id,
        name:newProduct.name,
        status: "approved"
      }) 
    })  
  })
  

};

class AppError extends Error {
  constructor(code) {
    super();
    this.code = code;
    this.httpError = "400";
  }
}