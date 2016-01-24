/**
 * [插件：结合瀑布流、图片轮播的效果]
 * @param  {[type]} window [window对象]
 * @return {[type]}        [description]
 */
;(function  (window) {
	'use strict';
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
		// this._initEvents();
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

	//全局
	window.GridGallery = GridGallery;
})(window);