/**
 * http://usejsdoc.org/
 */

var connect = require('connect');
var bodyParser = require('body-parser');
/*
 * http://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4
 */
var app = connect()
	//.use(bodyParser())
	.use(bodyParser.json({ type: 'application/json' , strict: false}))
	//.use(bodyParser.urlencoded({extended: false}))
	.use(function(req, res){
		console.log(req.body);
		res.setHeader('Content-Type', 'text/plain');
		
		res.end('Resgistered new user:  ' + req.body.username);
		
	}).listen(3000);