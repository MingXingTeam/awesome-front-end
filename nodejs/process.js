// var count = 0;
// for(var i=0;i < process.argv.length-2; i++) {
// 	count += +process.argv[i+2];
// }
// console.log(count)

var result = 0;
for(var i = 2; i < process.argv.length; i++) {
	result += +process.argv[i];
}

console.log(result)