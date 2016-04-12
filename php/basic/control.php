<?php

$i = 0;
while(++$i) {
	switch($i) {
		case 5:
		 echo "At 5 <br/> \n";
		 break 1;//跳出switch
		case 10: 
		  echo "At 10";
		  break 2;//跳出while
		default:
		  break;
	}
}

?>