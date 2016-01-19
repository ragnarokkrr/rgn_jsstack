/**
 * http://usejsdoc.org/
 */

var net = require('net');

var server = net.createServer(function (socket){
	console.log("Connection from:  " + socket.remoteAddress);
	socket.end("Hello World!\n");
});


server.listen(7000, "localhost");

console.log("TCP server listening on port 7000 at localhost.");