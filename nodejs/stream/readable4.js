//直接消耗一个流
process.stdin.on('readable', function () {
    var buf = process.stdin.read();//调用read从缓存中获取数据
    console.dir(buf);
});

//echo sleep都是linux命令
//(echo abc; sleep 1; echo def; sleep 1; echo ghi) | node readable4.js 