//多个变量引用同一个对象
var obj = new Object();
var objRef = obj;
obj.oneProperty = true;
alert(obj.oneProperty === objRef.oneProperty);
//自修改对象
//引用只能指向具体的对象，不能是另一个引用
var items = new Array("one","two","three");
var itemsRef = items;
items.push("four");
alert(items.length===itemsRef.length);
//修改对象的引用
var items = new Array("one","two","three");
var itemsRef = items;
items = new Array("new","array");
alert(items!=itemsRef);
//修改对象而生成新对象：出乎我的意料。
var item = "test";
var itemRef = item;
item += "ing";
alert(item!=itemRef);
//函数重载
function sendMessage (msg,obj) {
	if(arguments.length==2)
		obj.handleMsg(msg);
	else 
		alert(msg);
}
sendMessage("Hello,World!");
sendMessage("How are you",{
	handleMsg:function  (msg) {
		alert("This is a custom message: "+msg);
	}
});
function makeArray(){
	var arr=[];
	for(var i = 0; i< arguments.length;i++){
		arr.push(arguments[i]);
	}
	return arr;
}
function displayerror(msg){
	if(typeof msg == 'undefined'){
		msg = "An error occurred.";
	}
	alert(msg);
}
//类型检查
if(typeof num == "string"){
	num = parseInt(num);
}
if(typeof arr == "string"){
	arr = arr.split(",");
}

if(num.constructor==String){//这个方式比较好！！
	num = parseInt(num);
}
if(str.constructor==Array){
	str = str.join(',');
}
function strict(types,args){
	if(types.length!=args.length){
		throw "Invalid number of arguments. Expected "+types.length+", received "+args.length+" instead.";
	}
	for(var i = 0;i<args.length;i++){
		if(args[i].constructor!=types[i]){
			throw "Invalid argument type. Expected "+type[i].name+", received "+args[i].constructor.name+" instead.";
		}
	}
}
function userList(prefix,num,users){
	strict([String,Number,Array],arguments);
	for(var i=0;i<num;i++){
		print(prefix+": "+users[i]);
	}
}
//作用域
//作用域是由函数划分的，不是按照块划分的。这是基本的概念，记牢了！！！
var foo = "test";
if(true){
	var foo = "new test";
}
alert(foo=="new test");
function test(){
	var foo = "old test";
}
test();
alert(foo=="new test");
//全局作用域和window对象
var test = 'test';
alert(window.test==test);
//隐式全局作用域的变量声明
function test(){
	foo = "test";
}
test();
alert(window.foo == "test");
//闭包
//闭包使代码更清晰
var obj = document.getElementById("main");
obj.style.border = "1px solid red";
setTimeout(function(){
	obj.style.display = 'none';//引用全局obj,糟糕的设计？
},1000);

// function delayHide(obj){
// 	setTimeout(function(){
// 		obj.style.display='none';
// 	});
// }
// delayHide(obj);

