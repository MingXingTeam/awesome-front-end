process.stdin.on('readable', function () {
    var buf = process.stdin.read(3);//每次读取3个字节数据 可能读取数据不全
    //process.stdin.read(0);  读取剩余的缓存中的数据
    console.dir(buf);
});