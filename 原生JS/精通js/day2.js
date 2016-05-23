//访问<html>元素
document.documentElement;
//模拟线程的js代码：错误代码
while(!window.loaded()){}//这个会阻塞其他所有操作，比如页面加载
document.getElementById("body").style.border = "1px solid #000";
//异步回调才是王道
window.onload = loaded;
function loaded () {
	//页面加载完执行某些操作
}
//事件捕获、冒泡
//事件对象：e || window.event(IE)
//阻止事件冒泡的通用函数
function stopBubble(e){
	if(e&&e.stopPropagation)//非ie浏览器
		e.stopPropagation();
	else 
		window.event.cancelBubble = true;
}
//阻止发生默认浏览器行为的通用函数
function stopDefault(e){
	if(e&&e.preventDefault)
		e.preventDefault;
	else //ie
		window.event.returnValue = false;
	return false;
}
//使用stopDefault()重载iframe页面
var iframe = document.getElementById('iframe');
var a = document.getElementsByTagName("a");
for(var i = 0;i<a.length;i++){
	a[i].onclick = function(e){
		iframe.src = this.href;
		return stopDefault(e);
	}
}
//事件绑定:非常重要要记住！！！
//传统方法
//缺点：只会在事件冒泡中运行，而非捕获和冒泡；一次只能绑定一个事件；事件对象IE浏览器不可用
document.getElementsByTagName("form")[0].onsubmit = function(e){
	return stopDefault();
}
//DOM绑定：W3C
//优点：支持捕获和冒泡两个阶段；可以绑定多个事件；事件对象都可以通过e获得；
//缺点：IE不支持
document.getElementsByTagName("form")[0].addEventListener('submit',function(e){
	return stopDefault(e);
},false);//false表示捕获，true表示冒泡
//DOM绑定：IE
//优点：可以绑定多个事件
//缺点：仅支持冒泡阶段；事件监听函数的this指向了window对象，而非当前元素；
//事件对象存在于window.event;事件必须以ontype命名，而非type;仅IE可用
document.getElementsByTagName("form")[0].attachEvent('onsubmit',function(){
	return stopDefault();
});
//绑定事件的标准方法:Dean Edwards编写addEvent和removeEvent
//绑定事件的标准方法的使用
addEvent(window,"load",function(){
	addEvent(document.body,"keypress",function(e){
		if(e.keyCode == 32 && e.ctrKey){//如果用户敲击空格+ctr键
			this.getElementsByTagName("form")[0].style.display = 'block';
			e.preventDefault();
		}
	});
})
//事件类型：
//鼠标事件；键盘事件；UI事件；表单事件；加载和错误事件
//静态定位：position:static  遵循文档流
//相对定位：位置还是遵循文档流 但是相对定位的元素会相对文档流的位置有偏移
//绝对定位: 不遵循文档流
//固定定位：position:fixed 相对窗口 无视滚动条脱离文档流

//获取元素的真实、最终的CSS样式属性值的函数
function getStyle(elem,name){//获取elem元素的name属性
	if(elem.style[name])//在元素的style属性设置了
		return elem.style[name];
	else if(elem.currentStyle)//使用IE的方法
		return elem.currentStyle[name];
	else if(document.defaultView && document.defaultView.getComputedStyle){//使用W3C的方法
		name = name.replace(/([A-Z])/g,"-$1");//text-align 转为使用的textAlign形式
		name = name.toLowerCase();
		var s = document.defaultView.getComputedStyle(elem,"");//获取样式对象
		return s && s.getPropertyValue(name);
	}else //用户使用的是其他浏览器
	 return null;	
}
//元素的CSS属性值不等于CSS文件设置的样式值
<html>
<head>
 <style> p {height:100px;}</style>
 <script>
   window.onload = function(){
   	  var p = document.getElementsByTagName("p")[0];
   	  alert(p.style.height + " should be null");
   	  alert(getStyle(p,"height")+" should be 100px");
   }
 </script>
</head>
<body>
  <p>I should be 100 pixels tall.</p>
</body>
</html>

//两个确定元素相对于整个文档的x和y位置的辅助函数
function pageX(elem){
	return elem.offsetParent ? elem.offsetLeft + pageX(elem.offsetParent) : elem.offsetLeft;
}
function pageY(elem){
	return elem.offsetParent ? elem.offsetTop + pageY(elem.offsetParent) : elem.offsetTop;
}

