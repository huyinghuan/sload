require('../lib/index').init('sample');

var a = sload('b/c/c');
a();

var b = require('../lib/index')('b/c/c', 'sample');
b();