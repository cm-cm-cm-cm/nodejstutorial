/*
 * Server Module
 */


// Models we need
var http = require("http");
var url = require("url");

// start function of this module
exports.start = function(route,handle) {
	// Gets called on Request
	function onRequest(request, response) {
		// gets the pathname out of the url
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
		
		route(handle, pathname ,response);
	}
	
	// Start the server and fire the onRequest function on request.
	http.createServer(onRequest).listen(8888);
	console.log("Server has started");
};



