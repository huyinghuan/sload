_path = require 'path'
_fs = require 'fs'

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

load.loader = (cwd = $cwd)->
  (filePaht)-> load filePaht, cwd

load.scan = (filePath, cwd = $cwd, options = {})->

  if typeof cwd isnt 'string'
    options = cwd
    cwd = $cwd

  moduleDir = _path.join cwd, filePath
  moduleDir = _path.join $cwd, moduleDir if not isAbsolute moduleDir

  queue = []

  return queue if not _fs.statSync(moduleDir).isDirectory()

  ignore = if options.ignore then [].concat options.ignore else []
  match = if options.match then [].concat options.match else []

  files = _fs.readdirSync moduleDir

  for filename in files
    filePath = _path.join moduleDir, filename
    continue if _fs.statSync(filePath).isDirectory()
    isIgnore = false
    for exp in ignore
      if exp.test filename
        isIgnore = true
        break
    continue if isIgnore

    if match.length is 0
      queue.push require filePath
      continue

    queue.push require filePath for exp in match when exp.test filename

  return queue




module.exports = load