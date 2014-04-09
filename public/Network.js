$(function() {
	window.socket = io.connect();
	window.game = new Game();
	
	socket.on('connected', function(data) {
		game.id = data
	});
	
	socket.on('notify', function(data) {
		// data.message, data.type
		$.notify(data.message, data.type);
	});
	
	socket.on('message', function(data) {
		// data.user, data.message
		
	});
	
	socket.on('update', function(worldState) {
		game.render(worldState);
	});
});