var Player = function(id) {
  this.id = id;
  this.Name = 'Guest';
  this.Deck = [];
  this.Grave = [];
  this.Hand = [];
  this.Field = [];
};

Player.prototype = {
	updateName: function(name) {
		this.name = name;
	},
	addCard: function() {
		for(var i = 0; i < arguments.length; i++) {
			this.Deck[arguments[i]] = arguments[i];
		}
	},
	drawCard: function() {
		var cardID = Math.floor(Math.random() * (this.Deck.length - 1)) + 0;
		var card = this.Deck[cardID];
		this.Hand.push(card);
		this.Deck.unset(card);
  	},
	placeCard: function(index) {
		var card = this.Hand[index];
		this.Field.push(card);
		this.Hand.unset(card);
	},
	removeCard: function(index) {
		var card = this.Field[index];
		this.Grave.push(card);
		this.Field.unset(card);
	},
	getDeck: function(cards) {
		for(var i = 0; i < 51; i++) {
			var object = cards[getRandomInt(0, cards.length-1)]
			this.Deck.push(object)
	  	}
	},
}
module.exports = Player;

Array.prototype.unset = function(value) {
    if(this.indexOf(value) != -1) { // Make sure the value exists
        this.splice(this.indexOf(value), 1);
    }   
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}