//确定元素相对父亲的位置的两个函数
function parentX(elem){
	return elem.parentNode == elem.offsetParent ? elem.offsetLeft : pageX(elem) - pageX(elem.parentNode);
}
function parentY(elem){
	return elem.parentNode == elem.offsetParent ? elem.offsetTop : pageY(elem) - pageY(elem.parentNode);
}

//获取元素的CSS位置
function posX(elem){
	return parseInt(getStyle(elem,"left"));
}
function posY(elem){
	return parseInt(getStyle(elem,"top"));
}

//设置元素x和y位置的函数
function setX(elem,pos){
	elem.style.left = pos + "px";
}
function setY(elem,pos){
	elem.style.top = pos + "px";
}

//调整元素相对于当前位置的距离的函数
function addX(elem,pos){
	setX(posX(elem)+pos);
}
function addY(elem,pos){
	setY(posY(elem)+pos);
}

//获取当前元素的高度和宽度：当元素隐藏或者以0像素开始的动画时获取不到正确的高度值
function getHeight(elem){
	return parseInt(getStyle(elem,'height'));
}
function getWidth(elem){
	return parseInt(getStyle(elem,'width'));
}

//查找元素完整的、可能的高度
function fullHeight(elem){
	if(getStyle(elem,'display')!='none')//如果元素是显示的，使用offsetHeight就能得到高度值，当offsetHeight不存在时，使用getHeight()方法
		return elem.offsetHeight || getHeight(elem);
	var old = resetCSS(elem,{//处理display为none的元素，重置css属性以获取更精确的读数
		display:'',
		visibility:'hidden',
		position:'absolute'
	});
	var h = elem.clientHeight || getHeight(elem);//如果有clientHeight属性直接返回，否则通过getheight方法
	restoreCSS(elem,old);//恢复css的原有属性
	return h;
}

//查找元素完整的、可能的宽度
function fullWidth(elem){
	if(getStyle(elem,'display')!='none')
		return elem.offsetWidth || getWidth(elem);
	var old = resetCSS(elem,{
		display:'',
		visibility:'hidden',
		position:'absolute'
	});
	var w = elem.clientWidth || getWidth(elem);
	restoreCSS(elem,old);
	return w;
}

//设置css一组属性的函数，它可以恢复到原有设置
function resetCSS(elem,prop){
	var old = {};
	for(var i in prop){
		old[i] = elem.style[i];//保存旧的值
		elem.style[i] = prop[i];//设置新的值
	}
	return old;//返回旧的值
}
//恢复css原有属性值
function restoreCSS(elem,prop){
	for(var i in prop)
		elem.style[i] = prop[i];
}

//设置元素透明度的函数
function setOpacity(elem,level){
	if(elem.filters)//如果存在filters属性，则它是IE
		elem.style.filters = 'alpha(opacity=' + level + ')';
	else 
		elem.style.opactiy = level / 100;
}

//短时间内增加高度逐步显示隐藏元素的函数
function slideDown(elem){
	elem.style.height = '0px';
	show(elem);//显示元素
	var h = fullHeight(elem);
	for(var i = 0; i <= 100; i += 5){//1s内执行20帧的动画
		(function(){//保证i值正确
			var pos = i;
			setTimeout(function(){
				elem.style.height = (pos/100)*h+"px";
			},(pos+1)*10);
		})();
	}
}
//短时间内增加透明度逐步显示隐藏元素的函数
function fadeIn(elem){
	setOpacity(elem,0);//从0透明度开始
	show(elem);
	for(var i = 0; i <= 100;i += 5){
		(function(){
			var pos = i;
			setTimeout(function(){
				setOpacity(elem,pos);
			},(pos+1)*10);
		})();
	}
}

//获取鼠标光标相对整个页面的当前位置
function getX(e){
	e = e || window.event;
	return e.pageX || e.clientX + document.body.scrollLeft;//非IE浏览器：e.pageX
}
function getY(e){
	e = e || window.event;
	return e.pageY || e.clientY + document.body.scrollTop;
}

