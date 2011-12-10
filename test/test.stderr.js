var stdio = require('../test-stdio')
 ,  stderr = stdio.stderr() // replaces process.stderr
 ,  assert = require('assert')
 ,  actual
 ,  expected = 'hello prompt'

stderr.expect(expected, function(){
    process.stderr.write(expected)   
})

stderr.log('pass: expected test')

assert.throws(function() {
    stderr.expect(expected, function(){
        process.stderr.write('not expected')   
    })    
}, /"not expected" == "hello prompt"/)

stderr.log('pass: erro on not expected')

process.exit()


