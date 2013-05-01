var App = function () {
	var self = {};
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');

	canvas.addEventListener("mousemove", function (evt) {
			var mousePos = getMousePos(canvas, evt);
			var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
			writeMessage();
	}, false);

	function getMousePos(canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		return {
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top
		};
	}

	return self;
};
