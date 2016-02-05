/**
 * http://usejsdoc.org/
 */
// https://www.npmjs.com/package/vhost
//http://nerdpress.org/2012/04/20/hosting-multiple-express-node-js-apps-on-port-80/

var connect = require('connect')
var serveStatic = require('serve-static')
var vhost = require('vhost')

var mailapp = connect()
	.use(function hello(req, res){
		console.log("hello mail\n");
		res.end("hello mail\n")
	});

var staticapp = connect()
staticapp.use(serveStatic('public'))

var app = connect()
	.use(function hello(req, res){
		console.log("appmail\n");
	});

app.use(vhost('mail.example.com', mailapp))

app.use(vhost('assets-*.example.com', staticapp))

app.listen(3000)