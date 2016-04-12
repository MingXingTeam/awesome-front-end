//只能流进不能流出的流
var Writable = require('stream').Writable;
var ws = Writable();//Writable({decodeStrings: false})
ws._write = function (chunk, enc, next) {
    console.dir(chunk);//数据会自动被转换为Buffer对象
    next();//next(err)是一个回调函数，使用这个回调函数你可以告诉数据消耗者可以写更多的数据
};

process.stdin.pipe(ws);

//(echo beep; sleep 1; echo boop) | node write0.js 