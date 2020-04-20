var crypto = require('crypto');
var stream = require('stream');

module.exports = function(str, callback) {
  var hash;
  hash = crypto.createHash('sha1');
  if (str.pipe) {
    if (!callback || typeof callback !== 'function') {
      throw new Error('a callback is required to hash a stream');
    }
    str.on('end', function() {
      callback(undefined, hash.digest('hex'));
    });
    str.on('readable', function() {
      var chunk;
      while (null !== (chunk = str.read())) {
        hash.update(chunk);
      };
    });
    return;
  }

  hash.update(str);

  var hexHash = hash.digest('hex');

  if (typeof callback === 'function') {
    callback(undefined, hexHash);
  }
  return hexHash;
};
