var stdio = require('../test-stdio')
 ,  stdin = stdio.stdin() //replaces process.stdin
 ,  assert = require('assert')
 ,  actual
 ,  reverted
 ,  expected = 'hello response'

process.on('exit', function(){
  assert.strictEqual(actual, expected)
  assert(!reverted)
  console.log('pass')
})

process.stdin.once('data', function(d){
    actual = d.toString()
})
stdin.write(expected)

stdin.revert()

process.stdin.once('data', function(d){
    reverted = d.toString()
})
stdin.write('should not be set')

process.exit()


