const readdirp = require('readdirp')
const json = require('JSONStream')
const path = require('path')


// recursively print out all files in all subdirectories
// to the command line. The object stream must be
// stringified before being passed to `stdout`.
readdirp({ root: path.join(__dirname) })
      .pipe(json.stringify())
      .pipe(process.stdout)