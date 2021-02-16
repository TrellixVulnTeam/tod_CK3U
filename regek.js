var child_process = require('child_process');

process.on('SIGINT', function() {
  console.log('restarting...');
  child_process.fork("bwd.js");
  process.exit(0);
});

console.log('Running as %d', process.pid);

setTimeout(function(){}, 1000*60*10);