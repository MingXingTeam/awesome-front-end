<?php
	//------------定义数组
	$arr[0] = 10;
	$arr[1] = 100;
	$arr[2] = 12;

	for($i=0; $i<count($arr);$i++) {
		echo $arr[$i].'<br/>';
	}

	//-------------用括号定义数组
    $arr = array(1,2,3,4);
    for($i=0;$i<count($arr);$i++) {
    	echo $arr[$i],'<br/>';
    }

    //-----------自定义key,遍历
    $arr1["hello"]="hello";
    $arr1['hsp']=2;
    $arr1['bei']=1.02;
    foreach($arr1 as $key=>$value) {
    	echo $key.'='.$value.'<br/>';
    }

    //--------------
    $arr3=array(5=>'hello',5,'b'=>6,7);
    foreach($arr3 as $key=>$value) {
    	echo $key.'='.$value.'<br/>';
    }

    //-----------数组函数
    //------------explode拆分字符串
    $string="we are what we think";
    $arr=explode(' ', $string);
    print_r($arr);

    //-----------unset：删除某个键，但数组不会重新建索引
    $arr7 = array(5,6,8,9);
    print_r($arr7);
    unset($arr7[2]);
    echo '<br/>';
    print_r($arr7);

    //--------------数组运算符：有相同键不会覆盖
    $a = array("a"=>"apple", "b"=>"banana");
    $b = array("a"=>"pear", "b"=>"strawberry", "c"=>"cherry");

    $c = $a + $b;
    var_dump($c);
?>