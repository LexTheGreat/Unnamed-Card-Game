window.Game = function() {
	this.canvas = document.getElementById('canvas');
	this.canvas.width = window.innerWidth;
	this.canvas.height = window.innerHeight;
	this.id = 0;
	this.rule = '';
	this.ctx = canvas.getContext('2d');
	this.ctx.fillRect(0, 0, canvas.width, canvas.height);
	this.ctx.fillStyle = 'rgb(150,150,150)'; // 25x25 & canvas.width-100xcanvas.height-25
	this.preloadImages.list = [];
	var imageURLs = [
		"img/card/404.png",
	    "img/card/Slime.png",
		"img/card/RSlime.png",
		"img/card/BSlime.png",
		"img/card/WSlime.png",
		"img/card/KSlime.png",
		"img/card/RockSpider.png"
	];
	
	this.preloadImages(imageURLs);
	this.mField = [];
	this.yField = [];
	this.cHand = [];
	this.canvas.addEventListener("mousedown", onClick, false);
};
Game.prototype = {
	preloadImages: function(array) {
		if (!this.preloadImages.list) {
        	this.preloadImages.list = [];
    	}
    	for (var i = 0; i < array.length; i++) {
        	var img = new Image();
        	img.src = array[i];
        	this.preloadImages.list.push(img);
    	}
	},
	getImage: function(file) {
		for (var i = 0; i < this.preloadImages.list.length; i++) {
			if(this.preloadImages.list[i].src == document.URL + file) {
				return this.preloadImages.list[i];
			}
		}
		return this.preloadImages.list[0];
	},
	_drawMyField: function(cards) {
		this.mField = cards
		for(var i = 0; i < cards.length; i++) {
			var spread = 160;
			var object = cards[i];
			var image = this.getImage("img/card/" + object.Photo);
			this.ctx.drawImage(image, spread * (i), this.canvas.height/2.5)
			this.ctx.fillStyle = "black";
			this.ctx.font = "15px 'BIMINI'";
			this.ctx.fillText(object.Name, (spread * (i)) + 5, this.canvas.height/2.5 + 15);
			this.ctx.fillText(object.Level, (spread * (i)) + 145, this.canvas.height/2.5 + 15);
			wrapText(this.ctx, object.Desc, (spread * (i)) + 5,  this.canvas.height/2.5 + 160, 150, 15);
			this.ctx.fillText(object.Power + "/" + object.Defence, (spread * (i)) + 130, this.canvas.height/2.5 + 230);
		}
	},
	_drawField: function(cards) {
		this.yField = cards
		for(var i = 0; i < cards.length; i++) {
			var spread = 160;
			var object = cards[i];
			var image = this.getImage("img/card/" + object.Photo);
			this.ctx.drawImage(image, spread * (i), 115)
			this.ctx.fillStyle = "black";
			this.ctx.font = "15px 'BIMINI'";
			this.ctx.fillText(object.Name, (spread * (i)) + 5, 130);
			this.ctx.fillText(object.Level, (spread * (i)) + 145, 130);
			wrapText(this.ctx, object.Desc, (spread * (i)) + 5, 272, 150, 15);
			this.ctx.fillText(object.Power + "/" + object.Defence, (spread * (i)) + 130, 345);
		}
	},
	_drawHand: function(cards) {
		this.cHand = cards
		for(var i = 0; i < cards.length; i++) {
			var spread = 160;
			var object = cards[i];
			var image = this.getImage("img/card/" + object.Photo);
			this.ctx.drawImage(image, spread * (i), this.canvas.height - image.height);
			this.ctx.fillStyle = "black";
			this.ctx.font = "15px 'BIMINI'";
			this.ctx.fillText(object.Name, (spread * (i)) + 5, this.canvas.height - (image.height - 14));
			this.ctx.fillText(object.Level, (spread * (i)) + 145, this.canvas.height - (image.height - 14));
			wrapText(this.ctx, object.Desc, (spread * (i)) + 5,  this.canvas.height - 72, 150, 15);
			this.ctx.fillText(object.Power + "/" + object.Defence, (spread * (i)) + 130, this.canvas.height - (image.height - 230));
		}
	},
	_drawText: function(text, x, y) {
		this.ctx.fillStyle = "black";
		this.ctx.font = "25px 'BIMINI'";
		this.ctx.fillText(text, x, y);
	},
	_drawLine: function() {
		this.ctx.beginPath();
		this.ctx.moveTo(0, canvas.height/2.5);
		this.ctx.lineTo(canvas.width, canvas.height/2.5);
		this.ctx.stroke();
	},
	_drawGUI: function() {
		this.ctx.beginPath();
      	this.ctx.rect(this.canvas.width-400, this.canvas.height/2.5+50, 100, 35);
      	this.ctx.fillStyle = 'white';
      	this.ctx.fill();
      	this.ctx.lineWidth = 1;
      	this.ctx.strokeStyle = 'black';
      	this.ctx.stroke();
		this._drawText("Draw", this.canvas.width-380, this.canvas.height/2.5+75)
		
		this.ctx.beginPath();
      	this.ctx.rect(this.canvas.width-400, this.canvas.height/2.5+100, 100, 35);
      	this.ctx.fillStyle = 'white';
      	this.ctx.fill();
      	this.ctx.lineWidth = 1;
      	this.ctx.strokeStyle = 'black';
      	this.ctx.stroke();
		this._drawText("End", this.canvas.width-370, this.canvas.height/2.5+125)
		
		this.ctx.beginPath();
      	this.ctx.rect(this.canvas.width-400, this.canvas.height/2.5+150, 100, 35);
      	this.ctx.fillStyle = 'white';
      	this.ctx.fill();
      	this.ctx.lineWidth = 1;
      	this.ctx.strokeStyle = 'black';
      	this.ctx.stroke();
		this._drawText("Rules", this.canvas.width-380, this.canvas.height/2.5+175)

	},
	render: function(data) {
		// Todo ~ Autoresize
		this.ctx.clearRect(0, 0, 500, 400);
		this.ctx.fillRect(0, 0, canvas.width, canvas.height);
		this.ctx.save();
		this._drawLine();
		this._drawGUI();
		for (var Player in data) {
			var object = data[Player];
			if(typeof object.Name != 'undefined'){
				if(object.id == this.id) {this._drawText(object.Name + " Deck: " + object.Deck + " | Hand: " + object.Hand + " | Grave: " + object.Grave.length, this.canvas.width-370, this.canvas.height-25); this._drawHand(object.handData); this._drawMyField(object.Field);} else {this._drawText(object.Name + " Deck: " + object.Deck + "  | Hand: " + object.Hand + " | Grave: " + object.Grave.length, 25, 25); this._drawField(object.Field);}
			}
		};
		this.ctx.restore();
	}
};

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i].src === obj) {
			console.log(this[i].src + "=" + obj)
            return true;
        }
    }
    return false;
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
        var cars = text.split("\n");

        for (var ii = 0; ii < cars.length; ii++) {

            var line = "";
            var words = cars[ii].split(" ");

            for (var n = 0; n < words.length; n++) {
                var testLine = line + words[n] + " ";
                var metrics = context.measureText(testLine);
                var testWidth = metrics.width;

                if (testWidth > maxWidth) {
                    context.fillText(line, x, y);
                    line = words[n] + " ";
                    y += lineHeight;
            } else {
            	line = testLine;
        	}
        }
		context.fillText(line, x, y);
		y += lineHeight;
	}
}

