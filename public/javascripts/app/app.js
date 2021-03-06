var App = function () {
	var self = {};
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');
	self.initialize = function () {
		listenToMouse();
		listenToRedraw();
	};
	var listenToMouse = function () {
		canvas.addEventListener("mousedown", function (e) {
			canvas.addEventListener("mousemove", function (evt) {
				var mousePos = getMousePos(canvas, evt);
				var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
				drawCircle(mousePos.x, mousePos.y);
				socket.emit("draw", {x: mousePos.x, y: mousePos.y});
			}, false);
		}, false);
	};

	var listenToRedraw = function () {
		socket.on("redraw", function (data) {
			drawCircle(data.x, data.y);
		});
	};

	var drawCircle = function (x, y) {
		context.beginPath();
		context.arc(x, y, 1, 0, 2 * Math.PI, false);
		context.fillStyle = 'green';
		context.fill();
		context.lineWidth = 5;
		context.strokeStyle = '#003300';
		context.stroke();
	};

	var getMousePos = function (canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		return {
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top
		};
	};

	return self;
};

var app = new App();
app.initialize();
