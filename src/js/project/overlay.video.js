(function(){
	function VideoOverlay(id, node, name){
		var _debugId = "VideoOverlay";
		var _super = new Overlay(id, node, name);
		var _elements = [];

		for(var name in _super){
			this[name] = _super[name];
		}

		function addListeners(){
			//console.log(_debugId + " : addListeners()");
			$(_elements["close"]).bind('click', handleOnClick);
		}

		function removeListeners(){
			//console.log(_debugId + " : removeListeners()");
			$(_elements["close"]).unbind('click', handleOnClick);
		}

		function handleOnClick(event){
			//console.log(_debugId + " : handleOnClick()");
			NavigationController.hideOverlay("VIDEO");
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
			var elements =$(_super.getNode()).find('[data-module="video"]');
			for(var i = 0; i<elements.length; i++){
				var type = $(elements[i]).data("type");
				_elements[type] = elements[i];
			}

			_super.init();
		}

		this.constructor = Overlay;
	}

	Overlay.allowInstance = false;
	VideoOverlay.prototype = new Overlay();
	Overlay.allowInstance = true;

	window.VideoOverlay = VideoOverlay;
})(window);