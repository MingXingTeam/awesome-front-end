/**
* 
* @name
* @desc
* @example
*/
var EventBase = function(){};

EventBase.prototype = {
	addListener: function(types, listener){
		types = utils.trim(types).split(' ');
		for(var i = 0, ti; ti = types[i++];){
			getListener(this,ti,true).push(listener);
		}
	},
	removeListener:function(types,listener){
		types = utils.trim(types).split(' ');
		for(var i = 0,ti;ti = types[i++];){
			utils.removeItem(getListener(this,ti) || [], listener);
		}
	},
	fireEvent:function(types){
		types = utils.trim(types).split(' ');
		for(var i = 0, ti; ti = types[i++];){
			var listeners = getListener(this,ti),
				r,t,k;
			if(listeners){
				k = listeners.length;
				while(k--){//
					t = listeners[k].apply(this,arguments);//执行触发函数
					if(t!==undefined){//有返回值
						r = t;
					}
				}
			}
			if(t = this['on' + ti.toLowerCase()]){//这句有何用？
				r = t.apply(this,arguments);
			}
		}
		return r;
	}
};

/**
 * 获得对象所拥有监听类型的所有监听器
 * @public
 * @function
 * @param {Object} obj  查询监听器的对象
 * @param {String} type 事件类型
 * @param {Boolean} force  为true且当前所有type类型的侦听器不存在时，创建一个空监听器数组
 * @returns {Array} 监听器数组
 */
function getListener(obj, type, force) {
    var allListeners;
    type = type.toLowerCase();
    if(obj._allListener){
    	allListeners = obj._allListener;
    	if(allListeners[type]){
    		return allListeners[type];//返回监听器的整个回调函数数组
    	}else{
    		if(force){
    			return allListeners[type] = [];//如果不存在就创建一个数组
    		}
    	}
    }else{
    	if(force){
    		allListeners = obj.__allListeners = {};//如果不存在监听器对象 就创建一个
    		return allListeners[type] = [];//并创建一个数组
    	}
    }
}