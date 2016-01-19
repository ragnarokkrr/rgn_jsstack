/**
 * http://usejsdoc.org/
 */

function asyncFunction(callback) {
	setTimeout(callback, 200);
}

var color = 'blue';

(function(color) {
	asyncFunction(function() {
		console.log('The color is ' + color);
	});
})(color);
//closure to make a local version of color

color = 'green';