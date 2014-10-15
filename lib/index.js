(function() {
  var $cwd, isAbsolute, load, _path;

  _path = require('path');

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

  module.exports = load;

}).call(this);
