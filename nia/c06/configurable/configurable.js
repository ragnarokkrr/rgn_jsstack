/**
 * http://usejsdoc.org/
 */
var connect = require('connect');
var router = require('./middleware/router');
var logger = require('./middleware/logger');
var routes = {
	GET : {
		'/users' : function(req, res) {
			res.end('tobi, loki, ferret');
		},
		'/user/:id' : function(req, res, id) {
			res.end('user ' + id);
		}
	},
	DELETE : {
		'/user/:id' : function(req, res, id) {
			res.end('deleted user ' + id);
		}
	}
};

connect()
	.use(logger(':method :url'))
	.use(router(routes))
	.listen(3000);

console.log('ok');