//case 1
var slice = [].slice;
slice.call([1,2,3],2);//3

Array.slice.call([1,2,3],2);//3
//Array['slice'].call([1,2,3],2)

function Test(a,b){
	var otherArgues = [].slice.call(arguments,2);
}

//case 2
(function() {
	var local = "this is local";

	nonLocal = "this is non local";
})();

typeof nonLocal == 'string'//true

//case 3
Array.prototype.clear = function() {
	this.length = 0;
	return this;
}

Array.prototype.clone = function() {
	return this.concat();//返回一个新数组
}

[1,2,"aa"].clone().clear().length == 0//true

//case 4
var delegate = { 'a': '12' };
var obj = Object.create(delegate, { 'c': {value: '333'} });
alert(obj.a);//12
delegate.a = 2222;
alert(obj.a);//2222

//case 5
//js class
function Contruct(config) {
	this.config = config;
	if(this.config.flag) {
		//do somegthing
	}
}
var obj = new Contruct({ flag: false });

function factory(config) {
	return function() {
		if(config.flag) {
			//do something
		}
	}
}
var obj2 = factory( { flag:false });

//case 6
//all is mutable
var obj = {
	a: 12
}
obj.a = "asdf";
//运行时创建属性
obj.b = "ss";
//删除属性
delete obj.a;
console.log(obj.a)//undefined

//case 6
//所有对象都像一个map
var obj = {
	a: 12
}

obj.a === obj["a"];

Array['forEach'].call([], function() {

})

//case 7
//new Array

//创建长度为1的数组
// var b =  new Array(1);
// console.info(b.length);//1

// console.info([].join("me"));//
// var aa = [];
// aa.length = 12;
// console.info(aa.join("me"));//mememememememememememe

String.prototype.times = function(count) {
  return count < 1 ? '' : new Array(count + 1).join(this);
}

console.log('me'.times(10));

//case
//if(x)
if("potato"){
	"potatao" == true //false
}

//case
console.info(undefined == null);//true

//case
var a = 12;
var b = new Function("alert(a)");
console.info(b());

//case
var a = [12,2,3,4,5];
a.splice(2, 1);//3
console.info(a);//[12,2,4,5]

//case
var a = [12,3];
a.unshift(4);
console.info(a);//[4,12,3]
a.shift(4);
console.info(a);//[12,3]








