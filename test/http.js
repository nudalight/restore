var http = require('http');
var fs = require('fs');

var file = fs.createWriteStream('text.txt');

var options = {
  host: "www.google.com",
  port: 80,
  path: "/upload",
  method: 'post'
};

var request = http.request(options, function(res){

  console.log('-- http-verion: ', res.httpVersion);
  console.log('-- status-code: ', res.statusCode);
  console.log('-- headers: ', res.headers);
  console.log('-- headers concrete: ', res.headers['content-type']);

  res.setEncoding('utf8');

  res.on('data', function(data){
    console.log('data fetched: ', data);
  });

  res.pipe(file);

});

request.on('response', fireOnResponse);


request.write('this is a data', 'utf8');
request.write('data chunk number 2', 'ascii');
request.end();






function fireOnResponse(res){
  console.log('fired on response: statsCode:', res.statusCode);
}