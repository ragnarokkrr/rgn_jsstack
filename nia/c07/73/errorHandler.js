/**
 * http://usejsdoc.org/
 */
var connect = require('connect');
var errorHandler = require('errorhandler')
var morgan = require('morgan');

var logger = morgan('dev');

var app = connect()
	.use(logger)
	.use(function (req, res, next) {
		setTimeout(function (){
			next(new Error('something broke!'));
		}, 500);
	})
	.use(errorHandler())
	.listen(3000);