var http = require('http');
var map = require('through2-map');

http.createServer(function(req, res) {
	if(req.method === 'POST') {
		// 将req的body直接转换为大写 并输出
		req.pipe(map(function(chunk){
			return chunk.toString().toUpperCase();
		})).pipe(res);
	}
}).listen(Number(process.argv[2]));
