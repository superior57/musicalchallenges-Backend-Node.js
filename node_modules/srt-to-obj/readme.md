# srt-to-obj [![Build Status](https://travis-ci.org/radiovisual/srt-to-obj.svg?branch=master)](https://travis-ci.org/radiovisual/srt-to-obj)

> Convert an .srt subtitle file to an array of object literals.


## Install

```
$ npm install --save srt-to-obj
```


## Usage

Given an .srt file that looks like this:
```
1
00:00:55,880 --> 00:00:57,670
Line one

2
00:01:12,270 --> 00:01:13,390
Line two
Line three
Line four
Line five

3
00:01:25,360 --> 00:01:26,700
Line six
```

The following JavaScript:
```js
const srtToObj = require('srt-to-obj');

srtToObj('path/to/srt/file').then(srtData => {
  console.log(srtData);
});
```

Would result in the following output:
```js
[
  {
    index: '1',
    timestamp: '00:00:55,880 --> 00:00:57,670',
    start: '00:00:55,880',
    end: '00:00:57,670',
    text: 'Line one'
   }, {
    index: '2',
    timestamp: '00:01:12,270 --> 00:01:13,390',
    start: '00:01:12,270',
    end: '00:01:13,390',
    text: 'Line two\nLine three\nLine four\nLine five'
  }, {
    index: '3',
    timestamp: '00:01:25,360 --> 00:01:26,700',
    start: '00:01:25,360',
    end: '00:01:26,700',
    text: 'Line six'
  }
]
```


## API

### srtToObj(path)

#### path

Type: `string`

The path to the subtitle file you want to convert to an array of objects

## License

MIT © [Michael Wuergler](http://numetriclabs.com)
