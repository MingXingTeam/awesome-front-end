/**
* 
* @name 
* @desc  静态工具函数
* @example
*/
var utils = {
	/**
	* 遍历数组， 对象， nodeList
	* @name each
	* @desc 
	* * obj 要遍历的对象
	* * iterator 遍历的方法，方法的第一个是遍历的值，第二个是索引，第三个是obj
	* * context iterator的上下文
	* @example
	* utils.each([1,2],function(v,i){
	* 	console.log(v);//值
	*	console.log(i);//索引
	* })
	* utils.each(document.getElementsByTagName('*'),function(n){
	*	console.info(n.tagName);
	* })
	*/
	
	each : function(obj, iterator, context){
		if(obj == null) return;
		if(Array.prototype.forEach && obj.forEach === Array.prototype.forEach){//调用自带的遍历函数
			obj.forEach(iterator, context);
		}else if(obj.length === +obj.length){
			for(var i = 0, l = obj.length; i < l; i++){
				if(iterator.call(context,obj[i],i,obj) === false) return;
			}
		}else{//对象
			for(var key in obj){
				if(obj.hasOwnProperty(key)){
					if(iterator.call(context,obj[key],key,obj) === false) return;
				}
			}
		}
	},

	makeInstance : function(obj){
		//obj的原型为
		var noop = new Function();
		noop.prototype = obj;
		obj = new noop;
		noop.prototype = null;
		return obj;
	},

	/**
	* 将source对象中的属性扩展到target对象上
	* @name extend
	* @grammar utils.extend(target,source) => Object 覆盖扩展
	* @grammar utils.extend(target,source,true) => Object 保留扩展
	*/
	
	extend : function(t, s, b){
		if(s){
			for(var k in s){
				if(!b || !t.hasOwnProperty(k)){
					t[k] = s[k];
				}
			}
		}
		return t;
	},

	/**
	* 用指定的context作为fn上下文
	* @name bind
	* @grammar utils.bind(fn,context) => fn
	*/
	
	bind:function(fn,context){
		return function(){
			return fn.apply(context,arguments);
		}
	},
	/**
	* 创建延迟delay执行的函数fn
	* @name defer
	* @grammar utils.defer(fn,delay) => fn  //延迟delay毫秒执行fn,返回fn
	* @grammar utils.defer(fn,delay,exclusion) => fn //延迟delay毫秒执行fn,若exclusion为真，则互斥执行fn
	* @example
	* function test(){
	* 	console.log("延迟输出！");
	* }
	* //非互斥延迟执行
	* var testDefer = utils.defer(test,1000);
	* testDefer(); => "延迟输出！"
	* testDefer(); => ""演出输出！
	* //互斥延迟执行
	* var testDefer1 = utils.defer(test,1000,true);
	* testDefer1(); => "延迟输出"
	* testDefer1(); => //本次不执行
	*/
	
	defer:function()(fn,delay,exclusion){
		var timerID;
		return function(){
			if(exclusion){
				clearTimeout(timerID);
			}
			timerID = setTimeout(fn,delay);
		}
	},
	/**
	* 查找元素item在数组array中的索引，若找不到返回-1 
	* @name indexOf
	* @grammer utils.indexOf(array,item) => intex | -1 //默认从头开始搜索
	* @grammer utils.indexOf(array,item,start) => index|-1 //start指定开始查找的位置
	*/
	
	indexOf:function(array,item,start){
		var index = -1;
		start = this.isNumber(start) ? start : 0;
		this.each(array,function(v,i){
			if(i >= start && v === item){
				index = i;
				return false;
			}
		});
		return index;
	},
	/**
	* 
	* @name
	* @desc
	* @example
	*/
	
	removeItem:function(array,item){
		for(var i = 0, l = array.length; i < l;i++){
			if(array[i] === item){
				array.splice(i, 1);
				i--;//返回原位置
			}
		}
	},
	/**
	* 删除字符串str的首尾空格
	* @name trim
	* @grammar utils.trim(str) => String
	*/
	
	trim:function(str){
		return str.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, '');
	},
	/**
	* 将字符串list(以’,'分隔)或者数组list转为哈希对象
	* @name listToMap
	* @grammar utils.listToMap(list) => Object //Object形如{test:1,br:1,textarea:1}
	*/
	
	listToMap:function(list){
		if(!list) return {};
		list = utils.isArray(list) ? list : list.split(",");
		for(var i = 0, ci, obj = {}; ci = list[i++];){
			obj[ci.toUpperCase()] = obj[ci] = 1;
		}
		return obj;
	},
	/**
	* 将str中的html符号转义,默认将转义''&<">''四个字符，可自定义reg来确定需要转义的字符
	* @name unhtml
	* @grammar utils.unhtml(str); => String
	* @grammar utils.unhtml(str, reg); => String
	* @example
	*/
	
	unhtml:function(str,reg){
		return str ? str.replace(reg || /[&<">]/g,function(m){
			return {
				'<' : '&lt;',
				'&' : '&amp;',
				'"' : '&quot',
				'>' : '&gt;'
			}[m];
		});
	},
	/**
	* 将str中的转义字符还原为html字符
	* @name html
	* @grammar utils.html(str) => String //
	*/
	
	html:function(str){
		return str ? str.replace(/&((g|l|quo)t|amp);/g,function(m){
			return {
				'&lt;':'<',
				'&amp;':'&',
				'&quot;':'"',
				'&gt;':'>'
			}[m];
		});
	},
    /**
     * 将css样式转换为驼峰的形式。如font-size => fontSize
     * @name cssStyleToDomStyle
     * @grammar utils.cssStyleToDomStyle(cssName)  => String
     */
	
	cssStyleToDomStyle:function(){
		var test = document.createElement('div').style,
			cache = {//用于缓存
				'float':test.cssFloat != undefined ? 'cssFloat' : test.styleFloat != undefined ? 'styleFloat' : 'float'
			};

		return function(cssName){
			return cache[cssName] || (cache[cssName] = cssName.toLowerCase().replace(/-./g,function(match){
				return match.charAt(1).toUpperCase();
			}));
		};
	}(),

    /**
     * 动态加载文件到doc中，并依据obj来设置属性，加载成功后执行回调函数fn
     * @name loadFile
     * @grammar UE.utils.loadFile(doc,obj)
     * @grammar UE.utils.loadFile(doc,obj,fn)
     * @example
     * //指定加载到当前document中一个script文件，加载成功后执行function
     * utils.loadFile( document, {
     *     src:"test.js",
     *     tag:"script",
     *     type:"text/javascript",
     *     defer:"defer"
     * }, function () {
     *     console.log('加载成功！')
     * });
     */
    loadFile:function () {
        var tmpList = [];//缓存功能
        function getItem(doc,obj){
            for(var i= 0,ci;ci=tmpList[i++];){
                try{
                    if(ci.doc === doc && ci.url == (obj.src || obj.href)){
                        return ci;
                    }
                }catch(e){
                    //在ie9下，如果doc不是一个页面的，会导致拒绝访问的错误
                    continue
                }

            }
        }
        return function (doc, obj, fn) {

            var item = getItem(doc,obj);
            if (item) {
                if(item.ready){
                    fn && fn();
                }else{
                    item.funs.push(fn)
                }
                return;
            }
            tmpList.push({
                doc:doc,
                url:obj.src||obj.href,
                funs:[fn]
            });
            if (!doc.body) {
                var html = [];
                for(var p in obj){
                    if(p == 'tag')continue;
                    html.push(p + '="' + obj[p] + '"')
                }
                doc.write('<' + obj.tag + ' ' + html.join(' ') + ' ></'+obj.tag+'>');
                return;
            }
            if (obj.id && doc.getElementById(obj.id)) {
                return;
            }
            var element = doc.createElement(obj.tag);
            delete obj.tag;
            for (var p in obj) {
                element.setAttribute(p, obj[p]);
            }
            element.onload = element.onreadystatechange = function () {
                if (!this.readyState || /loaded|complete/.test(this.readyState)) {
                    item = getItem(doc,obj)
                    if (item.funs.length > 0) {
                        item.ready = 1;
                        for (var fi; fi = item.funs.pop();) {
                            fi();
                        }
                    }
                    element.onload = element.onreadystatechange = null;
                }
            };
            doc.getElementsByTagName("head")[0].appendChild(element);
        }
    }(),
    /**
     * 判断obj对象是否为空
     * @name isEmptyObject
     * @grammar UE.utils.isEmptyObject(obj)  => true|false
     * @example
     * UE.utils.isEmptyObject({}) ==>true
     * UE.utils.isEmptyObject([]) ==>true
     * UE.utils.isEmptyObject("") ==>true
     */
    isEmptyObject:function (obj) {
        if (obj == null) return true;
        if (this.isArray(obj) || this.isString(obj)) return obj.length === 0;
        for (var key in obj) if (obj.hasOwnProperty(key)) return false;
        return true;
    },

     /**
     * 统一将颜色值使用16进制形式表示
     * @name fixColor
     * @grammar UE.utils.fixColor(name,value) => value
     * @example
     * rgb(255,255,255)  => "#ffffff"
     */
    fixColor:function (name, value) {
        if (/color/i.test(name) && /rgba?/.test(value)) {
            var array = value.split(",");
            if (array.length > 3)
                return "";
            value = "#";
            for (var i = 0, color; color = array[i++];) {
                color = parseInt(color.replace(/[^\d]/gi, ''), 10).toString(16);
                value += color.length == 1 ? "0" + color : color;
            }
            value = value.toUpperCase();
        }
        return  value;
    },
 	/**
     * 深度克隆对象，从source到target
     * @name clone
     * @grammar UE.utils.clone(source) => anthorObj 新的对象是完整的source的副本
     * @grammar UE.utils.clone(source,target) => target包含了source的所有内容，重名会覆盖
     */
    clone:function (source, target) {
        var tmp;
        target = target || {};
        for (var i in source) {
            if (source.hasOwnProperty(i)) {
                tmp = source[i];
                if (typeof tmp == 'object') {
                    target[i] = utils.isArray(tmp) ? [] : {};
                    utils.clone(source[i], target[i])
                } else {
                    target[i] = tmp;
                }
            }
        }
        return target;
    },
	    
	dummy : function(){}
}
