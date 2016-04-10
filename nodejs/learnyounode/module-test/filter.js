var fs = require('fs');
var path = require('path');

module.exports = function(dir, ext, callback) {
	var result = [];
	fs.readdir(dir, function(err, list) {
		if(err) return callback(err);// 必须用return
		list = list.filter(function(file) {
			return path.extname(file) === '.' + ext;
		})
		// list.forEach(function(file) {
		// 	var extname = path.extname(file);
		// 	if(extname === "."+ext) {
		// 		result.push(file);
		// 	}
		// });
		// console.log(result);
		callback(null,list);
	});
}