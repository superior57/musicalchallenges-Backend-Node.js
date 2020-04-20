'use strict';

const fs = require('fs');
const parseSrt = require('./parse-srt');

module.exports = path => {
	if (!path || typeof path !== 'string') {
		throw new TypeError('please supply an absolute path to an .srt file.');
	}

	return new Promise((resolve, reject) => {
		fs.readFile(path, 'utf-8', (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(parseSrt(data));
			}
		});
	});
};
