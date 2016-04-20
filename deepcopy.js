function copy(destObj, srcObj) {
	for(var i in srcObj) {
		var tmp = srcObj[i];
		if(typeof srcObj[i] === 'object') {
			if(Object.prototype.toString.call(srcObj[i]) === '[object Array]') {
				tmp = [];
			} else {
				tmp = {};
			}
			copy(tmp, srcObj[i]);
		}
		destObj[i] = tmp;
	}
}