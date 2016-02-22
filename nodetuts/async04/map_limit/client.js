/**
 * http://usejsdoc.org/
 */
var mapAsyncLimit = require('./map_async_limit');

var messages = [ 'message 1', 'message 2', 'message 3',
                 'message 5', 'message 4', 'message 6'];

var index = 0;

mapAsyncLimit(0, messages, map, done);

function done(err, results) {
	if (err) {
		console.error(err);
	} else {
		console.log('all messages sent. results:', results);
	}
}

function map(message, cb) {
	var err = Math.random() > 0.8 ? new Error('whaaa') : null;
	var value = ++index;
	setTimeout(cb, randomTimeout(), err, value);
}

function randomTimeout() {
	return Math.floor(Math.random() * 1e3);
}