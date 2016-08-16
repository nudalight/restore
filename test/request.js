var request = require('request');
var inspect = require('util').inspect;

request('http://google.com/', function(error, response, body){

  if (error) throw error;

  var inspected = inspect({
    err: error,
    res: {
      statusCode: response.statusCode
    },
    body: JSON.parse(body)
  });

  console.log(inspected);

});