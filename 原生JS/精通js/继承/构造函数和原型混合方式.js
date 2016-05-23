function Cat() {
	Animal.call(this);
	//..
}

Cat.prototype = new Animal();
Cat.prototype.contructor = Cat;

