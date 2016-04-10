var through = require('through');
process.stdin.pipe(through(write, end));
//避免显式调用data和end监听
function write (buf) {// process.stdin.on('data'， function(buf){})
    console.log(buf);
}
}
function end () {
    console.log('__END__');
}

//------缓存整个流的内容
var concat = require('concat-stream');
process.stdin.pipe(concat(function (body) {
    console.log(JSON.parse(body));
}));

