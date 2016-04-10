var url = process.argv[2];
var http = require("http");
http.get(url, function(response) {
	//response是一个Stream对象
	response.setEncoding("utf8");//将data转为string
	// response.on("data", function(data) {
	// 	console.log(data);
	// });
	response.on("data", console.log);//可以直接传递一个函数名字，然后它会直接将结果传递给这个函数
	response.on('error', console.error);
})