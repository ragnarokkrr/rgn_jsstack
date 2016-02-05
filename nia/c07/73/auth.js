/**
 * http://usejsdoc.org/
 */
var connect = require('connect');
var basicAuth = require('basic-auth-connect');


//var app = connect()
//	.use(connect.basicAuth('tj', 'tobi'));
/*
var users = {
		tobi: 'foo',
		loki: 'bar',
		jane: 'baz'
};


var app = connect()
	.use(connect.basicAuth(function (user, pass){
		return users[user] === pass;
	}));
*/

var app = connect()
	.use(basicAuth('tobi', 'ferret'))
	.use(function (req, res) {
		res.end("I'm a secret\n");
	});

app.listen(3000);