//DOM-Drag库
var Drag = {
	obj:null,//被拖放的当前元素
	//o:作为拖放处理函数的元素
	//oRoot:被拖放的元素
	//minX,maxX,minY,maxY:坐标范围
	//bSwapHorzRef 
	init:function(o,oRoot,minX,maxX,minY,maxY,bSwapHorzRef,bSwapVertRef,fxMapper,fYMapper){
		o.onmousedown = Drag.start;
		
		o.hmode = bSwapHorzRef ? false:true;
		o.vmode = bSwapVertRef ? false:true;

		o.root = oRoot && oRoot != null ? oRoot : o;

	    if(o.hmode && isNaN(parseInt(o.root.style.left))){
	    	o.root.style.left = "0px";
	    }
	    if(o.vmode && isNaN(parseInt(o.root.style.top))){
	    	o.root.style.top = "0px";
	    }
	    if(!o.hmode && isNaN(parseInt(o.root.style.right)))
	    	o.root.style.right = "0px";
	    if(!o.vmode && isNaN(parseInt(o.root.style.bottom)))
	    	o.root.style.bottom = "0px"

	    o.minX = typeof minX != 'undefined' ? minX : null;
	    o.minY = typeof minY != 'undefined' ? minY : null;
	    o.maxX = typeof maxX != 'undefined' ? maxX : null;
	    o.maxY = typeof maxY != 'undefined' ? maxY : null;

	    o.xMapper = fxMapper ? fxMapper : null;
	    o.yMapper = fYMapper ? fYMapper : null;

	    o.root.onDragStart = new Function();
	    o.root.onDragEnd = new Function();
	    o.root.onDrag = new Function();

	},
	start:function(e){
		var o = Drag.obj = this;
		e =  Drag.fixE(e);

		//获取当前的x和y坐标
		var y = parseInt(o.vmode ? o.root.style.top : o.root.style.bottom);
		var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right);

		o.root.onDragStart(x,y);

		//记录鼠标的开始位置
		o.lastMouseX = e.clientX;
		o.lastMouseY = e.clientY;

		//如果使用的是CSS坐标系统
		if(o.hmode){
			if(o.minX != null) o.minMouseX = e.clientX - x + o.minX;
			if(o.maxX != null) o.maxMouseX = o.minMouseX + o.maxX - o.minY;
		}else{//传统数学坐标系统
			if(o.minX != null) o.maxMouseX = -o.minX + e.clientX + x;
			if(o.minX != null) o.minMouseX = -o.maxX + e.clientX + x;
		}

		//如果使用的是CSS坐标系统
		if(o.vmode){
			if(o.minY != null) o.minMouseY = e.clientY - y + o.minY;
			if(o.maxY != null) o.maxMouseY = o.minMouseY + o.maxY - o.minY;
		}else{//传统数学坐标系统
			if(o.minY != null) o.maxMouseY = -o.minY + e.clientY + y;
			if(o.minY != null) o.minMouseY = -o.maxY + e.clientY + y;
		}

		document.onmousemove = Drag.drag;
		document.onmouseup = Drag.end;

		return false;
	},
	drag:function(e){
		e = Drag.fixE(e);
		var o = Drag.obj;

		var ey = e.clientY;
		var ex = e.clientX;

		//获取当前的x和y
		var y = parseInt(o.vmode ? o.root.style.top : o.root.style.bottom);
		var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right);
		var nx, ny;

		//如果设置了x的最小值，则确保不要把它传递进去
		if(o.minX != null) ex = o.hmode ? Math.max(ex,o.minMouseX) : Math.min(ex,o.maxMouseX);

		if(o.maxX != null) ex = o.hmode ? Math.min(ex,o.maxMouseX) : Math.max(ex,o.minMouseX);

		if(o.minY != null) ey = o.vmode ? Math.max(ey,o.minMouseY) : Math.min(ey,o.maxMouseY);

		if(o.maxY != null) ey = o.vmode ? Math.min(ey,o.maxMouseY) : Math.max(ey,o.minMouseY);

		//得到经过转换的新的x和y坐标
		nx = x + ((ex - o.lastMouseX) * (o.hmode ? 1:-1));
		ny = y + ((ey - o.lastMouseY) * (o.vmode ? 1:-1)); 

		if(o.xMapper) nx = o.xMapper(y);
		else if(o.yMapper) ny = o.yMapper(x);

		//为元素设置新的x和y坐标
		Drag.obj.root.style[o.hmode?"left":"right"] = nx + "px";
		Drag.obj.root.style[o.vmode?"top":"bottom"] = ny + "px";

		Drag.obj.lastMouseX = ex;
		Drag.obj.lastMouseY = ey;

		Drag.obj.root.onDrag(nx,ny);
		return false;
	},
	end:function(){
		document.onmousemove = null;
		document.onmouseup = null;

		Drag.obj.root.onDragEnd(parseInt(Drag.obj.root.style[Drag.obj.hmode?"left":"right"]),
			parseInt(Drag.obj.root.style[Drag.obj.vmode?"top":"bottom"])
			);

		Drag.obj = null;
	},
	fixE:function(e){
		if(typeof e == 'undefined') e = window.event;//IE
		if(typeof e.layerX == 'undefined') e.layerX = e.offsetX;
		if(typeof e.layerY == 'undefined') e.layerY = e.offsetY;
		return e;
	}
}

