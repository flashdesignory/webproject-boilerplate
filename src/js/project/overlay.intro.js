(function(){
	function IntroOverlay(id, node, name){
		var _debugId = "IntroOverlay";
		var _super = new Page(id, node, name);

		for(var name in _super){
			this[name] = _super[name];
		}

		function addListeners(){
			//console.log(_debugId + " : addListeners()");
		}

		function removeListeners(){
			//console.log(_debugId + " : removeListeners()");
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
			_super.init();
		}

		this.constructor = Overlay;
	}

	Overlay.allowInstance = false;
	IntroOverlay.prototype = new Overlay();
	Overlay.allowInstance = true;

	window.IntroOverlay = IntroOverlay;
})(window);