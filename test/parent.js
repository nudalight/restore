var exec = require('child_process').exec;
exec('node child.js', { env: { number: 123 }}, function(err, stdout, stderr){

  if (err) throw err;

  console.log('(((');
  console.log('stdout: ', stdout);
  console.log('stderr: ', stderr);
  console.log(')))');

});