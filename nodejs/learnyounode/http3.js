var http = require("http");
function getData(url, callback) {
	http.get(url, function(response) {
		response.setEncoding("utf8");
		var body = '';
		response.on("data", function(chunk) {
			body+=chunk;
		});
		response.on('end', function() {
			console.log(body);
			callback && callback();
		});
		response.on('error', console.error);
	});
}

getData(process.argv[2], function() {
	getData(process.argv[3], function() {
		getData(process.argv[4]);
	});
});

//-------------offical solution
var bl = require('bl')
var results = [];
var count = 0;
function printResults(){
	for(var i =0;i <3; i++) {
		console.log(results[i])
	}
}

function httpGet(index) {
	http.get(process.argv[index+2], function(response) {
		response.pipe(bl(function(err, data) {
			if(err) return console.error(err)
			results[index] = data.toString();
		    count++;
		    if(count === 3) {
		    	printResults();
		    }
		}))
	})
}


