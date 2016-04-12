<?php
//-----定义类
class person {
	public $name;
	public $age;
}

$person1 = new person();
$person2 = new person;


$person1->name = "小明";
$person1->age = 12;

print_r($person1);

//------------

function test($p){
	 $p->name='tom';
	 $p->age=30;
}

test($person1);

print_r($person1);

//-----------数组传递
$a1 = array(1,2,3,4);
$a2 = array(2,3,4,5);
$arr = array($a1, $a2);
echo "<br />";
print_r($arr);

//------------构造函数和析构函数 $this 静态变量

class cat {
	public $name;
	public $age;
	public static $num = 0;
	public static $ifee=0;

	public function __construct($nam,$ag){
		$this->name = $nam;
		$this->age = $ag;
		//在类内部调用静态变量使用 self::$静态变量名 或者 类名::$静态变量名
		self::$num += 1;
		echo $this->name.'的年龄为:'.$this->age.'<br/>';
	}

	function __destruct() {
		echo '<br/>'.$this->name.'被销毁'."<br/>";
	}

	public static function pay($fee) {
		self::$ifee += fee;
	}

	//输出静态属性
	public static function echofee(){
		echo '<br/>总的学费为'.self::$ifee;
	}

	public function test1() {
		echo "<br/>hello world";
	}
}

$cat1 = new cat('Tom', 20);

//在类外访问静态变量 只能使用 类名::$静态变量名
echo cat::$num;

cat::echofee();

$cat1->test1();


?>