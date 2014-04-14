$(function() {
	window.socket = io.connect();
	window.game = new Game();
	
	socket.on('connected', function(data) {
		game.id = data
		socket.emit('requestRule');
		$.notify("Make sure all notifications are gone before playing", "warn");
	});
	
	socket.on('notify', function(data) {
		// data.message, data.type
		$.notify(data.message, data.type);
	});
	
	socket.on('rule', function(data) {
		// data as string
		//game.rule = data
		$.notify("Please allow Popup for rules", "warn");
		var popup = open("", "Popup", "width=400,height=300");
		popup.document.title = "Rules"
		var rules = popup.document.createElement("p");
		rules.innerHTML = data;
		popup.document.body.appendChild(rules);
	});
	
	socket.on('update', function(worldState) {
		game.render(worldState);
	});
});