var http = require('http');
var fs = require('fs');

var server = http.createServer(function(request, response){
	// 
	res.writeHead(200, {'content-type': 'text/plain'});
	
	var a = fs.createReadStream(process.argv[3]);
	a.pipe(response);
});
server.listen(Number(process.argv[2]) || 3000)