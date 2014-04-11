$(function() {
	window.socket = io.connect();
	window.game = new Game();
	
	socket.on('connected', function(data) {
		game.id = data
		socket.emit('requestRule');
	});
	
	socket.on('notify', function(data) {
		// data.message, data.type
		$.notify(data.message, data.type);
	});
	
	socket.on('rule', function(data) {
		// data as string
		game.rule = data
		console.log(data)
	});
	
	socket.on('update', function(worldState) {
		game.render(worldState);
	});
});