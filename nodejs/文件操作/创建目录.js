const mkdirp = require('mkdirp')
const path = require('path')

mkdirp(path.join(__dirname, './foo/bar'), err => {
	if(err) throw err
})