beforeAll(()=>{
    DBFixture.addSeedData();
})

it("When getting orders report, get the existing orders", () => {
    const queryObject = QueryHelpers.getQueryObject(config.DBInstanceURL);
    const reportConfiguration = ReportHelpers.getReportConfig();//What report config did we get? have to leave the test and read
    userHelpers.prepareQueryPermissions(reportConfiguration);//what this one is doing? have to leave the test and read
    const result = queryObject.query(reportConfiguration);
    assertThatReportIsValid();//I wonder what this one does, have to leave the test and read
    expect(result).to.be.an('array').that.does.include({id:1, productd:2, orderStatus:"approved"});
    //how do we know this order exist? have to leave the test and check
})


it("When getting orders report, get the existing orders", () => {
    //This one hopefully is telling a direct and explicit story
    const orderWeJustAdded = ordersTestHelpers.addRandomNewOrder();
    const queryObject = newQueryObject(config.DBInstanceURL, queryOptions.deep, useCache:false);
    const result = queryObject.query(config.adminUserToken, reports.orders, pageSize:200);
    expect(result).to.be.an('array').that.does.include(orderWeJustAdded);
})