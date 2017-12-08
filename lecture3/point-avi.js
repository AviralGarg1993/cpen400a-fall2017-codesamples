/*
 * Emulate the new operator through a function new using
Object.create and Function.apply. Add this function to the
Point class and not through the Point’s prototype as it must
be called on the class itself and not over a specific instance.
This should not duplicate the constructor’s code, but invoke it.

You can access arguments of a function in the array arguments
from within the function (variadic arguments - see later in this
presentation).

To call this function, you’d write code like:
var p1 = Point.new(2, 5);
var p2 = Point.new(3 ,7);

*/

function Point(x,y) {
	this.x = x; 
	this.y = y;
};

Point.new = function(x, y) {
		var newPointObj = Object.create(Point.prototype);
		Point.apply(newPointObj, arguments);
		return newPointObj;
}


// test
var p1 = Point.new(2, 5);

// how it should be
var p2 = new Point(3 ,7);

console.log(p1);
console.log(p2);


var addAll = function () {
	var p = new Point(0,0);
	for(var i=0;i<arguments.length; i++){
		var point = arguments[i];
		if (Object.getPrototypeOf(point)!= this) {
			throw {
				name: TypeError,
				message: "Object" + point + "is not of type Point!!",
				result: p
			};
		}
		p.x = p.x + point.x;
		p.y = p.y + point.y;		
	}
	return p;
}



var add = function(p1, p2) {
	return new Point(p1.x + p2.x, p1.y + p2.y);
};

var add2 = function(p1, p2) {
	var res = Object.create(this);
	res.x = p1.x + p2.x;
	res.y = p1.y + p2.y;
	return res;
};

var res1 = add(p1, p2);
console.log(res1);
document.writeln( "Add of p1 and p2 = res1 =  " + res1 ); 

var Points = [ p1, p2 ];
var res2 = add2.apply( Object.getPrototypeOf(p1), Points);
console.log(res2); 
document.writeln("Add2 of p1 and p2 = res2 = " + res2);

var res3 = add2.call( Object.getPrototypeOf(p1), p1, p2 );
console.log(res3); 
document.writeln("Add2 of p1 and p2 = res3 = " + res3);

var res4 = addAll.call( Object.getPrototypeOf(p1), p1, p2, res1, res2, res3);
console.log(res4); 
document.writeln("AddAll of p1,p2, res1, res2 and res3 = res4 = " + res4);

try {
	var res5 = addAll.call( Object.getPrototypeOf(p1), p1, p2, "notapoint", res2, res3);
} catch (e) {
	document.writeln(e.name + " : " + e.message);
	res5 = e.result;
};
console.log(res5); 


function filter(arr, f){
	var newArr = [];
	for(var a in arr)
		if(f(a)) newArr.push(a);
	return newArr;
}

function lesserThan(){
	return a < b;
}