/*
 * -----------------------------------------------
 * 轮播组件
 * @compatible      IE6+
 * @depends         jQuery
 * @case
	
	$(elem).slide({
		// 幻灯片数据（先用占位符，等后台数据到了后再显示幻灯片）
		data: [{
			imgSrc: '', //图片路径
			imgLink: '' //图片链接路径
		}],
		// 是否生成圆点
		optional: true,
		// 是否鼠标浮动到上去后停止播放
		stoppable: true,
		// 播放间隔时间
		interval: 3000
	});
 
 * @mind

   1. 获得配置
   2. 显示第一个图片其他图片隐藏
   3. 创建圆点元素并绑定事件
   4. 绑定图片事件

 * @version         1.0
 * @author          maomao(xunxing1989@gmail.com)
 * @date            2016/03/25
 * -----------------------------------------------
 */
function Slide(ele, options) {
	this.options = $.extend({}, $.fn.slide.defaults, options);
	this.ele = $(ele);
	this.init();
}
Slide.prototype = {
	constructor: Slide,
	$slideItems: null,
	init: function() {
		var that = this;
	    // 播放计时器	
		scrollTimer = null;
		// 当前位置
		_current = 1;
		numWrap = null;

		// 渲染幻灯片骨架
		this.render();
		// 获取所有幻灯图片
		this.$slideItems = $("._slide_list_item");

		len = this.options.data.length;
		// 至少两个循环元素
		if (len >= 2) {
			
			!scrollTimer && (that.showme(), scrollTimer = setInterval(function() {
				that.showme();
			},this.options.interval))

			// 生成圆点
			if (this.options.optional) {
				//生成如下：
				//<div id="nums">
				//   <span class="current">1</span>
				//   <span class="">2</span>
				//</div>
				//并拼接到ul
				var oFrag = document.createDocumentFragment();
				numWrap = document.createElement("div")
				numWrap.id = this.options.numWrapId;
				$("#_slide").append($(numWrap))
				for (var i = 1; i <= len; i++) {
					var oSpan = document.createElement("span");
					var oText = document.createTextNode(i);
					oSpan.appendChild(oText);
					oFrag.appendChild(oSpan);
				}
				numWrap.appendChild(oFrag);
				$(numWrap).find("span:first").addClass('current')

				//鼠标移入圆点
				$(numWrap).find("span").bind("mouseover", function() {
					console.log("鼠标移入");
						// 获得当前圆点索引
						_current = $(numWrap).find("span").index($(this));
						// 关闭滚动
						clearInterval(scrollTimer);
						scrollTimer = null;
						// 显示当前图片
						that.showme();
					})
					//鼠标移出圆点
				$(numWrap).find("span").bind("mouseout", function() {
					_current = $(numWrap).find("span").index($(this));
					// 计算下一个显示的图片索引
					if (_current == (len - 1)) {
						_current = 0;
					} else {
						_current = _current + 1;
					}
					            
					!scrollTimer && (scrollTimer = window.setInterval(function() {
						that.showme()
					}, that.options.interval))

				})
			}
		}

		//鼠标悬浮
		if (that.options.stoppable) {
			this.ele.hover(function() {
				if (scrollTimer) {
					clearInterval(scrollTimer);
					scrollTimer = null;
				}
			}, function() {
				//重新开始播放
				!scrollTimer && (that.showme(), scrollTimer = window.setInterval(function() {
					that.showme()
				}, that.options.interval))
			})
		}

	},
	/**
	 * 生成幻灯片骨架
	 */
	render: function() {
		this.ele.html($("<div id='_slide'><ul id='_slide_list' /></div>"));
		var htmlArr = [];
		var data = this.options.data;
		for (var i = data ? data.length : 0; i > 0; i--) {
			// 隐藏其他图片
			if (i !== 0) {
				htmlArr.push("<li class='_slide_list_item' style='display:none'></li>");
				continue;
			}
			htmlArr.push("<li class='_slide_list_item'></li>");
		}
		$("#_slide_list").append(htmlArr.join(""));
		var that = this;
		this.initSlideImage(0, data[0], function() {
			for (var i = 1; i < data.length; i++) {
				that.initSlideImage(i, data[i]);
			}
		});
	},
	/**
	* 优先载入第一张图
	*/
	initSlideImage: function(index, obj, callback) {
		if (typeof callback !== 'function') {
			callback = function() {};
		}
		var $img = $("<img />")
			.load(function() {
				//载入下一张图片
				callback();
			})
			// 配置URL
			.attr('src', obj.imgSrc);

		var $a = $("<a />")
			.attr('target', '_blank')
			.attr('href', obj.linkSrc && "javascript:void(0);")
			.append($img);

		// 将真实的图片拼接到轮播
		$("#_slide").find("li").eq(index).html($a);
	},
	/**
	 * 显示当前图片
	 */
	showme: function() {
		// 结束当前动画并停止队列里的动画
	
		var that = this;
		// this.$slideItems.eq(_current).find("b").stop(true, true).animate({
		// 	"bottom": "0"
		// }, 1000)
		// 隐藏其他图片
		this.$slideItems.eq(_current).siblings(this.options.repeatEle).stop(true, true).fadeOut(3000);
		// , function() {
				// 显示当前图片
			that.$slideItems.eq(_current).stop(true, true).fadeIn(3000);
			_current = _current + 1;
			_current = (_current < len) ? _current : 0;

			if (that.options.optional) {
				$(numWrap).find("span").eq(_current).addClass('current');
				$(numWrap).find("span").eq(_current).siblings().removeClass('current');
			}
		// });
		// this.$slideItems.eq(_current).siblings(this.options.repeatEle).find("b").animate({
		// 	"bottom": "-30px"
		// }, 1000);
		// 如果有圆点
		
		// 重新计算当前索引
		
	}
}

$.fn.slide = function(options) {
	$(this).each(function() {
		// 生成幻灯片
		return new Slide(this, options);
	});
}

$.fn.slide.defaults = {
	data: [],
	// 是否生成圆点
	optional: true,
	// 是否鼠标浮动到上去后停止播放
	stoppable: true,
	// 播放间隔时间
	interval: 3000,
	// 圆点ID
	numWrapId: '_slide_nums',
};