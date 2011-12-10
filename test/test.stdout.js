var stdio = require('../test-stdio')
 ,  stdout = stdio.stdout() // replaces process.stdout
 ,  assert = require('assert')
 ,  actual
 ,  expected = 'hello prompt'

stdout.expect(expected, function(){
    process.stdout.write(expected)   
})

stdout.log('pass: expected')

assert.throws(function() {
    stdout.expect(expected, function(){
        process.stdout.write('not expected')   
    })    
}, /"not expected" == "hello prompt"/)

stdout.log('pass: error on not expected')

process.exit()


