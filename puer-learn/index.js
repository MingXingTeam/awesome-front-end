var express = require('express');
var http = require('http');
var connectPuer = require('./connect-puer');
var os = require('os');
var path = require('path');

var port = process.env.PORT || 3000;
var cwd = process.cwd();

var app = express();
var server = http.createServer(app);

//路由中间件：匹配任意请求
var ips = [];
var ifaces = os.networkInterfaces();
for (dev in ifaces) {
  ifaces[dev].forEach(function(details) {
    if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
      return ips.push(details.address);
    }
  });
}

app.use(connectPuer(app, server, {
	inject: [],
	dir: cwd,
	ips: ips
}));


server.listen(port, function(err) {
  console.log("监听端口"+port);
});