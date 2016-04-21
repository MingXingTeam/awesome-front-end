var fs = require('fs');
var sinon = require('sinon');


var readFileStub = sinon.stub(fs, 'readFile', function (path, cb) {
  // 用自己的方法替代原先的fs.readFile方法
  return cb(path, 'filecontent');
});

readFileStub('xxxxxx',function(path, content) {
	console.log(path+"------"+content);
});

readFileStub.restore();  