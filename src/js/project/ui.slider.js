(function(){
	function Slider(id,node){
		var _debugId = id;
		var _node = node;
		var _bounds, _handle, _progress;
		var _scrubberX, _scrubberY, _scrubberW, _scrubberH;
		var _backgroundX, _backgroundY, _backgroundW, _backgroundH;
		var _handleMinX, _handleMinY, _handleMaxX, _handleMaxY;
		var _localX, _localY, _percentX, _percentY;
		var _orientation = "vertical";
		var _percentage, _prevPercentage;

		function setup(){
			_bounds = _node.getElementsByClassName("slider-bounds")[0];
			_handle = _node.getElementsByClassName("slider-handle")[0];
			_background =_node.getElementsByClassName("slider-background")[0];
			_progress = _node.getElementsByClassName("slider-progress")[0];

			_scrubberX = _bounds.getBoundingClientRect().left;
			_scrubberY = _bounds.getBoundingClientRect().top;

			_backgroundX = _background.offsetLeft;
			_backgroundY = _background.offsetTop;

			_handleMinX = _backgroundX;
			_handleMinY = _backgroundY;
		}

		function addSliderListeners(){
			if ('ontouchstart' in window){
				Utils.addListener(_bounds, "touchstart", onTouchStart, false);
			} else {
				Utils.addListener(_bounds, "mousedown", onMouseDown, false);
			}
		}

		function removeSliderListeners(){
			if ('ontouchstart' in window){
				Utils.removeListener(_bounds, "touchstart", onTouchStart);
			} else {
				Utils.removeListener(_bounds, "mousedown", onMouseDown);
			}
		}

		function onTouchStart(event){
			Utils.removeListener(_bounds, "touchstart", onTouchStart);
			Utils.addListener(document, "touchmove", thumbMove, false);
			Utils.addListener(document, "touchend", onTouchEnd, false);
			thumbMove(event);
			Utils.preventDefault(event);
		};
		
		function onTouchEnd(event){
			Utils.addListener(_bounds, "touchstart", onTouchStart, false);
			Utils.removeListener(document, "touchmove", thumbMove);
			Utils.removeListener(document, "touchend", onTouchEnd);
			Utils.preventDefault(event);
		};

		function onMouseDown(event){
			Utils.removeListener(_bounds, "mousedown", onMouseDown);
			Utils.addListener(document, "mousemove", thumbMove, false);
			Utils.addListener(document, "mouseup", onMouseUp, false);
			thumbMove(event);
			Utils.preventDefault(event);
		}

		function onMouseUp(event){
			Utils.addListener(_bounds, "mousedown", onMouseDown, false);
			Utils.removeListener(document, "mousemove", thumbMove);
			Utils.removeListener(document, "mouseup", onMouseUp);
			Utils.preventDefault(event);
		};

		function thumbMove(event){
			if(event.touches)
			{
				_localX = event.touches[0].pageX - (_scrubberX + _node.offsetLet + _node.parentElement.offsetLeft);
				_localY = event.touches[0].pageY - (_scrubberY + _node.offsetTop + _node.parentElement.offsetTop);
			}
			else
			{
				if(window.event != null){
					_localX = event.clientX - (_scrubberX + _node.offsetLeft + _node.parentElement.offsetLeft);
					_localY = event.clientY - (_scrubberY + _node.offsetTop + _node.parentElement.offsetTop);
				} else {
					_localX = event.pageX - (_scrubberX + _node.offsetLeft + _node.parentElement.offsetLeft);
					_localY = event.pageY - (_scrubberY + _node.offsetTop + _node.parentElement.offsetTop);
				}
			}

			calculate();

			if(event) Utils.preventDefault(event);
		}

		function calculate(){
			_percentY = _localY / parseInt(_bounds.offsetHeight);
			_percentX = _localX / parseInt(_bounds.offsetWidth);

			var shouldFire = false;

			if(_percentX < 0){
				_percentX = 0;
			}else if(_percentX > 1){
				_percentX = 1;
			}else{
				if(_orientation == "horizontal"){
					shouldFire = true;
				}
			}

			if(_percentY < 0){
				_percentY = 0;
			}else if(_percentY > 1){
				_percentY = 1;
			}else{
				if(_orientation == "vertical"){
					shouldFire = true;
				}
			}

			if(_orientation == "vertical"){
				_percentage = _percentY;

			}else{
				_percentage = _percentX;
			}

			_percentage = Math.round(_percentage * 100)/100;

			if(_percentage != _prevPercentage){
				if(shouldFire){
					Utils.dispatchCustomEvent(_node, "change", {percentage:_percentage});
				}
				updateDisplay();
				_prevPercentage = _percentage;
			}
		}

		function updateDisplay(){
			var target;

			_handleMaxX = (_background.offsetWidth - _handle.offsetWidth);
			_handleMaxY = (_background.offsetHeight - _handle.offsetHeight);

			if(_orientation == "vertical"){
				target = _localY - _handle.offsetHeight/2;
				if(target < _handleMinY){
					target = _handleMinY;
				}else if(target > _handleMaxY){
					target = _handleMaxY;
				}
				_handle.style.top  = target + "px";
			}else{
				target = _localX - _handle.offsetWidth/2;
				if(target < _handleMinX){
					target = _handleMinX;
				}else if(target > _handleMaxX){
					target = _handleMaxX;
				}

				_handle.style.left  = target + "px";
			}

			if(_progress){
				_progress.style.width = (_backgroundW * _percentage) + "px"
			}
		}

		function reset(){
			_localX = _localY = 0;
			calculate();
		}

		this.reset = function(){
			reset();
		}

		this.enable = function(){
			console.log(_debugId + " : enable()");
			addSliderListeners();
		}

		this.disable = function(){
			console.log(_debugId + " : disable()");
			removeSliderListeners();
			//reset();
		}

		this.getPercentage = function(){
			return _percentage;
		}

		this.init = function(){
			setup();
		}

		this.constructor = Slider;
	}

	Slider.allowInstance = true;
	window.Slider = Slider;
})();