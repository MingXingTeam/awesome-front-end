;(function  (window) {
	 Utils = (function(){

		return {
			/**
			 * [extend 属性继承]
			 * @example
			 * b={m:12,n:3},a={} ==> a = {m:12,n:3} 如果a和b具有相同的属性，b会覆盖a
			 * @param  {[type]} a [对象a]
			 * @param  {[type]} b [对象b]
			 * @return {[type]}   [继承后的值]
			 */
			extend:function  (a,b) {
				for( var key in b ) { 
					if( b.hasOwnProperty( key ) ) {
						a[key] = b[key];
					}
				}
				return a;
			}
		}
	})();

	window._Utils = Utils;
})(window);