function delayedAlert(msg,time){//解决方法
	setTimeout(function(){
		alert(msg);
	},time);
}
delayedAlert("Welcome!",2000);
//用闭包实现函数Curry化
function addGenerator(num){
	return function(toAdd){
		return num + toAdd;
	};
}
var addFive = addGenerator(5);
alert(addFive(4)==9);
//使用匿名函数隐藏全局作用域变量的例子。这个用法非常有用。记住了！！
(function(){
	var msg = "Thanks for visiting!";//原本是全局的
	window.onunload = function(){
		alert(msg);
	};
})();
//闭包允许引用父函数中的变量，但是引用到的值是父函数范围的最终值
//使用匿名函数来激发出创建多个使用闭包的函数所需的作用域：非常有用！！！！
var obj = document.getElementById("main");
var items = ["click","keypress"];
for(var i = 0;i<items.length;i++){
	// var item = items[i];
	// obj["on"+item] = function(){
	// 	alert("Thanks for your "+item);//闭包引用父函数的item，但是item为最终值，不符合本意
	// }

	(function(){//使用一个自执行的匿名函数激发出作用域
		var item = items[i];//记住在这个作用域内的值
		obj["on"+item]=function(){
			alert("Thanks for your "+item);//item引用for循环上下文所属作用域中的一个父变量
		}

	})();
}
//在上下文对象内使用函数并将上下文对象切换为另一个变量
var obj = {
	yes:function(){
		this.val = true;
	},
	no:function(){
		this.val = false;
	}
};
alert(obj.val == null);//obj对象没有val属性
obj.yes();//执行了yes函数后，将val属性和'obj'对象关联
alert(obj.val == true);
window.no = obj.no;
window.no();
alert(obj.val==true);//obj对象的val不变，因为no的上下文已经改变为window对象了
alert(window.val==false);//window的val属性被更新了
//用apply和call方法使上下文问题更好理解。要经常用这个，增加代码可阅读性！！！！
function changeColor(color){
	this.style.color = color;
}
changeColor("white");//因为window对象没有style属性，调用失败
var main = document.getElementById("main");
changeColor.call(main,"black");//main作为上下文，上下文可以是任何东西
function setBodyColor(){
	changeColor.apply(document.body,arguments);
}
setBodyColor("black");
//创建对象并设置属性
var obj = new Object();
obj.val = 5;
obj.click = function(){
	alert("hello");
}
var obj = {//这个方式比上面的方式好多了
	val:5,
	click:function(){
		alert("hello");
	}
}
//创建对象
function User(name){
	this.name = name;
}
var me = new User("My name");
alert(me.name == "My name");
alert(me.constructor==User);//类型检查 “string”.constructor == String
User("Test");
alert(window.name=="Test");
//使用constructor属性
function User(){}
var me = new User();
var you = new me.constructor();//创建新的User对象，用前一个对象的constructor引用来创建
alert(me.constructor==you.constructor);
//公共方法：通过prototype对象添加
function User(name,age){
	this.name = name;
	this.age  = age;
}
User.prototype.getName = function(){
	return this.name;
}
User.prototype.getAge = function(){
	return this.age;
}
var user = new User("Bob",44);
alert(user.getName()=="Bob");
alert(user.getAge()==44);
//私有方法。概念记住了！！
function Classroom(students,teacher){
	function disp(){//私有
		alert(this.name.join(", "));
	}
	this.students = students;
	this.teacher = teacher;
	disp();
}
var class = new Classroom(["John","Bob"],"Mr.Smith");
class.disp();//调用失败
//特权方法。概念记住了！！
function User(name,age){
	var year = (new Date().getFullYear()-age);
	this.getYearBorn = function(){//特权方法
		return year;
	}
}
var user = new User("Bob",44);//创建对象时生成特权方法
alert(user.getYearBorn()==1962);
alert(user.year==null)//无法访问year
//动态生成方法:根据运行时变量生成代码。很牛逼的特性！！
function User(properties){
	for(var i in properties){
		(function(which){
			var p = i;
			which["get"+p] = function(){
				return properties[p];
			};
			which["set"+p] = function(val){
				properties[p]=val;
			};
		})(this);
	}
}
var user = new User({
	name:"Bob",
	age:44
});

alert(user.name==null);//name属性不存在
alert(user.getname()=="Bob");
user.setage(22);
alert(user.getage()==22);
//静态方法。记住该用法！！
User.cloneUser = function(user){
	return new User(user.getName(),user.getAge());
}


//原型链继承
function Person(name){
	this.name = name;
}
Person.prototype.getName = function(){//给Person对象添加一个方法
	return this.name;
}
function User(name,password){
	this.name = name;
	this.password = password;
}
User.prototype = new Person();//User对象继承所有Person对象的方法
User.prototype.getPassword = function(){
	return this.password;
}
//类式继承

//命名空间
var YAHOO = {};//命名空间
YAHOO.util = {};//子命名空间
YAHOO.util.Event = {//最终的命名空间
	addEventListener:function({...})
};
YAHOO.util.Event.addEventListener)(...);//调用某个命名空间的函数

//每次对false进行比较时，用!==或者===
null == false;//true
0 == undefined;//true
null !== false;//true
false === false;//true

//所有语句后面加上分号：避免压缩时出错







































































