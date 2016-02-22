/**
 * http://usejsdoc.org/
 */
var operation = require('./operation');

operation({
	some : 'args'
}, function resultClosure(err, result) {
	if (err) {
		console.error(err);
	} else {
		console.log('successful result', result);
	}
});