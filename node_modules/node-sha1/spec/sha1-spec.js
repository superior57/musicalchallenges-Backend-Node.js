var sha1 = require('../lib/sha1.js');
var stream = require('stream');
var util = require('util');

var expectedHash = '2aae6c35c94fcfb415dbe95f408b9ce91ee846ed';
var testText = 'hello world';

describe('node-sha1', function() {
  describe('strings', function() {
    it('should work on strings', function() {
      expect(sha1(testText)).toEqual(expectedHash);
    });

    it('should work on strings with callback', function(done) {
      sha1(testText, function(err, hash) {
        expect(err).toBeUndefined();
        expect(hash).toEqual(expectedHash);
        done();
      });
    });
  });

  describe('streams', function() {
    util.inherits(FakeStream, stream.Readable);

    function FakeStream() {
      this._finished = false;
      stream.Readable.call(this);
    }

    FakeStream.prototype._read = function() {
      if (this._finished) {
        this.push(null);
        return;
      }
      this._finished = true;
      this.push(testText);
    };

    var fakeStream;

    beforeEach(function() {
      fakeStream = new FakeStream();
    });

    it('should error when no callback', function(done) {
      expect(sha1.bind(undefined, fakeStream)).toThrowError('a callback is required to hash a stream');
      done();
    });

    it('should work on streams', function(done) {
      sha1(fakeStream, function(err, hash) {
        expect(hash).toEqual(expectedHash);
        done();
      });
    });
  });

  describe('buffers', function() {
    it('should work on buffers', function() {
      var buffer = new Buffer(testText);
      expect(sha1(buffer)).toEqual(expectedHash);
    });

    it('should work on buffers with callback', function(done) {
      var buffer = new Buffer(testText);
      sha1(buffer, function(err, hash) {
        expect(hash).toEqual(expectedHash);
        expect(err).toBeUndefined();
        done();
      });
    });
  });
});
