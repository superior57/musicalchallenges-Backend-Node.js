# node-sha1 [![Build Status](https://travis-ci.org/leahciMic/node-sha1.svg?branch=master)](https://travis-ci.org/leahciMic/node-sha1)

Provides you with a convenient sha1 function that uses Node's crypto module
under the hood.

## Install
`npm install node-sha1 --save`

## Usage
```javascript
var sha1 = require('node-sha1');
sha1('Hello World!'); # 2ef7bde608ce5404e97d5f042f95f89f1c232871
```

## API

`sha1(what, callback)`

### what

Can be a string, buffer, or even a stream (stream requires a callback).

If what is a string, or a buffer the hash will be returned, if a callback
is registered it will also be called with the resulting hash.

If what is a stream, it will throw if a callback is not registered. Otherwise
it will call the callback with the resulting hash.

### callback(err, hash)

`err` any errors that occurred, or undefined if no errors occurred. `hash` is
the resulting hash. If a callback is registered it will be called with the
resulting hash regardless if a stream, string, or buffer is used.

## Examples

### Use with strings

```js
var sha1 = require('node-sha1');
sha1('Hello World!'); # 2ef7bde608ce5404e97d5f042f95f89f1c232871
```

### Use with buffers

```js
var sha1 = require('node-sha1');
var buffer = new Buffer('Hello World!');
sha1(buffer); # 2ef7bde608ce5404e97d5f042f95f89f1c232871
```

### Use with streams

```js
var sha1 = require('node-sha1');

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
  this.push('Hello World!');
};

var fakeStream = new FakeStream();
sha1(fakeStream, function(err, hash) {
  # hash = 2ef7bde608ce5404e97d5f042f95f89f1c232871
})
```
