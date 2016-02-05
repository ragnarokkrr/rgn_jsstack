/**
 * http://usejsdoc.org/
 */
const assert = require('assert');

var connect = require('connect');
var cookies = require('cookies');
var keygrip = require('keygrip');

var keylist = ["John", "Connor"];
var keys = keygrip(keylist);

/*
 *DEPRECATED https://github.com/pillarjs/cookies
 *http://www.senchalabs.org/connect/cookieParser.html
 *
 *
var app = connect()
	.use(connect.cookieParser('tobi is a cool ferret'))
	.use(function(req, res){
		console.log(req.cookies);
		console.log(req.signedCookies);
		res.end('hello\n');
	}).listen(3000);
*/

var app = connect()
	.use(function cookiesOnline(req, res, next){
		if  (req.url == "/set"){
			var cookiesSetter = new cookies(req, res, keys);
			cookiesSetter
				// regular cookie
				.set("unsigned", "foo", {httpOnly: false})
				// signed cookie
				.set("signed", "bar", {signed: true})
				// mimic a signed cookie, but with a bogus signature
				.set("tampered", "baz")
				.set("tampered.sig", "bogus");
			
			res.writeHead(302, {"Location": "/"});
			res.end("Now let's check.");
		}
		next();
	})
	.use(function(req, res){
		if (req.url !== "/set"){
			var cookiesGetter = new cookies(req, res, keys);
			var unsigned, signed, tampered;
			
			unsigned = cookiesGetter.get("unsigned");
			signed = cookiesGetter.get("signed", {signed: true});
			tampered = cookiesGetter.get("tampered", {signed: true});

/*			assert.equal(unsigned, "foo");
			assert.equal(signed, "bar");
			assert.notEqual(tampered, "baz");
			assert.deepEqual(tampered, undefined);
*/			
			res.writeHead(200, {"Content-Type": "text/plain"});
			res.write("unsigned expected: foo\n\n");
			res.write("unsigned found: " + unsigned + "\n\n");
			res.write("signed expected: bar\n\n");
			res.write("signed found: " + signed + "\n\n");
			res.write("tampered expected: undefined\n\n");
			res.write("tampered found: " + tampered + "\n\n");
			
		}
		return res.end("\n that's it...");
	}).listen(3000)