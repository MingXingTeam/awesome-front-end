var houses = document.getElementById('houses')
var s = houses.getBBox();

console.log( s )

var newView = "" + s.x + " " + s.y + " " + s.width + " " + s.height;

var foo = document.getElementById("foo")
foo.setAttribute("viewBox", newView);

