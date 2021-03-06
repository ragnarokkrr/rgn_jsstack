/**
 * http://usejsdoc.org/
 */
var http = require('http');
var formidable = require('formidable');

var server = http.createServer(function(req, res) {
	switch (req.method) {
	case 'GET':
		show(req, res);
		break;
	case 'POST':
		upload(req, res);
		break;

	}
});


server.listen(3000);

function show(req, res) {
	var html = ''
		+ '<form method="post" action="/" enctype="multipart/form-data"> '
		+ '<p><input type="text" name="name" /></p>'
		+ '<p><input type="file" name="file" /></p>'
		+ '<p><input type="submit" name="Upload" /></p>'
		+ '';
	res.setHeader('Content-Type', 'text/html');
	res.setHeader('Content-Length', Buffer.byteLength(html));
	res.end(html);

}

function upload(req, res){
	if (!isFormData(req)){
		res.statusCode = 400;
		res.end('Bad request: expecting multipart/form-data');
	}
	
	var form = new formidable.IncomingForm();
	form.on('field', function(field, value){
		console.log("field: %s", field);
		console.log("value: %s", value);
	});
	
	form.on('file', function(name, file){
		console.log("name: %s", name);
		console.log("file: %s", file);
	});
	
	form.on('end', function(){
		res.end('upload complete!');
	});
	
	form.on('progress', function (bytesReceived, bytesExpected){
		var percent = Math.floor(bytesReceived / bytesExpected * 100);
		console.log("percent: %d" , percent);
	});
	
	form.parse(req);
}

function isFormData(req){
	var type = req.headers['content-type'] || '';
	return 0 == type.indexOf('multipart/form-data');
}

