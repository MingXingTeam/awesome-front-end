<?php


//--------------require include

//--------------global:使用外部变量
$a = 12;
function gol() {
	global $a;//
	$a += 40;
}

gol();
echo $a;

//---------------unset函数:销毁某一个变量
$a = 100;
unset($a);
// echo $a;

//------------------&
$a = 10;
function change(&$b) {
	$b = 20;
}
change($a);
echo "<br/>".$a;


?>