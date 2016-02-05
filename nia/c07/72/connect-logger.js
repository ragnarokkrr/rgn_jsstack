/**
 * http://usejsdoc.org/
 */
var connect = require('connect');
var logger = require('connect-logger');


var app = connect()
	.use(logger('short'))
	.use(function hello(req, res){
		//res.setHeader('Content-Type', 'plain/text');
		res.end('req: '+ req.url);
	}).listen(3000)