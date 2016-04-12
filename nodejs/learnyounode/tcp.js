// var net = require('net');

// net.createServer(function(socket) {
//     var date = new Date();
//     var year = date.getFullYear();
//     var month = date.getMonth() + 1;
//     month = month >= 10 ? month : '0' + month;
//     var day = date.getDate();
//     day = day >= 10 ? day : '0' + day;
//     var hour = date.getHours();
//     hour = hour >= 10 ? hour : '0' + hour;
//     var minutes = date.getMinutes();
//     minutes = minutes >= 10 ? minutes : '0' + minutes;
//     var result = year + '-' +month+"-"+ day + ' ' + hour + ':' + minutes + '\n';
//     socket.end(result);
// }).listen(process.argv[2] || 3000);


var net = require('net');
var server = net.createServer(function(socket) {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    month = month < 10 ? "0"+month: month;
    var day = date.getDate();
    day = day < 10 ? "0"+day: day;
    var hour = date.getHours();
    hour = hour < 10 ? "0"+hour: hour;

    var miniutes = date.getMinutes();
    miniutes = miniutes < 10 ? "0"+miniutes: miniutes;

    socket.write(year+"-"+month+"-"+day+" "+hour+":"+miniutes+"\n");
    socket.end();
}).listen(process.argv[2] || 3000);


//--------official solution

function zeroFill(i) {
	return (i<10?'0':'') +i;
}

function now() {
	var d = new Date();
	return d.getFullYear()+"-"
	+zeroFill(d.getMonth()+1)+'-'
	+zeroFill(d.getDate())+"-"
	+zeroFill(d.getMinutes())
}

var server = net.createServer(function(socket) {
	socket.end(now() + "\n")
})

server.listen(Number(process.argv[2]))
