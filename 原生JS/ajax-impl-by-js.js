function loadXMLDoc() {
    var xmlhttp;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
    	switch(xmlhttp.readyState) {
    		case 0://请求未初始化
    		break;
    		case 1://服务器连接已建立
    		break;
    		case 2://请求已接受
    		break;
    		case 3://请求处理中
    		break;
    		case 4://请求已完成 响应已就绪
    		break;
    		default:
    		break;
    	}
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", "/ajax/test1.txt", true);
    xmlhttp.send();
}