var express = require('express'),
		http = require('http'),
		path = require('path');

var app = express();
var server = http.createServer(app);
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ server: server });
var colors = ['red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange'];
var avatars = [
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWyHJQyRwJzYTaGpEzkapEpVTR5U83tcOvBtv_w2kf_I3MmrNn',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrqNlgUdqh6vrVACSwCosG8G_qfzSvJj7PZfbT4IynOz2GQGgRRg',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxo4Ru21Hhn05jOn4vljv2OM9edqwqMc5fzSanyCsYcLamztTTLw',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRosgdzE9m-4no7-sux3XckVVHBVK-7msXJEBIYAhyzb4mEpQgfVA',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR6O3HU9DJ-0vqJDJ57mwLAakyfacTcPBOffs2oVZWgh8wLq-3',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT57jjI2Ddj9h-_fzRuLFm-KZFxORAKhYuckKGkbd3am0QqlxfDDw',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGExYcORPxiQQiGBXF45pLr-uFQk298ECNhbOdCOON3jOAMULQ'
];


colors.sort(function(a, b) {
	return Math.random() > 0.5;
});
avatars.sort(function(a, b) {
	return Math.random() > 0.5;
});
var clients = [];
var online = [];
var messages = [];

wss.on('connection', function(ws) {
	clients.push(Object.assign(ws, { userID: Date.now() }));
	var userName = false;
	var userColor = false;
	var avatar = false;

	ws.on('message', function(msg) {
		if (!userName) {
			userName = msg;
			userColor = colors.shift();
			avatar = avatars.shift();

			for (var i = 0; i < clients.length; i++) {
				if (clients[i].userID === ws.userID ) continue
				clients[i].send(JSON.stringify({ type: 'connected_new_user', userId: ws.userID, userName, avatar}));
			}

			// отправить список пользователей онлайн и старые сообщения с чата новому пользователю
			online.push({userId: ws.userID, userName, avatar});
			ws.send( JSON.stringify({ type: 'online', data: online}) );
			ws.send( JSON.stringify({ type: 'old_messages', data: messages}) )

		} else {

			var obj = {
				time: (new Date()).toLocaleString(),
				text: msg,
				author: userName,
				color: userColor
			};
			var json = JSON.stringify({ type: 'message', data: obj });
			for (var i = 0; i < clients.length; i++) {
				clients[i].send(json);
			}

			messages.push(obj);
		}

	});
	ws.on('close', function() {
		var index = clients.indexOf(ws);

		clients.splice(index, 1);
		online.splice(index, 1);

		if (userName !== false && userColor != false) {
			colors.push(userColor);
		}

		var json = JSON.stringify({ type: 'disconnected_user', userId: ws.userID });
		for (var i = 0; i < clients.length; i++) {
			clients[i].send(json);
		}

	});

});

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
});

app.configure('development', function() {
	app.use(express.errorHandler());
});

server.listen(app.get('port'), function() {
	console.log("Express server listening on port " + app.get('port'));
});