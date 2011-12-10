# test-stdio

test-stdio is a micro-library for testing node modules that do cli and other uses of process stdin, stdout, and stderr.

## Usage

test-stdio is designed for testing node modules via require.

### stdin

`process.stdin` is mocked by calling `stdin()` which has a `write(data)` method for simulating input:

    var stdin = require('../test-stdio').stdin()
    
    var myProgram = require('myProgram')
    myProgram.runSomeFunction() 
    //myProgram now expecting user input on stdin
    
    stdin.write('hello world')
    
### stdout and stderr

`process.stdout` and `process.stderr` are mocked by calling `stdout()` and `stderr()` respectively.
Both have an `expect(expected, fn)` method that 
can be used to test std output. It takes an expected value and a function that will 
run the code that will produce the output:

    var stdout = require('../test-stdio').stdout()
    var myProgram = require('myProgram')
    
    stdout.expect('hello world', function(){
        myProgram.sayHello() //writes 'hello world' to stdout   
    })
    
`expected` can also be a function:

    stdout.expect(
        function(actual) {
            return actual === 'hello world'
        }, 
        function(){
            myProgram.sayHello()   
        }
    )
    
There is also a `log` method that can be used since `console.log` is redirected to the mock:

    stdout.log('This will not be routed back to mocked stdout')
    
### Combining stdin and stdout

These can be combine to test workflows:

    stdout.expect(prompt, function() {
        var actual
        program.prompt(prompt, Number, function(val) { 
            actual = val
        })
        
        stdout.expect(prompt + '(must be a number) ', function() {
            stdin.write('blue')    
        })
        stdout.expect(prompt + '(must be a number) ', function() {
            stdin.write('blue')
        })
        stdin.write(42)  
        assert.strictEqual(actual, 42)
    })
    
or multi-line input:

    stdout.expect(prompt + '\n', function() {
        var actual
        program.prompt(prompt, function(val) {
            actual = val
        }
        
        stdin.write('hello world\n');
        stdin.write('  and what a world\n');
        stdin.write('it could be\n');
        stdin.write('\n');
        
        assert.strictEqual(actual, 'hello world\n  and what a world\nit could be')
    })

    
### .real and revert()

Each mock also exposes a `.real` property that can be used to access the original stdio:

    var realStdout = stdout.real

Call `revert` to restore process to use original stdio:

    stdin.revert()
    
There's not currently any way to resume use of the same mock object, call .stdin() again to create a new mock. 


    
