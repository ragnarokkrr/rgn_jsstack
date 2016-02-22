/**
 * http://usejsdoc.org/
 */
module.exports = eachAsyncSeries;

function eachAsyncSeries(collection, iterate, cb) {

	var pending = collection.slice();

	next();

	function next() {
		if (!pending.length) {
			cb();
		} else {
			iterate(pending.shift(), iterated);
		}
	}

	function iterated(err) {
		if (err) {
			cb(err);
		} else {
			next();
		}
	}

}