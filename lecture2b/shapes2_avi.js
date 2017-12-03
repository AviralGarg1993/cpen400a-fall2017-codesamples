var Point = {
	init: function(x, y){
		document.writeln('Initializing Point');
		this.x = x;
		this.y = y;
	},
	area: function() {
		document.writeln('Area: ' + 0);
	},
	toString: function(){
		document.writeln("x: " + this.x + " y: " + this.y);
	}
};

var Circle = Object.create(Point);
Circle.init = function (x, y, r) {
	Point.init.call(this, x, y);
	document.writeln('Initializing Circle');
	this.r = r;
};

Circle.area = function () {
	document.writeln('Area: ' + 3.14 * this.r * this.r);
}

Circle.toString = function () {
	document.writeln('x: ' + this.x + ' y: ' + this.y + ' r: ' + this.r);
}

var Ellipse = Object.create(Circle);
Ellipse.init = function(x, y, r, r2) {
	Circle.init.call(this, x, y, r);
	document.writeln('Initializing Ellipse');
	this.r2 = r2;
}

Ellipse.area = function (){
	document.writeln('Area: ' + 3.14 * this.r * this.r2);
}

Ellipse.toString = function () {
	document.writeln('x: ' + this.x + ' y: ' + this.y + ' r: ' + this.r + ' r2: ' + this.r2);
}

var p = Point;
p.init(1,2);
p.area();
p.toString();
document.writeln('');

var c = Circle;
c.init(1,2,3);
c.area();
/*
delete c.area;
c.area(); // incorrect area (this become the area of Point after deleting c.area)
*/
c.toString();
document.writeln('');

var e = Ellipse;
e.init(1,1,1,2);
e.area();
e.toString();
document.writeln('');
document.writeln('');
document.writeln('');
iterateOverProperties(e);

/* 
 * Iterates over the properties of a given
 * object, and identify those properties that it inherited from its
 * prototype AND overrode it with its own values
 * 
 * Doesn't consider the functions
 */ 
function iterateOverProperties(obj) {
	var p;
	console.log(obj);
	for(p in obj){
		if(typeof(obj[p]) != "function" && 
			p in Object.getPrototypeOf(obj) ){
			document.writeln('Property Name:' + p);
			document.writeln('Property Value: ' + obj[p]);
		}
	}
}