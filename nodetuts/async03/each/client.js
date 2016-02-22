/**
 * http://usejsdoc.org/
 */
var eachAsync = require('./each_async');

var messages = [ 'message 1', 'message 2', 'message 3' ];

eachAsync(messages, send, done);

function done(err) {
	if (err) {
		console.error(err);
	} else {
		console.log('all messages sent');
	}
}

function send(message, cb) {
	var err = Math.random() > 0.8 ? new Error('whaaa') : null;
	setTimeout(cb, randomTimeout(), err);
}

function randomTimeout() {
	return Math.floor(Math.random() * 1e3);
}