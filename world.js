var Player = require('./player'),
	cardmanager = require('./cardmanager');

var CardManager = new cardmanager()

var World = function() {
	CardManager.jsonLoad()
  	this.Players = {};
  	this.FPS = 30;
	this.Turn = true
};

World.prototype = {
	login: function(id) {
		var player = new Player(id);
		player.getDeck(CardManager.cards)
   		this.Players[id] = player;
		console.log(this.Players[id].Name, "Has joined the server.");
    	return player;
  	},
  	logout: function(id) {
		console.log(this.Players[id].Name, "Has left the server.");
    	delete this.Players[id];
  	},
  	start: function(callback) {
    	var self = this;
    	setInterval(function() {
			var data = []
			for(var player in self.Players) {
				var object = self.Players[player];
				data.push({Name:object.Name, id:object.id, cardData:CardManager.cards, Field:object.Field, Hand:object.Hand.length, Deck:object.Deck.length-1, Grave:object.Grave, handData:object.Hand});
			}
			callback(data)
    	}, 1000/this.FPS);
	}
};

module.exports = World;