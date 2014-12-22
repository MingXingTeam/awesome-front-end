/**
 * [插件：结合瀑布流、图片轮播的效果]
 * @param  {[type]} window [window对象]
 * @return {[type]}        [description]
 */
;(function  (window) {
	'use strict';

	//对于显示前后的图很重要
	var docElem = window.document.documentElement,
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = {
			transitions : Modernizr.csstransitions,
			support3d : Modernizr.csstransforms3d
		};

	/**
	 * [GridGallery 构造函数]
	 * @param {[type]} el      [CSS选择器]
	 * @param {[type]} options [配置项]
	 */
	function GridGallery(el,options) {
		this.el = el;
		//获得自己的默认配置
		this.options = _Utils.extend({},this.options);
		//将默认配置和用户配置合并（用户配置会）
		_Utils.extend( this.options, options );
		this._init();
	}
	/**
	 * [options 默认配置]
	 * @type {Object}
	 */
	GridGallery.prototype.options = {};
	/**
	 * [_init 初始化]
	 * @return {[type]} [description]
	 */
	GridGallery.prototype._init = function(){
		//获取瀑布流相关信息
		//选择ul （>表示只选择儿子辈的）
		this.grid = this.el.querySelector( 'section.grid-wrap > ul.grid' );
		//选择所有li
		this.gridItems = [].slice.call( this.grid.querySelectorAll( 'li:not(.grid-sizer)' ) );
		//li的个数
		this.itemsCount = this.gridItems.length;
		//获取轮播相关信息
		//选择ul
		this.slideshow = this.el.querySelector( 'section.slideshow > ul' );
		//选择所有li
		this.slideshowItems = [].slice.call( this.slideshow.children );
		//当前轮播的图片的索引值
		this.current = -1;
		//轮播的按键（前一张、后一张、关闭）
		this.ctrlPrev = this.el.querySelector( 'section.slideshow > nav > span.nav-prev' );
		this.ctrlNext = this.el.querySelector( 'section.slideshow > nav > span.nav-next' );
		this.ctrlClose = this.el.querySelector( 'section.slideshow > nav > span.nav-close' );
		//初始化瀑布流
		this._initMasonry();
		//初始化事件
		this._initEvents();
	}

	/**
	 * [_initMasonry 生成瀑布流]
	 * @return {[type]} [description]
	 */
	GridGallery.prototype._initMasonry = function() {
		var grid = this.grid;
		imagesLoaded( grid, function() {
			new Masonry( grid, {
				itemSelector: 'li',
				//行宽
				columnWidth: grid.querySelector( '.grid-sizer' )
			});
		});
	};


	GridGallery.prototype._initEvents = function() {
		var self = this;
		//forEach是js的遍历函数。each是jQuery的。
		this.gridItems.forEach(function(item,idx) {
			//addEventListener是js的监听函数
			item.addEventListener('click',function() {
				// alert(idx);
				//打开轮播视图
				self._openSlideshow( idx );
			})
		})
	};

	GridGallery.prototype._openSlideshow = function(pos) {
		this.isSlideshowVisible = true;
		this.current = pos;
		//增加一个类
		classie.addClass(this.el,"slideshow-open");
		//设置当前图片、上一张图片、下一张图片的索引
		this._setViewportItems();
		//
		classie.addClass( this.currentItem, 'current' );
		classie.addClass( this.currentItem, 'show' );

		//显示图片前后的图标
		if( this.prevItem ) {
			classie.addClass( this.prevItem, 'show' );
			var translateVal = Number( -1 * ( getViewportW() / 2 + this.prevItem.offsetWidth / 2 ) );
			setTransform( this.prevItem, support.support3d ? 'translate3d(' + translateVal + 'px, 0, -150px)' : 'translate(' + translateVal + 'px)' );
		}
		if( this.nextItem ) {
			classie.addClass( this.nextItem, 'show' );
			var translateVal = Number( getViewportW() / 2 + this.nextItem.offsetWidth / 2 );
			setTransform( this.nextItem, support.support3d ? 'translate3d(' + translateVal + 'px, 0, -150px)' : 'translate(' + translateVal + 'px)' );
		}

	};
	/**
	 * [_setViewportItems 设置当前图片、上一张图片、下一张图片的索引]
	 */
	GridGallery.prototype._setViewportItems = function() {
		this.currentItem = null;
		this.prevItem = null;
		this.nextItem = null;

		if( this.current > 0 ) {
			this.prevItem = this.slideshowItems[ this.current - 1 ];
		}
		if( this.current < this.itemsCount - 1 ) {
			this.nextItem = this.slideshowItems[ this.current + 1 ];
		}
		this.currentItem = this.slideshowItems[ this.current ];
	};
	function setTransform( el, transformStr ) {
		el.style.WebkitTransform = transformStr;
		el.style.msTransform = transformStr;
		el.style.transform = transformStr;
	}
	//对于显示前后的图很重要
	function getViewportW() {
		var client = docElem['clientWidth'],
			inner = window['innerWidth'];
		
		if( client < inner )
			return inner;
		else
			return client;
	}
	//全局
	window.GridGallery = GridGallery;
})(window);