//简单动画
$("#side").slideDown(1000,function(){
	$(this).slidUp(1000);
})
$("#body").hide("fast");

//Scriptaculous

//Lightbox，ThickBox

//制作图库
//在DOM中注入初始化的HTML并为每个元素绑定必要的事件处理器
var curImage = null;//跟踪记录当前所看的图片
window.onload = function(){
	/**	
	* 建立如下DOM结构
	* <div id="overlay"></div>
	* <div id="gallery">
	* 	<div id="gallery_image"></div>
	*   <div id="gallery_prev"><a href="">&laquo;Prev</a></div>
	*   <div id="gallery_next"><a href="">Next &raquo;</a></div>
	*   <div id="gallery_title"></div>
	* </div>
	**/

	var gallery = document.createElement('div');
	gallery.id = "gallery";

	gallery.innerHTML = 
		'<div id="gallery_image"></div>	'+
		'<div id="gallery_prev"><a href="">&laquo;Prev</a></div>'+
		'<div id="gallery_next"><a href="">Next &raquo;</a></div>'+
		'<div id="gallery_title"></div>';

	document.body.appendChild(gallery);

	id("gallery_next").onclick = nextImage;
	id("gallery_prev").onclick = prevImage;

	var g = byClass('gallery',"ul");

	for(var i=0;i<g.length;i++){
		var link = tag("a",g[i]);
		for(var j=0;j<link.length;j++){
			link[j].onclick = function(){
				showOverlay();//显示灰色背景覆盖层
				showImage(this.parentNode);//在图库内显示图片
				return false;//去掉a标签跳转
			}
		}
		addSlideShow(g[i]);//加入幻灯导航
	}
}
//创建覆盖层
var overlay = document.createElement("div");
overlay.id="overlay";
overlay.onclick = hideOverlay;
document.body.appendChild(overlay);
//隐藏和显示覆盖层
function hideOverlay(){
	curImage = null;//重置当前图片
	hide(id("overlay"));//隐藏覆盖层
	hide(id("gallery"));//隐藏图库
}
function showOverlay(){
	var over = id("overlay");
	over.style.height = pageHeight() + "px";//保持和页面一直的高度
	over.style.width = pageWidth()+"px";

	fadeIn(over,50,10);//渐隐出现隐藏层
}
//覆盖层的CSS
#overlay{
	background:#000;
	opacity:0.5;
	display:none;
	position:absolute;
	top:0px;
	left:0px;
	width:100%;
	height:100%;
	z-index:100;
	cursor:pointer;
	cursor:hand;
}
//显示图库当前图片
function showImage(cur){
	curImage = cur;
	var img = id("gallery_image");
	//如果存在当前图片则删除
	if(img.firstChild)
		img.removeChild(img.firstChild);
	//并用新图片取而代之
	img.appendChild(cur.firstChild.cloneNode(true));
	
	id("gallery_title").innerHTML = cur.firstChild.firstChild.alt;

	var gallery = id("gallery");

	//设置正确的class，这样才能显示恰当的尺寸
	gallery.className = cur.className;

	fadeIn(gallery,100,10);

	//确保图片在屏幕中的位置正确
	adjust();
}

//基于图片宽高和用户滚动的具体情况，重定位图库
function adjust(){
	var obj = id("gallery");
	if(!obj) return;
	var w = getWidth(obj);
	var h = getHeight(obj);
	//相对窗口垂直居中
	var t = scrollY() + (windowHeight()/2) - (h/2);
	if(t<0) t = 0;

	var l = scrollX() + (windowWidth()/2) - (w/2);
	if(l<0) l = 0;

	setY(obj,t);
	setX(obj,l);
};
window.onresize = document.onscroll = adjust;//用户滚动页面或者重置浏览器大小，重新调整图库的位置
//定位图库到正确位置上
#gallery{
	position:absolute;
	width:650px;
	height:510px;
	background:#FFF;
	z-index:110;
	display:none;
}
#gallery_title{
	position:absolute;
	bottom:5px;
	left:5px;
	width:100%;
	font-size:16px;
	text-align:center;
}
#gallery img{
	position:absolute;
	top:5px;
	left:5px;
	width:640px;
	height:480px;
	border:0px;
	z-index:115;
}
#gallery.tall{
	width:430px;
	height:590px;
}
#gallery.tall img{
	width:420px;
	height:560px;
}
//获取上一个图片并显示它
function prevImage(){
	showImage(prev(curImage));
	return false;
}
function nextImage(){
	showImage(next(curImage));
	return false;
}
if(!next(cur))
	hide(id("gallery_next"));
