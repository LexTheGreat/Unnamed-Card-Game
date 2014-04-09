var fs = require('fs');

var CardManager = function() {
	this.cards = [];
	this.jsonLoad = function() {
    	var file = fs.readFileSync("./cards.json", "utf8");
		var obj = JSON.parse(file);
		for(var i = 0; i < obj.length; i++){
			this.cards.push(obj[i]);
		}
  	}
};

module.exports = CardManager;