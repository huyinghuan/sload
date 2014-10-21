_sload = require('../lib/index')
_sload.init('sample');

var a = sload('b/c/c');
a();

var b = require('../lib/index')('b/c/c', 'sample');
b();

var queue = _sload.scan("b", "sample");
console.log(queue.length)