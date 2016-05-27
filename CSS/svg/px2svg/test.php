<html>
<head>
<title>Some examples</title>
<style type="text/css">
div {padding: 1em; border-bottom: 1px dotted silver;}
svg {margin: 0 1em;}
</style>
</head>

<body>
<?php
require 'Converter.php';
use Px2svg\Converter;
echo "\n<div>\n<img src='aa.png'>\n";
$converter = new Converter();
$converter->loadImage('aa.png');
$converter->setThreshold(255);
$res = $converter->generateSVG();
echo $res;
echo "\n</div>\n";

?>
</body>
</html>