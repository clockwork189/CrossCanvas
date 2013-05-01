/**
 * Module dependencies.
 */
var express = require("express"),
	routes = require("./routes"),
	swig = require("swig"),
	http = require("http"),
	cons = require("consolidate"),
	socket = require("socket.io"),
	fs = require("fs"),
	path = require('path');

var app = express();
var server = http.createServer(app);
var io = socket.listen(server, { log: false});


// This helps it know where to look for includes and parent templates
swig.init({
    root: __dirname + '/views',
    cache: false,
    filters: {
		jsonify: function (input) { return JSON.stringify(input); }
	},
    allowErrors: true // allows errors to be thrown and caught by express instead of suppressed by Swig
});

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.engine('html', cons.swig);
	app.set('view engine', 'html');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('your secret here'));
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(app.router);
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

app.get('/', routes.index);
io.sockets.on("connection", function (socket) {
	socket.on('draw', function (data) {
		socket.broadcast.emit("redraw", data);
	});
});

server.listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});