else
	show(id("gallery_next"));

#gallery_prev,#gallery_next{
	position:absolute;
	bottom:0px;
	right:0px;
	z-index:120;
	width:60px;
	text-align:center;
	font-size:12px;
	padding:4px;
}
#gallery_prev{
	left:0px;
}
#gallery_prev a,#gallery_next a{
	color:#000;
	text-decoration:none;
}
//增加用来初始化幻灯片的导航
function addSlidShow(elem){
	//创建幻灯片的头部和包裹元素
	var div = document.createElement("div");
	div.className = "slideshow";

	//显示幻灯片的名字
	var span = document.createElement("span");
	span.innerHTML = g[i].title;
	div.appendChild(span);

	//创建一个链接，可以把图库所有的图片都当做幻灯片中的一幕
	var a = document.createElement("a");
	a.href = "";
	a.innerHTML = "&raquo;View as a slideshow";

	//点击后开始幻灯
	a.onclick = function(){
		startShow(this.parentNode.nextSibling);
		return false;
	};

	//为页面插入新的导航和头部
	div.appendChild(a);
	elem.parentNode.insertBefore(div,elem);
}

//初始化幻灯
function startShow(obj){
	//定位到图库的每一张图片
	var elem = tag("li",obj);

	//定位到显示的整个图库
	var gallery = id("gallery");

	//遍历每一个匹配的图库图片
	for(var i=0;i<elem.length;i++)
		new function(){
			//记录被引用的当前图片
			var cur = elem[i];
			//我们每5s显示一张新图片
			setTimeout(function(){
				//显示指定的图片
				showImage(cur);
				//并在3.5秒后渐隐（因为需要有1s的渐隐时间）
				setTimeout(function(){
					fadeOut(gallery,0,10);
				},3500);
			},i*5000);
		};

	//隐藏全部
	setTimeout(hideOverlay,5000*elem.length);
	//但还是显示覆盖层，因为幻灯刚开始
	showOverlay();
}

//显示幻灯链接导航的css
div.slideshow{
	text-align:right;
	padding:4px;
	margin-top:10px;
	position:relative;
}
div.slideshow span{
	position:absolute;
	bottom:3px;
	left:0px;
	font-size:18px;
	font-weight:bold;
}
div.slidshow a{
	color:#000;
}



//ajax
//向服务器发送HTTP GET请求的跨浏览器方法
if(typeof XMLHttpRequest == "undefined"){
	XMLHttpRequest = function(){
		//IE使用ActiveXObject来创建新的XMLHttpRequest对象
		return new ActiveXObject(
				//IE5使用的XMLHTTP对象和IE6不同
				navigator.userAgent.indexOf("MSIE 5") >= 0 ? "Microsoft.XMLHTTP" : "Msxml2.XMLHTTP"
			);
	};
}

var xml = new XMLHttpRequest();
//初始化请求
xml.open("GET","/some/url.cgi",true);
//与服务器建立连接并发送数据
xml.send();

//将数据结构串形化兼容HTTP的参数模式
//输入：表单输入元素的数组；键/值对的散列表
function serialize(a){
	var s = [];
	if(a.constructor == Array){
		for(var i=0;i<a.length;i++)
			s.push(a[i].name + "=" +encodeURIComponent(a[i].value));
	}else{//键值对对象
		for(var j in a){
			s.push(j + "=" + encodeURIComponent(a[j]));
		}
	}

	return s.join("&");
}

//get请求
var xml = new XMLHttpRequest();
xml.open("GET","/some/url.cgi?"+serialize(data),true);
xml.send();

//MIME类型：
//post请求
var xml = new XMLHttpRequest();
xml.open("POST","/some/url.cgi",true);
xml.setRequestHeader("Content-Type","application/x-www-form-urlencoded");//发送串形化数据
//保证浏览器发送的数据的长度正确。基于Mozilla的浏览器有时处理这个会碰到问题
if(xml.overrideMimeType)
	xml.setRequestHeader("Connection","close");
xml.send(serialize(data));

















