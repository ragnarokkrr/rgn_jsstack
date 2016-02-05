/**
 * http://usejsdoc.org/
 */
var connect = require('connect');

function logger(req, res, next) {
	console.log("%s %s", req.method, req.url);
	next();
}

function hello(req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.end("Hello World!");
}

connect()
	.use(logger)
	.use('/admin', restrict)
	.use('/admin', admin)
	.use(hello)
	.listen(3000);

console.log("ok");

function restrict(req, res, next) {
	var authorization = req.headers.authorization;
	if (!authorization)
		return next(new Error("Unauthorized"));

	var parts = authorization.split(' ');
	var scheme = parts[0];
	var auth = new Buffer(parts[1], 'base64').toString().split(':');
	var user = auth[0];
	var pass = auth[1];

	authenticationWithDatabase(user, pass, function(err) {
		if (err)
			return next(err);
		next();
	});
}

/**
 * admin:barata44
 * YWRtaW46YmFyYXRhNDQ= 
 */
function authenticationWithDatabase(user, pass, cb) {
	if (user != 'admin') {
		cb(new Error("Bad User"));
	}
	if (pass != "barata44") {
		cb(new Error("Bad User or Password"));
	}
	cb();
}

function admin(req, res, next) {
	switch (req.url) {
	case '/':
		res.end('try /users');
		break;
	case '/users':
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify([ 'tobi', 'loki', 'jane' ]));
		break;
	}
}
