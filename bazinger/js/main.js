
Slide = ({
	slides: [].slice.call(document.querySelectorAll(".slide_li")),
	points: [].slice.call(document.querySelectorAll(".point")),

	currentSlide: null,

	current: function() {
		return this.slides.indexOf(this.currentSlide);
	},
	activePoint: function() {
		return this.points[this.slides.indexOf(this.currentSlide)];
	},
	next: function(){
		return this.cycle(true);

	},
	prev: function(){
		return this.cycle(false)
	},
	cycle: function(forward){
		var
			idx  = this.current(),
			prev = idx;
		idx = (idx + (forward ? 1 : this.slides.length - 1)) % this.slides.length;
		this.currentSlide = this.slides[idx];
		this.points[idx].classList.add("active");
		this.points[prev].classList.remove("active");
		return idx;
	},

	slideLeft: function() {
		var
			currIdx   = this.current(),
			nextIdx   = this.next(),
			currSlide = this.slides[currIdx],
			nextSlide = this.slides[nextIdx];

		$(nextSlide).css({
			left: '100%'
		});
		$(currSlide).animate({"left":"-100%"}, "slow");
		$(nextSlide).animate({"left":"0%"}, "slow");
	},
	slideTo: function(slideToIdx) {
		var currentInd = this.current(),
			currSlide = this.slides[currentInd],
			nextSlide    = this.slides[slideToIdx];
		if(currentInd < slideToIdx) {
			$(nextSlide).css({
				left: "100%"
			});
			$(currSlide).animate({"left": "-100%"}, "slow");
			$(nextSlide).animate({"left": "0%"}, "slow");
		} else {
			$(nextSlide).css({
				left: "-100%"
			});
			$(currSlide).animate({"left":"100%"}, "slow");
			$(nextSlide).animate({"left":"0%"}, "slow");
		}
		this.currentSlide = nextSlide;

	},
	slideRight: function() {
		var
			currIdx   = this.current(),
			nextIdx   = this.prev(),
			currSlide = this.slides[currIdx],
			nextSlide = this.slides[nextIdx];
		$(nextSlide).css({
			left: '-100%'
		});
		$(currSlide).animate({"left":"100%"}, "slow");
		$(nextSlide).animate({"left":"0%"}, "slow");
	},
	init: function() {
		for (var i in this.slides) {
			if (this.slides[i].classList.contains("current")) {
				this.currentSlide = this.slides[i];
				this.points[i].classList.add("active");
			}
		}

		var self = this;
		$(this.points).on('click',function(event){
			var indPoint   = self.points.indexOf(this);
			self.slideTo(indPoint);
			$('.point.active').removeClass('active');
			$(this).addClass('active');
			event.stopPropagation();
			event.preventDefault();


		});
		return this;
	}

}).init();



var right_button = $('.right_button');
right_button.on('click', function(){
	Slide.slideLeft();
})  ;

var left_button = $('.left_button');
left_button.on('click', function(){
	Slide.slideRight();
});






