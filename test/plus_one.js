const path = require('path');
const fs = require('fs');
const spawn = require('child_process').spawn;


process.stdin.resume();

process.stdin.on('data', function(data){

  var n;

  try {

    n = parseInt(data.toString());
    n++;

    process.stdout.write(n + '\n');

  } catch(err) {
    process.stderr.write(err.message + '\n');
  }


});
