/**
 * http://usejsdoc.org/
 */

// nodeunit test.js
exports.testPony = function(test) {
	test.expect(1);

	if (false) {
		console.log('WTF');
		test.ok(false, 'This should not have passed.');
	}
	test.ok(true, 'This is should have passed.');
	test.done();
};