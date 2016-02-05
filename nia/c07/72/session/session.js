/**
 * http://usejsdoc.org/
 */

// https://www.npmjs.com/package/connect-cookies
// https://www.npmjs.com/package/connect-session
// https://github.com/senchalabs/connect
// https://www.npmjs.com/package/cookie-session
var cookies = require('connect-cookies')
var cookieSession = require('cookie-session')
var connect = require('connect');

const hour = 3600000;
var sessionOpts = {
		secret: 'myapp_sid',
		maxAge: hour,
//		secure: true
};


var app = connect()
// .use(cookies())
.use(cookieSession(sessionOpts))
.use(function(req, res, next) {
	var sess = req.session;
	console.log("url: %s", req.url);
	if (sess.views) {
		sess.views++;
		res.setHeader('Content-Type', 'text/html');
		res.write('<p>views: ' + sess.views + '</p>');

		console.log(JSON.stringify(req.sessionOptions));
		console.log(JSON.stringify(sess));
//		res.write('<p>views: ' + sess.views + '</p>');
//		res.write('<p>expires in: ' + (sess.sessionOptions.maxAge / 1000) + 's</p>');
//		res.write('<p>httpOnly: ' + sess.sessionOptions.httpOnly + '</p>');
//		res.write('<p>path: ' + sess.sessionOptions.path + '</p>');
//		res.write('<p>domain: ' + sess.sessionOptions.domain + '</p>');
		res.end();
		//sess.views++;
	} else {
		sess.views = 1;
		res.end('Welcome to the session demo. refresh!');
	}
}).listen(3000);