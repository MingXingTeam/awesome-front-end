//Readable流可以产出数据，
//可以将这些数据传送到一个writable，transform或者duplex流
//只需要调用pipe()方法
var Readable = require('stream').Readable;

var rs = new Readable;
// 推送所有数据到缓存中
rs.push('beep ');
rs.push('boop\n');
rs.push(null);

rs.pipe(process.stdout);