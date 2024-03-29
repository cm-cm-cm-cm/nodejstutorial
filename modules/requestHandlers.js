/*
 * requestHandlers Module
 */

var querystring = require ("querystring");
var fs = require("fs");
var formidable = require("formidable");

exports.start = function(response, request) {
	console.log("Request handler 'start' was called");
	
var
body =	'<html>'+
			'<head>'+
				'<meta http-equiv="Content-Type" content="text/html; '+
				'charset=UTF-8" />'+
			'</head>'+
			'<body>'+
				'<form action="/upload" method="post" enctype="multipart/form-data">'+
					'<input type="file" name="upload" />'+
					'<input type="submit" value="Upload File" />'+
				'</form>'+
			'</body>'+
		'</html>';

	response.writeHead(200, {"Content-Type" : "text/html"});
	response.write(body);
	response.end();

	
};

exports.upload = function(response, request) {
	console.log("Request handler 'upload' was called");
	
	var form = new formidable.IncomingForm();
	console.log("About to parse");
	
	form.parse(request, function(error, fields, files) {
		console.log("Parsing Done");
		fs.rename(files.upload.path, "/tmp/test.png");
	});
	
	
	response.writeHead(200, {"Content-Type" : "text/html"});
	response.write("receveid image:<br />");
	response.write("<img src='/show' />");
	response.end();
};

exports.show = function(response, request) {
	console.log("Request handler 'show' was called.");
	response.writeHead(200, {"Content-Type": "image/png"});
	fs.createReadStream('/tmp/test.png').pipe(response);
};
