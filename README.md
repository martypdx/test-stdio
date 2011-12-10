# test-stdio

test-stdio is a micro-library for testing cli and other uses of process stdin, stdout, and stderr.

## Usage

Module
    var stdin = require('../test-stdio').stdin()
    stdin.write('hello world')