var url = process.argv[2];
var http = require("http");
http.get(url, function(response) {
	//response是一个Stream对象
	response.setEncoding("utf8");//将data转为string
	var body = '';
	response.on("data", function(chunk) {
		body+=chunk;
	});
	response.on('end', function() {
	    console.log(body.length);
	    console.log(body);
	});
	response.on('error', console.error);
})

//------------official solution

var bl = require('bl');
http.get(process.argv[2], function(response) {
	response.pipe(bl(function(err, data) {
		if(err) return console.error(err)
		data = data.toString();
	    console.log(data.length);
	    console.log(data)
	}))
})