function checkClick(pos){
	console.log(pos.x + ":" + pos.y);
	// Card size 158 × 230
	// Check cards
	if(game.cHand) {
		for(var i = 0; i < game.cHand.length; i++) {
			if(160 * (i) <= pos.x && 158 * (i+1) >= pos.x && canvas.height-230 <= pos.y){
				console.log('Clicked card [HAND]:' + i);
				socket.emit('placeCard', i)
			}
		}
	}
	if(game.mField) {
		for(var i = 0; i < game.mField.length; i++) {
			if(160 * (i) <= pos.x && 158 * (i+1) >= pos.x && canvas.height/2+230 >= pos.y && canvas.height/2 <= pos.y){
				console.log('Clicked card [MY FIELD]:' + i);
				socket.emit('useCard', i)
			}
		}
	}
	//     this.canvas.width-400, this.canvas.height/2.5+50
	// gui this.canvas.width-400, this.canvas.height/2.5+100
	if(this.canvas.width-400 <= pos.x && this.canvas.width-300 >= pos.x && this.canvas.height/2.5+70 >= pos.y && this.canvas.height/2.5+50 <= pos.y){
		console.log('Clicked GUI [Draw]');
		socket.emit('drawCard')
	}
	if(this.canvas.width-400 <= pos.x && this.canvas.width-300 >= pos.x && this.canvas.height/2.5+120 >= pos.y && this.canvas.height/2.5+100 <= pos.y){
		console.log('Clicked GUI [End]');
		socket.emit('endTurn')
	}
	if(this.canvas.width-400 <= pos.x && this.canvas.width-300 >= pos.x && this.canvas.height/2.5+170 >= pos.y && this.canvas.height/2.5+150 <= pos.y){
		console.log('Clicked GUI [Rule]');
		socket.emit('requestRule');
	}
}

function onClick(event){
      var x = event.x;
      var y = event.y;
	  
      //x -= window.innerWidth;
      //y -= window.innerHeight;
	  checkClick({x:x, y:y});
}