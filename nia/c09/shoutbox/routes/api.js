/**
 * http://usejsdoc.org/
 */
var express = require('express');
// var basicAuth = require('basic-auth-connect'); deprecated
var User = require('../lib/user');

// for auth look at lib/middleware/httpBasicAuth.js
// exports.auth = express.basicAuth(user.authenticate);
// exports.auth = basicAuth(user.authenticate);

exports.user = function(req, res, next) {
	User.get(req.params.id, function(err, user) {
		if (err)
			return next(err);
		if (!user.id)
			return res.sendStatus(404);
		res.json(user);
	});
};
