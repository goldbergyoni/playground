it('When updating site name, get successful confirmation', async () => {
  // test is adding a fresh new records and acting on the records only
  const siteUnderTest = await SiteService.addSite({
    name: 'siteForUpdateTest',
  });
  const updateNameResult = await SiteService.changeName(siteUnderTest, 'newName');
  expect(updateNameResult).to.be(true);
});

/* eslint-disable */
test('When the error rate is increasing for 1 min, ensure incident is created', () => {
  chaosMonkey.triggerHTTPErrors({length: '2min'});
  apiHelper.callContinously('POST', '/users', {name: 'Joe'}, {length: '2min'});
  expect(chaosMonkey.userExperience.latency).not.to.exceed.by.more.than(5).milliseconds;
  expect(chaosMonkey.incident.pagerDuty).to.have.new.incident.with.label('error-rate');
});
