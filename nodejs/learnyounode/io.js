var fs = require('fs');
// var buf = fs.readFileSync(process.argv[2]);
// var strArr = buf.toString().split("\n");
// console.log(strArr.length-1);


console.log(fs.readFileSync(process.argv[2], 'utf8').split("\n").length-1);