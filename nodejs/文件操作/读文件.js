const path = require('path')
const fs = require('fs')

fs.createReadStream(path.join(__dirname, '读文件.js'))
  .pipe(process.stdout)