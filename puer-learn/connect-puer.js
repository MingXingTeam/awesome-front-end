var chokidar = require('chokidar');
var express = require('express');
var cwd      = process.cwd();
var server   = require('./server');
var path = require('path');

module.exports = function(app, server, options) {
	//匹配静态资源
	app.use('/puer', express["static"](path.join(__dirname, "../vendor")));

	if(options.reload) {
		options.inject.push('<script src="/puer/js/reload.js"></script>');

		var sockets = [];
		io = (require('socket.io')).listen(server);
		io.sockets.on("connection", function(socket) {
			sockets.push(socket);
			return socket.on('disconnect', function() {
			  var index;
			  index = sockets.indexOf(socket);
			  if (index !== -1) {
			    return sockets.splice(index, 1);
			  }
			});
		});

		//监控目录文件
		var watcher = chokidar.watch('file, dir, glob, or array', {
		  persistent: true
		});

		watcher.on('change', function(path, stats) {
		  var 
		    data = {
		      "path": path
		    },
		    results = [], 
		    socket;
		    console.log('change trigger');
		    //css
		    if (path.indexOf(".css") != -1) {
		      data.css = path.slice(cwd.length);
		    }

		    for (var i = 0, len = sockets.length; i < len; i++) {
		      socket = sockets[i];
		      if (socket) {
		        results.push(socket.emit("update", data));
		      } else {
		        results.push(void 0);
		      }
		    }
		    return results;
		}); 

	}
	return function(req, res, next) {
	　var end   = res.write, 
	      write = res.end;
      // res.flush = function(){};
      res.chunks = '';
      // 重写res.write
      res.write = function(chunk, encoding) {
        var e, header, length;
        header = res.getHeader("content-type");
        length = res.getHeader("content-length");
        if ((/^text\/html/.test(header)) || !header) {
          //从二进制转为字符串
          if (Buffer.isBuffer(chunk)) {
            chunk = chunk.toString("utf8");
          }
          //在head标签插入<script src="/puer/js/reload.js"></script>
          if (chunk.indexOf("</head>") != -1) {
            return write.call(res, chunk, "utf8");
          } 
          chunk = chunk.replace("</head>", options.inject.join('') + "</head>");
          if (length) {
            length = parseInt(length);
            length += Buffer.byteLength(options.inject.join(''));
            try {
              res._header = null;//??
              res.setHeader("content-Length", length);
              this._implicitHeader();//??
            } catch (error) {
              e = error;
            }
          }
          debugger;
          return write.call(res, chunk, "utf8");
        } else {
          return write.call(res, chunk, encoding);
        }
      };
      // 重写res.end
      res.end = function(chunk, encoding) {
        if (chunk != null) {
          this.write(chunk, encoding);
        }
        return end.call(res);
      };
      return next();
	}
}
