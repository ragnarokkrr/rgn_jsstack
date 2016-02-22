/**
 * http://usejsdoc.org/
 */
var fs = require('fs');
var path = require('path');

var dir = path.join(__dirname, 'temp');
var source = __filename;
var target = path.join(dir, 'target');

fs.mkdir(dir, handlingError(mkdirped));

function mkdirped() {
	fs.readFile(source, handlingError(haveFile));
}

function haveFile(content) {
	fs.writeFile(target, content, handlingError(wroteFile));
}

function wroteFile() {
	console.log('all done');
}

function handlingError(cb) {
	return function(err, result) {
		if (err) {
			handleError(err);
		} else {
			cb(result);
		}
	}
}

function handleError(err) {
	console.error(err);
}