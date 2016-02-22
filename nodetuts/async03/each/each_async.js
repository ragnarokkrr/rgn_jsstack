/**
 * http://usejsdoc.org/
 */
module.exports = eachAsync;

function eachAsync(collection, iterate, cb) {

	var pending = collection.length;
	var calledback = false;

	collection.forEach(function(elem) {
		iterate(elem, terminated);
	});

	function terminated(err) {
		pending--;
		if (err) {
			callback(err);
		} else if (!pending) {
			callback();
		}
	}

	function callback(err) {
		if (!calledback) {
			calleback = true;
			cb(err);
		}
	}
}