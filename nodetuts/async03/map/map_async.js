/**
 * http://usejsdoc.org/
 */
module.exports = mapAsync;

function mapAsync(collection, map, cb) {
	var results = [];
	var pending = collection.length;
	var calledback = false;

	collection.forEach(function(elem, index) {
		map(elem, terminating(index));
	});

	function terminating(index) {

		return function terminated(err, result) {
			pending--;
			if (err) {
				callback(err);
			} else {
				results[index] = result;
				if (!pending) {
					callback(null, results);
				}
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