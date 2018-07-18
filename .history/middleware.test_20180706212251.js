const unitUnderTest = require('./middleware')
var response = httpMocks.createResponse();

routeHandler(request, response);

var data = JSON.parse( response._getData() );
test.equal("Bob Dog", data.name);
test.equal(42, data.age);
test.equal("bob@dog.com", data.email);
 

test('adds 1 + 2 to equal 3', () => {
  const request  = httpMocks.createRequest({
    method: 'GET',
    url: '/user/42',
    params: {
      id: 42
    },
    headers:{
      authentication
    }
});

expect(1).toBe(1);
  });