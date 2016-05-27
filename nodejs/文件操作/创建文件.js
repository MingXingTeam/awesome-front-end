const path = require('path')
const fs = require('fs')

//cat ./my-file > ./my-other-file
fs.createReadStream(path.join(__dirname, '创建文件.js'))
  .pipe(fs.createWriteStream(path.join(__dirname, './创建文件-拷贝.js')))