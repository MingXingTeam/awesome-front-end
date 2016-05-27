// use `path.join()` over `+` to keep Windows users happy
var path = require('path');

// find a file relative to the call site, useful for CLI applications
// and reading files passed in by the user

//process.cwd() 当前所在目录
// var mypath = path.join(process.cwd(), '引用文件.js');
var mypath = path.resolve('引用文件.js');

//__dirname 当前所在目录
// find a file relative to the file, useful for referencing files that are
// distributed with the package
var path2222 = path.join(__dirname, '引用文件.js')

console.log(path2222)