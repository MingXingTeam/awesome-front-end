const pump = require('pump')
const fs   = require('fs')

// 没有处理错误的情况如下：
fs.createReadStream('./in.file').pipe(fs.createWriteStream('./out.file'))

// 处理错误！
const rs = fs.createReadStream('./in.file')
const ws = fs.createWriteStream('./out.file')

pump(rs, ws, err => {
	if(err) throw err
})