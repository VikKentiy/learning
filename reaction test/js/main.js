function extend(Child, Parent) {
	var F = function() { }
	F.prototype = Parent.prototype
	Child.prototype = new F()
	Child.prototype.constructor = Child
	Child.superclass = Parent.prototype
}

function Reaction( domElement, options) {
	$.extend(this, options);
	this.$el = $(domElement);
	this.currentWord = $('#coloredWords span');
	this.$block = $('#block');
	this.finalResult = $('#finalResult');
	this.$cursor     = $(".runner");
	var self         = this;
	this.endTime     = 0;
	this.trueAns     = 0;
	this.falseAns    = 0;
	this.buttons     = $('#buttonsForAnswers');
	this.resultBlock = document.getElementById("finalResult");


	this.buttons.on('click', 'button', function(event){
		self.$cursor.stop();
		self.animate();
		if(self.finished) {
			return;
		}
		if (self.countTry > 0) {
			self.nextWord(event);
		} else {
			self.end();
		}
	});
}

Reaction.prototype.nextWord = function(event){
	this.countTry--;
		console.log(this);
	if (event.target.id == this.currentWord.text()) {
		this.trueAns++;

	} else {
		this.falseAns++
	}

	this.coloredWords();
	this.endTime = event.timeStamp;
}

Reaction.prototype.countTry = 10;
Reaction.prototype.currentWord = null;
Reaction.prototype.start = function() {
	this.resultBlock.style.display = 'none';
	this.startTime = new Date().getTime();
	this.animate();
	this.coloredWords();
}

Reaction.prototype.end = function() {
	this.finished = true;
	this.endTime = new Date().getTime();
	this.buttons.off('click');
	this.$cursor.stop();
	this.getResult();
}

Reaction.prototype.getRandomNumbers = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};


Reaction.prototype.getResult = function(){
		this.resultBlock.style.display = 'block';
		var
			yourTime   = (this.endTime - this.startTime) / 1000,
			goodResult = this.trueAns,
			badResult  = this.falseAns;


		$(this.finalResult).html("spent time: " + yourTime + " sec" + " <br/> number of correct answers: " + goodResult + " <br/> number of incorrect answers: " + badResult);
};

Reaction.prototype.animate = function () {
	$(this.$cursor).css({ left: '0' })
	$(this.$cursor).animate({
		left: '99%'
	}, {
		duration: 10000,
		easing: 'linear'
	});
}

Reaction.prototype.allColors   = [
	{
		text : "orange",
		color: "#FF8C00",
	},
	{
		text : "green",
		color: "#008B00"
	},
	{
		text : "yellow",
		color: "#EEC900"
	},
	{
		text : "red",
		color: "#FF0000"
	},
	{
		text : "blue",
		color: "#1C86EE"
	},
	{
		text : "white",
		color: "#FFFFFF"
	},
];

//===================== level1 ======================
function Level1(domElement, options) {
	this.$el = $(domElement);
	Reaction.apply(this, arguments);
};

extend(Level1, Reaction);

Level1.prototype.coloredWords = function(){
	var
		idx = this.getRandomNumbers(0, this.allColors.length-1),
		nextWord;

	nextWord = this.allColors[idx];
	this.currentWord.text();
	this.currentWord.html(nextWord.text);
	this.currentWord.css({'color': nextWord.color});
};

//===================== level2 ======================
function Level2(domElement, options) {
	Reaction.apply(this, arguments);
};

extend(Level2, Reaction);
Level2.prototype.coloredWords = function () {
	var
		nextWordText,
		nextWordColor,
		idxText  = this.getRandomNumbers(0, this.allColors.length-1),
		idxColor = this.getRandomNumbers(0, this.allColors.length-1);
	while (idxText == idxColor) {
		idxColor = this.getRandomNumbers(0, this.allColors.length-1);
	};

	nextWordText  = this.allColors[idxText];
	nextWordColor = this.allColors[idxColor];
	this.currentWord.text();
	this.currentWord.html(nextWordText.text);
	this.currentWord.css({'color': nextWordColor.color});
}
//=======================================================

$("#go").one('click', function(event){
	var lev1 = new Level1($('#block'), {countTry: 10});
	
	lev1.start();
	

	var block = document.getElementById("block");
	block.classList.remove('hide');
	$("#instruction").addClass('hide');

});


$('#level2').one('click', function(event){
	var lev2 = new Level2($('#block'));
	lev2.start();
})

