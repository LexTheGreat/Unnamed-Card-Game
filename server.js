var express = require('express'),
	http = require('http'),
	cardmanager = require('./cardmanager'),
	app = express();
	fs = require('fs')
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
	
	socket.on('message', function(data) {
		var tempName = player.Name + ': ' + data
		socket.broadcast.emit('message', tempName)
	});
	
	socket.on('requestRule', function(data) {
		var tempRules = fs.readFileSync('Gamerule.html','utf8')
		socket.emit('rule', tempRules);
	});
	
	socket.on('drawCard', function(data) {
		if(player.Hand.length < 5 && player.Deck.length > 0 && world.isTurn(player.id)) { //&& world.Turn == player.Turn) {
			player.drawCard();
		} else {
			socket.emit('notify', { message:'Can\'t draw', type:'warn' });
		}
	});
	
	socket.on('placeCard', function(data) {
		if(world.isTurn(player.id)) {
			if(player.Hand[data]){
				player.placeCard(data);
			} else {
				socket.emit('notify', { message:'Invaild Card', type:'error' });
			}
		} else {
			socket.emit('notify', { message:'Other Players turn!', type:'warn' });
		}
	});
	
	socket.on('useCard', function(data) {
		if(player.Field[data]){
			player.removeCard(data);//, field, hand)
		} else {
			socket.emit('notify', { message:'Invaild Card', type:'error' });
		}
	});
	
	socket.on('endTurn', function(data) {
		if(world.isTurn(player.id)) {
			world.changeTurn();
			io.sockets.emit('notify', { message:'Ended Turn', type:'success' });
		} else {
			socket.emit('notify', { message:'Other Players turn!', type:'warn' });
		}
	});
	
	socket.on('updateName', function(data) {
		player.Name = data
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