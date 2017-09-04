(function(){
	function Scroller(id,node){
		var _debugId = id;
		var _node = node;
		var _sliderDiv;
		var _containerDiv;
		var _contentDiv;

		function setup(){
			_sliderDiv = _node.getElementsByClassName("scroller-slider")[0];
			//_containerDiv = _node.getElementsByClassName("scroller-container")[0];
			_containerDiv = _node;
			_contentDiv = _node.getElementsByClassName("scroller-content")[0];
		}

		function addSliderListener(){
			console.log(_debugId + " : addSliderListener()");
			if(_sliderDiv){
				Utils.addListener(_sliderDiv, "change", handleOnChange, false);
			}
		}

		function removeSliderListener(){
			console.log(_debugId + " : removeSliderListener()")
			if(_sliderDiv){
				Utils.removeListener(_sliderDiv, "change", handleOnChange);
			}
		}

		function handleOnChange(event){
			var percentage = event.detail.percentage;
			_minPosition = _contentDiv.offsetTop;
			_maxPosition = _containerDiv.offsetHeight - _contentDiv.offsetHeight;
			var target = Math.round(_maxPosition * percentage);
			_contentDiv.style.top = target + "px";
		}

		function reset(){
			_contentDiv.style.top = "0px";
		}

		this.reset = function(){
			reset();
		}

		this.init = function(){
			setup();
		}

		this.enable = function(){
			console.log(_debugId + " : enable()")
			addSliderListener();
			_sliderDiv.style.opacity = 0;
			_sliderDiv.style.display = "block";
			setTimeout(function(){
				//console.log(_containerDiv.offsetHeight, _contentDiv.offsetHeight);
				if(_contentDiv.offsetHeight > _containerDiv.offsetHeight){
					_sliderDiv.style.opacity = 1;
				}else{
					_sliderDiv.style.display = "none";
				}
			}, 250)
			
		}

		this.disable = function(){
			console.log(_debugId + " : disable()");
			removeSliderListener();
		}

		this.constructor = Scroller;
	}

	Scroller.allowInstance = true;
	window.Scroller = Scroller;
})();