/**
 * http://usejsdoc.org/
 */
module.exports = function composedCall(args, cb) {
	call1(args, handlingError(function resCall1(result1) {
		call2(args, handlingError(function resCall2(result2) {
			call3(args, handlingError(function resCall3(result3) {
				cb(null, [ result1, result2, result3 ])
			}));
		}));
	}));

	function handlingError(fn) {
		return function errorClosure(err, result) {
			if (err) {
				cb(err);
			} else {
				fn(result);
			}
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