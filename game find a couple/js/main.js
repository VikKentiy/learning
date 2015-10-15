function Couple (domElement, level) {
	this.$el = $(domElement);
	this.levelNumber = level;
	this.allDigits = [];
	for (var i =1; i <= this.maxTiles; i++) {
		this.allDigits.push(i,i);
	}
	this.prevNumber  = null;
	this.prevElem    = null;
	this.currentNumb = null;
	this.currentElem = null;

	var game = this; 
	$(this.$el).find('.flip-container' + this.levelNumber).on('click', function(event){

		$(this).toggleClass('default');

		var self = this;
		var interval = setInterval (function(){
			$(self).toggleClass('default');
			clearInterval(interval);
		},1000);

			game.currentNumb = $(self).find('.back' + game.levelNumber).text();
			game.currentElem = this;

		if (game.prevNumber == null){
			game.prevNumber = $(self).find('.back' + game.levelNumber).text();
			game.prevElem = this;

		} else if (game.prevNumber == game.currentNumb) {
			
			$(game.prevElem).toggleClass('default');
			$(game.currentElem).toggleClass('default');
			game.prevNumber = null;
			game.prevElem   = null;

		} else if (game.prevNumber != game.currentNumb && game.prevNumber != null) {

			game.prevNumber = null;
			game.prevElem   = null;
		}
		console.log(game.prevNumber, game.currentNumb);

	});
};


Couple.prototype.maxTiles = 32;
Couple.prototype.arrDigits = null;
Couple.prototype.numbersOfDigits = function (){
	var 
		sumDigits = this.levelNumber*this.levelNumber/2;

	this.arrDigits = this.allDigits.filter(function(number){
		return number <= sumDigits;
	});
}

Couple.prototype.finalArray = function () {
	this.arrDigits.sort(function(){
		return Math.random() - 0.6;
	})
}

Couple.prototype.fillCells = function () {

	if( 4 == this.levelNumber) {
		var 
			$cells = $('.back' + this.levelNumber),
			self = this;

		$cells.each(function(idx, value){
			$(this).text(self.arrDigits[idx])
		});
	};

	if( 6 == this.levelNumber) {
		var 
			$cells = $('.back' + this.levelNumber),
			self = this;

		$cells.each(function(idx, value){
			$(this).text(self.arrDigits[idx])
		});
	};

	if( 8 == this.levelNumber) {
		var 
			$cells = $('.back' + this.levelNumber),
			self = this;

		$cells.each(function(idx, value){
			$(this).text(self.arrDigits[idx])
		});
	};
};
Couple.prototype.find = function () {

}



$('.content').one('click', 'button', function(event){
	var
		level = $(event.target).text(),
		levelBlock = $('.content' + level);

	levelBlock.removeClass('hide');
	$('.content').addClass('hide');
	var game = new Couple ($(levelBlock), level);
	game.numbersOfDigits();
	game.finalArray();
	game.fillCells();
})