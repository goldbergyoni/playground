/* eslint-disable */
const chai = require("chai");

const expect = chai.expect;
const chaiSubset = require("chai-subset");

chai.use(chaiSubset);


before(() => {
  //adding sites and admins data to our DB. Where is the data? at some external json or migration framework
  await DB.AddSeedDataFromJson('seed.json');  
});

it("When updating site name, get successful confirmation", async () => {
    //I know that site name "portal" exists - I saw it in the seed files
    const siteToUpdate = await SiteService.getSiteByName("Portal");
    const updateNameResult = await SiteService.changeName(siteToUpdate , "newName");
    expect(updateNameResult).to.be(true);
});

it("When querying by site name, get the right site", async () => {
  //I know that site name "portal" exists - I saw it in the seed files
  const siteToCheck = await SiteService.getSiteByName("Portal");
  expect(siteToCheck.name).to.be.equal("Portal");//Failure! The previous test change the name :[
});

it("When updating site name, get successful confirmation", async () => {
  //test is adding a fresh new records and acting on the records only
  const siteUnderTest = await SiteService.addSite({name:"siteForUpdateTest"});
  const updateNameResult = await SiteService.changeName(siteUnderTest , "newName");
  expect(updateNameResult).to.be(true);
});

it("When querying by site name, get the right site", async () => {
  const siteServiceUnderTest = new SiteService();
  const siteUnderTest = siteServiceUnderTest.addSite({name:"siteForQueryTest"});
  const siteResultFromQuery = siteServiceUnderTest.getSiteByName("siteForQueryTest");
  expect(siteResultFromQuery.name).to.equal("siteForQueryTest");
});




//option1 - DI, things are going outside our test
it("Scenario - when there's no user, Expectation - Return the right error" , async () =>{
  const userService = new userService();
  userService.DBProvider = myStubbedNotRealDBProvider;//hmmm what this class is actually doing? what will it return for user 2? hmm not sure
  expect(userService.getUser(2)).to.throw(AppError).with.property('code' , "NotFound");
})

//option2 - Explicit stubbing as part of the test
it("Scenario - when there's no user, Expectation - Return the right error" , async () =>{
  const userService = new userService();
  sinon.stub(dataAccess, 'getUser').withArgs("userId", 2).throws(new AppError("NotFound"));
  expect(userService.getUser(2)).to.throw(AppError).with.property('code' , "NotFound");
})



it("When settings exist, expect manager to be able to read them", async () => {
    //Explicitly set pre-conditions 
    request.withAuth(config.superAdminToken).post("/api/website/settings", {site:1 , color:"blue"});

    //Now time for expectation
    const result = await request.withAuth(config.managerToken).get("/api/website/settings");
    expect(result).to.equal({ site: 1, color: "blue" });
  });

describe("Product service", () => {
  describe("Adding new", () => {
    it("When no name supplied, it throws back the right error", () => {
      // expect(addNewProduct.bind(1)).to.throw(AppError).with.property('code' , "InvalidInput");
      expect(addNewProduct.bind(1))
        .to.throw(AppError)
        .to.containSubset({ code: "InvalidInput", httpError: "400" });
    });
  });
});

const addNewProduct = (id, name) => {
  if (!name) {
    throw new AppError("InvalidInput");
  }

  return {
    id,
    name,
    status: "approved"
  };
};

class AppError extends Error {
  constructor(code) {
    super();
    this.code = code;
    this.httpError = "400";
  }
}
