/**
 * http://usejsdoc.org/
 */
module.exports = function composedCall(args, cb) {
	var pending = 0;
	var results = [];
	var calledback = false;

	call1(args, handleResult());
	call2(args, handleResult());
	call3(args, handleResult());

	function handleResult() {
		var order = pending;
		pending++;

		return function done(err, result) {
			pending--;
			if (err) {
				latchCallback(err);
			} else {
				results[order] = result;
				if (!pending) {
					latchCallback(null, results);
				}
			}
		}
	}

	function latchCallback(err, value) {
		if (!calledback) {
			calledback = true;
			cb(err, value);
		}
	}
};

// calls

function call1(args, cb) {
	setTimeout(cb, randomTimeout(), null, randomValue());
}

function call2(args, cb) {
	setTimeout(cb, randomTimeout(), null, randomValue());
}

function call3(args, cb) {
	setTimeout(cb, randomTimeout(), null, randomValue());
}

// utils

function randomTimeout() {
	return Math.floor(Math.random() * 1e3);
}

function randomValue() {
	return Math.floor(Math.random() * 1e10);
}