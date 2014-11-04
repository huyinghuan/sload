
_sload = require '../lib/index'

console.log _sload.scan 'b', {ignore: [/z+/], match: [/\.js$/]}