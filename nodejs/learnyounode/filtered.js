var fs = require('fs');
var path = require('path');
var dir = process.argv[2];
var ext = process.argv[3];
fs.readdir(dir, function(err, list) {
	list.forEach(function(file) {
		var extname = path.extname(file);
		if(extname === "."+ext) {
			console.log(file);
		}
	})
});
