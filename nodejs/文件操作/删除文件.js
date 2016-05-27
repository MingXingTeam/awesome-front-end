const rimraf = require('rimraf')
const path = require('path')

rimraf(path.join(__dirname, './aaa.js'), err => {
	if(err) throw err
})