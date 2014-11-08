(function() {
  var $cwd, isAbsolute, isMatch, load, _, _fs, _path;

  _path = require('path');

  _fs = require('fs');

  _ = require('lodash');

  $cwd = process.cwd();

  isAbsolute = function(path) {
    return _path.resolve(path) === _path.normalize(path).replace(/(.+)([\/|\\])$/, '$1');
  };

  isMatch = function(reg, exp) {
    if (_.isRegExp(reg)) {
      return reg.test(exp);
    }
    if (_.isFunction(reg)) {
      return reg(exp);
    }
    return false;
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

  load.loader = function(cwd) {
    if (cwd == null) {
      cwd = $cwd;
    }
    return function(filePaht) {
      return load(filePaht, cwd);
    };
  };

  load.scan = function(filePath, cwd, options) {
    var filename, files, ignore, isIgnore, match, moduleDir, queue, reg, _i, _j, _k, _len, _len1, _len2;
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
    if (isAbsolute(filePath)) {
      moduleDir = filePath;
    } else {
      moduleDir = _path.join(cwd, filePath);
      if (!isAbsolute(moduleDir)) {
        moduleDir = _path.join($cwd, moduleDir);
      }
    }
    queue = [];
    if (!_fs.statSync(moduleDir).isDirectory()) {
      return queue;
    }
    ignore = options.ignore ? [].concat(options.ignore) : [];
    match = options.match ? [].concat(options.match) : [];
    files = _fs.readdirSync(moduleDir);
    for (_i = 0, _len = files.length; _i < _len; _i++) {
      filename = files[_i];
      filePath = _path.join(moduleDir, filename);
      if (_fs.statSync(filePath).isDirectory()) {
        continue;
      }
      isIgnore = false;
      for (_j = 0, _len1 = ignore.length; _j < _len1; _j++) {
        reg = ignore[_j];
        if (isIgnore = isMatch(reg, filename)) {
          break;
        }
      }
      if (isIgnore) {
        continue;
      }
      if (match.length === 0) {
        queue.push(require(filePath));
        continue;
      }
      for (_k = 0, _len2 = match.length; _k < _len2; _k++) {
        reg = match[_k];
        if (isMatch(reg, filename)) {
          queue.push(require(filePath));
        }
      }
    }
    return queue;
  };

  module.exports = load;

}).call(this);
