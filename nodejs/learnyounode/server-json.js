var http = require('http');
var url = require('url');

http.createServer(function(req, res) {
	if(req.method === "GET") {
		var urlObj = url.parse(req.url, true);
		var pathname = urlObj.pathname;
		var date = new Date(urlObj.query.iso);

		var result = {};
		if(pathname.indexOf("parsetime") !== -1) {
			result = {
				"hour": date.getHours(),
				"minute": date.getMinutes(),
				"second": date.getSeconds()
			}
		} else if(pathname.indexOf("unixtime") !== -1) {
			result = {
				"unixtime":  date.getTime()//toISOString()
			}
		}

		res.writeHead(200, {'Content-Type':'application/json'});
		res.write(JSON.stringify(result));
		res.end();
	}
}).listen(Number(process.argv[2]));

//------official solution

function parsettime(time) {
	return {
		hour: time.getHours(),
		minute: time.getMinutes(),
		second: time.getSeconds()
	}
}

function unixtime(time) {
	return { unixtime: time.getTime() }
}

var server = http.createServer(function(req, res) {
	var parseUrl = url.parse(req.url, true)
	var time = new Date(parseUrl.query.iso)
	var result 
	if( /^\/api/parsetime/.test(req.url))
		result = parsetime(time)
	else if(/^\/api/unixtime/.test(req.url))
		result = unixtime(time)

	if(result) {
		res.writeHead(200, { 'Content-Type': 'application/json'})
		res.end(JSON.stringify(result))
	}else{
		res.writeHead(404)
		res.end();
	}

}).listen(Number(process.argv[2]))