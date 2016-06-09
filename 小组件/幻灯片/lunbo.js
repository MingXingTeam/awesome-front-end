/*图片轮播*/
function Lunbo(ele,options){
	options = $.extend({},$.fn.lunbo.defaults,options);
	this.options = options;
	this.ele = $(ele);
	this.init();
}
Lunbo.prototype = {
	constructor:Lunbo,
	init : function(){
		var that = this;_current = 1;var lunboScroll;
		findRepeatEle = this.ele.find(this.options.repeatEle);
		len = findRepeatEle.length;
		if(len>=2){
			if(this.options.optional)
			{
				//生成如下：
				//<div id="nums"><span class="current">1</span><span class="">2</span></div>
				//并拼接到ul
				var oFrag = document.createDocumentFragment();
				numWrap = document.createElement("div")
				numWrap.id = this.options.numWrapId;
				this.ele.append($(numWrap))
				for (var i = 1;i<=len;i++)
				{
					var oSpan = document.createElement("span");
					var oText = document.createTextNode(i);
					oSpan.appendChild(oText);
					oFrag.appendChild(oSpan);
				}
				numWrap.appendChild(oFrag);
				$(numWrap).find("span:first").addClass('current')
				//按钮移入事件绑定
				$(numWrap).find("span").bind("mouseover",function(){
					_current = $(numWrap).find("span").index($(this));
					that.showme()
					clearInterval(lunboScroll)
				})
				$(numWrap).find("span").bind("mouseout",function(){
					_current = $(numWrap).find("span").index($(this));
					if(_current == 0)
					{
						_current = _current+1
					}
					else if(_current == (len - 1))
					{
						_current = 0
					}
					else{
						_current = _current + 1
					}
					console.info(_current)
					lunboScroll = window.setInterval(function(){console.info(_current);that.showme()},3000)
					
				})
			}
			findRepeatEle.css({"display":"block"})
			findRepeatEle.first().show()
			//隐藏其他li
			findRepeatEle.first().siblings(that.options.repeatEle).hide()
			//showme函数放入匿名函数内以保证不会被先执行
			lunboScroll = window.setInterval(function(){that.showme()},3000)
		}
		//图片hover
		if(that.options.stoppable)
		{
			this.ele.hover(function(){
					if(lunboScroll)
						clearInterval(lunboScroll)
			},function(){
				lunboScroll = window.setInterval(function(){that.showme()},3000)
			})
		}
		
	},
	showme : function(){
		findRepeatEle.eq(_current).stop(true,true).fadeIn(1000)
		findRepeatEle.eq(_current).find("b").stop(true,true).animate({"bottom":"0"},1000)
		findRepeatEle.eq(_current).siblings(this.options.repeatEle).stop(true,true).fadeOut(1000)
		findRepeatEle.eq(_current).siblings(this.options.repeatEle).find("b").animate({"bottom":"-30px"},1000)
		if(this.options.optional)
		{
			$(numWrap).find("span").eq(_current).addClass('current')
			$(numWrap).find("span").eq(_current).siblings().removeClass('current')
		}
		_current = _current +1;
		_current = (_current<len) ? _current : 0
	}
}
$.fn.lunbo = function(options){
	$(this).each(function(){
		return new Lunbo(this,options)
	})
}
$.fn.lunbo.defaults = {
	repeatEle : "li",
	numWrapId : "nums",
	optional  : true,//是否生产按钮
	stoppable : true
}
