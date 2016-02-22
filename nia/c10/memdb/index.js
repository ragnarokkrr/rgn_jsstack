/**
 * http://usejsdoc.org/
 */
var db = [];

exports.save = function(doc) {
	db.push(doc);
};

exports.first = function(obj) {
	return db.filter(matchEveryPropertyInObj).shift();

	function matchEveryPropertyInObj(doc) {
		for ( var key in obj) {
			if (doc[key] != obj[key]) {
				return false;
			}
		}
		return true;
	}
};

exports.clear = function() {
	db = [];
};

exports.save = function(doc, cb) {
	db.push(doc);
	if (cb) {
		setTimeout(function() {
			cb();
		}, 1000);
	}
};