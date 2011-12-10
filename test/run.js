var spawn = require('child_process').spawn
 , fs = require('fs')

function runTest(file) {
    var test = spawn('node', ['./test/' + file + '.js'], { env: undefined });
    
    test.stdout.on('data', function (data) {
      console.log(data.toString());
    });
    
    test.stderr.on('data', function (data) {
      console.log(data.toString());
    });
    
    test.on('exit', function (code) {
        if(code===0) {
            console.log('%s: pass', file);
        }
    });
}

runTest('test.stdin')
runTest('test.stdout')
runTest('test.stderr')