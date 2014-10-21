(function() {
  var $cwd, isAbsolute, load, _fs, _path;

  _path = require('path');

  _fs = require('fs');

  $cwd = process.cwd();

  isAbsolute = function(path) {
    return _path.resolve(path) === _path.normalize(path).replace(/(.+)([\/|\\])$/, '$1');
  };

  load = function(filePath, cwd) {
    var modulePath;
    if (cwd == null) {
      cwd = $cwd;
    }
    modulePath = _path.join(cwd, filePath);
    if (!isAbsolute(modulePath)) {
      modulePath = _path.join($cwd, modulePath);
    }
    return require(modulePath);
  };

  load.init = function(cwd) {
    if (cwd == null) {
      cwd = $cwd;
    }
    return global.sload = function(filePath) {
      return load(filePath, cwd);
    };
  };

  load.scan = function(filePath, cwd, options) {
    var exp, filename, files, ignore, isIgnore, moduleDir, queue, _i, _j, _len, _len1;
    if (cwd == null) {
      cwd = $cwd;
    }
    if (options == null) {
      options = {};
    }
    if (typeof cwd !== 'string') {
      options = cwd;
      cwd = $cwd;
    }
    moduleDir = _path.join(cwd, filePath);
    if (!isAbsolute(moduleDir)) {
      moduleDir = _path.join($cwd, moduleDir);
    }
    queue = [];
    if (!_fs.statSync(moduleDir).isDirectory()) {
      return queue;
    }
    ignore = options.ignore ? [].concat(options.ignore) : [];
    files = _fs.readdirSync(moduleDir);
    for (_i = 0, _len = files.length; _i < _len; _i++) {
      filename = files[_i];
      filePath = _path.join(moduleDir, filename);
      if (_fs.statSync(filePath).isDirectory()) {
        continue;
      }
      isIgnore = false;
      for (_j = 0, _len1 = ignore.length; _j < _len1; _j++) {
        exp = ignore[_j];
        if (exp.test(filename)) {
          isIgnore = true;
          break;
        }
      }
      if (isIgnore) {
        continue;
      }
      queue.push(require(filePath));
    }
    return queue;
  };

  module.exports = load;

}).call(this);
