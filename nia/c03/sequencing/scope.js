/**
 * http://usejsdoc.org/
 */
function asynchFunction(callback) {
	setTimeout(callback, 200);
}

var color = 'blue';

asynchFunction(function() {
	console.log('The color is ' + color);
});

color = 'green';

