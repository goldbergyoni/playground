const unitUnderTest = require('./middleware')
var response = httpMocks.createResponse();

test('No auth, status 403', () => {
  const request = httpMocks.createRequest({
    method: 'GET',
    url: '/user/42',
    params: {
      id: 42
    },
    headers: {
      authentication: 'bearer sdfsd4234'
    }
  });
  var response = httpMocks.createResponse();
  unitUnderTest(request, response);
  expect(response.statusCode).toBe();
});