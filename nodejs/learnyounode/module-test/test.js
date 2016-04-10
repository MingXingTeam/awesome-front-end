var filter = require("./filter");

filter(process.argv[2], process.argv[3], function(err, data){
	if(err) console.error('There war an error:', err);
	data.forEach(function(file){
		console.log(file)
	})
})