const findup = require('findup')
const path = require('path')

findup(path.join(__dirname), 'readme.md', (err, res) => {
	if(err) throw err
	console.log('dir is: ' + res)
})

