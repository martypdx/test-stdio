var events  = require('events')
 ,  assert  = require('assert')
 ,  util    = require('util')

module.exports = {
    stdin: function() {
        return new InMock()
    }
 ,  stdout: function() {
        return new OutMock('stdout')
    }
 ,  stderr: function() {
        return new OutMock('stderr')
    }
}

function MockStream(type) {
    var self = this
    events.EventEmitter.call(this)
        
    this.real = process[type] 
    process.__defineGetter__(type, function() { return self })
    
    this.revert = function() {
       process.__defineGetter__(type, function() { return self.real })
     
    }
    this.write = function(data) {
        this.emit('data', data)
    }
}
util.inherits(MockStream, events.EventEmitter)


function InMock() {
    MockStream.call(this, 'stdin')
    this.setEncoding = this.resume = function() {}
}
util.inherits(InMock, MockStream)

function OutMock(type) {
    MockStream.call(this, type)
    this.log = function() {
        this.real.write(util.format.apply(this, arguments) + '\n')
    }
    this.expect = function(expected, fn) {
      var actual;
      this.once('data', function(data){ actual = data; });
      fn();
      assert.equal(actual, expected);
    }
}
util.inherits(OutMock, MockStream)
