(function(){
	function StoryPage(id, node, name){
		var _debugId = "StoryPage";
		var _super = new Page(id, node, name);
		var _scroller, _slider;

		for(var name in _super){
			this[name] = _super[name];
		}

		function build(){
			_slider = new Slider("story-slider", document.getElementById("story-slider"));
			_scroller = new Scroller("story-scroller", document.getElementById('story'));
			_scroller.init();
			_slider.init();
		}

		function addListeners(){
			//console.log(_debugId + " : addListeners()");
			_scroller.enable();
			_slider.enable();
		}

		function removeListeners(){
			//console.log(_debugId + " : removeListeners()");
			_scroller.disable();
			_slider.disable();
		}

		this.willAppear = function(){
			_slider.reset();
			_scroller.reset();
			_super.willAppear();
		}

		this.didAppear = function(){
			addListeners();
			_super.didAppear();
		};

		this.willDisappear = function(){
			removeListeners();
			_super.willDisappear();
		}

		this.init = function(){
			build();
			_super.init();
		}

		this.constructor = Page;
	}

	Page.allowInstance = false;
	StoryPage.prototype = new Page();
	Page.allowInstance = true;

	window.StoryPage = StoryPage;
})(window);