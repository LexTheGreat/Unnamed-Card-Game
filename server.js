var express = require('express'),
	http = require('http'),
	cardmanager = require('./cardmanager'),
	app = express();
var webenable = true

if (!webenable) {
	var server = 3232;
	console.log('[SOCKET] Useing port: ', 3232);
} else {
	app.use(express.static(__dirname + '/public'));
	var server = http.createServer(app).listen(3232);
	console.log('[SOCKET/WEB] Useing port: ', 3232);
}

var World = require('./world'),
	world = new World();
var io = require('socket.io'),
	io = io.listen(server);


io.sockets.on('connection', function(socket) {
	var player = world.login(socket.id);
		// success info warn error
	socket.emit('connected', socket.id);
	socket.emit('notify', { message:'Connected', type:'success' });
	
	player.drawCard();
	player.drawCard();
	player.drawCard();
	player.drawCard();
	player.drawCard();
	
	socket.on('drawCard', function(data) {
		if(player.Hand.length < 5 && player.Deck.length > 0 && world.Turn == player.Turn) {
			player.drawCard();
		} else {
			socket.emit('notify', { message:'Full hand', type:'warn' });
		}
	});
	
	socket.on('placeCard', function(data) {
		if(world.Turn == player.Turn) {
			if(player.Hand[data]){
				player.placeCard(data);
			}
		}
	});
	
	socket.on('useCard', function(data) {
		if(world.Turn == player.Turn) {
			if(player.Field[data]){
				// Replace with something else just remove card for now ------------------- Todo
				player.removeCard(data);//, field, hand)
			}
		}
	});
	
	socket.on('endTurn', function(data) {
		if(world.Turn == player.Turn) {
			world.Turn = !world.Turn
		}
	});
	
	socket.on('name', function(data) {
		player.updateName(data);
	});
	
	socket.on('disconnect', function() {
		io.sockets.emit('notify', { message:'Player left', type:'info' });
		world.logout(socket.id);
	});
});

world.start(function(worldState) {
	io.sockets.clients().forEach(function(socket) {
		if(worldState.id != socket.id) {
			delete worldState.handData
		}
		socket.emit('update', worldState);
	});
});
io.set("log level", 1);