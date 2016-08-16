var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer();
var port = 4400;

server.listen(port);


// server.on('connect', function(){
//   console.log('connected on port ', port);
// });
//
//
// server.on('request', function(req, res){
//
//   console.log('request happened');
//   // res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.write('<b>hello</b>, world :');
//
//   res.end();
//   console.log(req.url);
//   console.log(req.method);
//   // console.log(req.headers);
//
//
//
// });



require('http').createServer(function(req, res){

  res.writeHead(200, {'Content-Type': 'text/plain'});

  var left = 10;

  var interval = setInterval(function() {

    for(var i = 0; i< 100; i++) {
      res.write(Date.now() + " ");
    }

    if (-- left === 0) {
      clearInterval(interval);
      res.end();
    }

  }, 1000);

}).listen(4000);