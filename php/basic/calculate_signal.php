<?php
	//------------------
	$a = 2;
	$b = 2.0;
	if($a === $b) {
		echo "类型相等";
	} 

	if($a == $b) {
		echo "<br/>数值相等";
	}

	//------------------
	$a = true && false;
	$b = true and false;
	var_dump($a, $b);
	echo "<br/>";
	$a = false || true;
	$b = false or true;
	var_dump($a, $b);


	//------------------将两端的值都当做是字符串来处理  把他们连接起来
	$a = 1.2;
	$b = 31;
	echo $a.$b;
?>