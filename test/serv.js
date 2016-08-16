'use strict';

const net = require('net');
const fs = require('fs');

const logfile = fs.createWriteStream('logThisShit.txt');
const port = 4400;

var server = net.createServer();

let sockets = [];

server.listen(port);


// 1
server.on('listening', function(){
  console.log('server is listening on port ', port);
});


// 2
server.on('connection', function(socket){

  console.log('server has a new connection, total');
  sockets.push(socket);

  socket.setEncoding('utf8');

  socket.write('Hello, you can start typing');

  socket.on('data', function(data){

    console.log('got: ', data);

    socket.pipe(logfile);

    if (data.trim().toLowerCase() === 'quit'){
      socket.write('Quit conversation. Bye-bye!');
      socket.end();
      return;
    }

    sockets.forEach(function(socketInstance){
      if (socketInstance !== socket){
        console.log('send to all:', data);
        socketInstance.write(data);
      }
    });

  });


  socket.on('close', function(){
    console.log('client ended conversation');
    var index = sockets.indexOf(socket);
    sockets.splice(index, 1);
  });

});


// 3
server.on('close', function(){
  console.log('server is closed');
});


// 0
server.on('error', function(err){
  console.log('err occured:', err.message);
});















