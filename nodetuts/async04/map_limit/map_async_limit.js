/**
 * http://usejsdoc.org/
 */
module.exports = mapAsyncLimit;

function mapAsyncLimit(limit, collection, map, cb) {

	var pos = 0;
	var pending = 0;
	var results = [];
	var calledback = false;

	next();

	function next() {
		if (pos >= collection.length) {
			if (!pending) {
				callback(null, results);
			}
		} else if (pending < limit) {
			pending++;
			map(collection[pos], mapping(pos));
			pos++;
			next();
		}
	}

	function mapping(pos) {
		return function mapped(err, result) {
			pending--;
			results[pos] = result;
			if (err) {
				callback(err);
			} else {
				next();
			}
		}
	}

	function callback(err, results) {
		if (!calledback) {
			calleback = true;
			cb(err, results);
		}
	}
}