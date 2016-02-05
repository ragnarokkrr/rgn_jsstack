/**
 * http://usejsdoc.org/
 */

var User = require('../user');
var debug = require('debug')('Auth');

module.exports.realm = require('express-http-auth').realm(
		'Shoutbox API Private Area');

module.exports.checkAuth = function(req, res, next) {
	debug("checkUser: username=[" + req.username + "] password=["
			+ req.password + "]");

	User.authenticate(req.username, req.password, function(err, user) {
		if (!err && user) {
			debug("checkUser: valid!");

			// used by the API
			req.remoteUser = user;
			next();
		} else {
			debug("checkUser: computer says no....");
			res.send(401);
		}
	});

}
