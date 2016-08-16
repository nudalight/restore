var net = require('net');

var port = 4400;
var host = 'localhost';
var conn;

var retryInterval = 3000; // 3 secs
var retriedTimes  = 0;
var maxRetries = 10;

var quitting = false;

process.stdin.resume();

(function connect(){

  function reconnect(){
    if (retriedTimes >= maxRetries){
      throw new Error('Max retries has been exceeded, I give up.');
    }
    retriedTimes++;
    setTimeout(connect, retryInterval);
  }

  conn = net.createConnection(port, host, fireOnConnect);
  conn.setEncoding('utf-8');

  function fireOnConnect(){
    console.log('connection is established');
  }

  conn.once('connect', function(){
    retriedTimes = 0;
    console.log('connected to server');
    conn.write('here is a string for you');
  });

  conn.on('data', function(data){

    console.log('some data has arrived:', data);
  });

  conn.on('error', function(error){
    console.log('error occured: ', error.message);
  });

  conn.on('close', function(){
    console.log('connection go closed, will try to reconnect');
    if (!quitting){
      reconnect();
    }
  });

  process.stdin.on('data', function(data){
    if (data.toString().trim().toLowerCase() === 'quit'){
      conn.end();
      quitting = true;
      process.stdin.pause();
      process.stdin.end();
    }
  });



  conn.pipe(process.stdout, { end: false });
  process.stdin.pipe(conn);

})();