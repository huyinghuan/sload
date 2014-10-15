_path = require 'path'

$cwd = process.cwd()

isAbsolute = (path)->
  _path.resolve(path) is _path.normalize(path).replace(/(.+)([\/|\\])$/, '$1')

load = (filePath, cwd = $cwd)->
  modulePath = _path.join cwd, filePath
  modulePath = _path.join $cwd, modulePath if not isAbsolute modulePath
  require modulePath

load.init = (cwd = $cwd)->
  global.sload = (filePath)->
    load filePath, cwd

module.exports = load