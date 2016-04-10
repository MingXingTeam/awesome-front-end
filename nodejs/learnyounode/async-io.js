var fs = require('fs');
//'utf8' and data will return String
fs.readFile(process.argv[2], 'utf8', function(err, data) {
	if(err) return false;
	console.log(data.split("\n").length - 1)
})