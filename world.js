var Player = require('./player'),
	cardmanager = require('./cardmanager');

var CardManager = new cardmanager()

var World = function() {
	CardManager.jsonLoad()
	this.Turn // id
  	this.Players = {};
  	this.FPS = 30;
};

World.prototype = {
	login: function(id) {
		var player = new Player(id);
		this.Turn = id
		player.getDeck(CardManager.cards)
   		this.Players[id] = player;
		console.log(this.Players[id].Name, "Has joined the server.");
    	return player;
  	},
  	logout: function(id) {
		console.log(this.Players[id].Name, "Has left the server.");
    	delete this.Players[id];
  	},
	isTurn: function(id) {
		if(id == this.Turn) { return true; } else { return false; }
	},
	changeTurn: function() {
		for(var player in this.Players) {
			if(this.Turn != player) {
				this.Turn = player;
				return
			}
		}
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

fs.watchFile('./cards.json', function (curr, prev) {
	if(curr.mtime != prev.mtime) {
  		console.log('File change in cards.json, ' + curr.mtime);
		console.log('Reloading card database.');
		CardManager.jsonLoad()
  		//console.log('the previous mtime was: ' + prev.mtime);
	}
});
fs.watchFile('./Gamerule.html', function (curr, prev) {
	if(curr.mtime != prev.mtime) {
  		console.log('File change in Gamerule.html, ' + curr.mtime);
  		//console.log('the previous mtime was: ' + prev.mtime);
	}
});
