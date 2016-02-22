/**
 * http://usejsdoc.org/
 */
var mapAsyncSeries = require('./map_async_series');

var messages = [ 'message 1', 'message 2', 'message 3' ];

var index = 0;

mapAsyncSeries(messages, map, done);

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