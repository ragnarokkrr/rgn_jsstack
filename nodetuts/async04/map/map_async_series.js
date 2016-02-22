/**
 * http://usejsdoc.org/
 */
module.exports = mapAsyncSeries;

function mapAsyncSeries(collection, map, cb) {

	var pending = collection.slice();

	var results = [];
	
	next();

	function next() {
		if (!pending.length) {
			cb(null, results);
		} else {
			map(pending.shift(), mapped);
		}
	}

	function mapped(err, result) {
		results.push(result);
		if (err) {
			cb(err);
		} else {
			next();
		}
	}

}