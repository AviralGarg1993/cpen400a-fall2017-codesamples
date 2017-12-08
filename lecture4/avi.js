function invokeTimes(func, noTimes, time) {
	/*
	for (var i = 0; i < noTimes; ++i) {
		var timeoutHandler = function (count) {
			return function() {
				func(count);
			}
		};

		setTimeout(timeoutHandler(i), time * i);
	}
	*/
	var intervalHandler = function(count){
		return function(){
			console.log('called');
			if(count>0) {
				//console.log('here: ');
				func(--count);
			}
			else {
				console.log('else');
				clearInterval(setInt);
			}
		}
	}
	
	var setInt = setInterval(intervalHandler(noTimes), time);

}
var setup = function () {
	invokeTimes(function(i){console.log("hello" + i);}, 10, 1000);
}

setup();