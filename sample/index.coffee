
_sload = require '../lib/index'

console.log _sload.scan 'b', {ignore: [(exp)-> exp.indexOf('z') isnt -1], match: [/\.js$/]}