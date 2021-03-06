(function(){
	function PhotosPage(id, node, name){
		var _debugId = "PhotosPage";
		var _super = new Page(id, node, name);

		var _numImages;
		var _container, _inner;
		var _imageWidth, _imageHeight;
		var _transition = node.getAttribute("data-al-transition");
		var _direction = node.getAttribute("data-al-direction");
		var _loop = false;
		var _currentImage, _prevImage;
		var _currentIndex = 0;
		var _prevIndex = 0;
		var _images = [];
		var _transitionEvent = Transitions.getAnimationEvent();
		var _isTransitioning = false;
		var _numTransitionsComplete = 0;
		var _transitionOutClassPrev, _transitionOutClassNext, _transitionInClassPrev, _transitionInClassNext;
		var _transition = "slide";
		var _direction = "horizontal";
		var _prevButton;
		var _nextButton;

		var _isMoving = false;
		var _startX = null;
		var _currentX = null;
		var _offset = 20;

		for(var name in _super){
			this[name] = _super[name];
		}

		function setup(){
			_container = $('#gallery');
			_inner = $('#gallery-images');
			_images = $('.gallery-image');
			_prevButton = $('#gallery-prev');
			_nextButton = $('#gallery-next');
			_imageWidth= _container.offsetWidth;
			_imageHeight = _container.offsetHeight;
			_numImages = _images.length;

			for(var i = 0; i<_numImages; i++){
				$(_images[i]).bind(_transitionEvent, handleTransitionComplete);
			}

			var transitions = Transitions.getTransitionClasses(_transition, _direction);
			_transitionInClassNext = transitions.inNext;
			_transitionInClassPrev = transitions.inPrev;
			_transitionOutClassNext = transitions.outNext;
			_transitionOutClassPrev = transitions.outPrev;

			reset();
		}

		function handleTransitionComplete(event){
			$(_prevImage).removeClass("gallery-image-prev" + " " + _transitionOutClassNext + " " + _transitionOutClassPrev);
			_isTransitioning = false;
		}

		function addListeners(){
			//console.log(_debugId + " : addListeners()");
			$(_prevButton).bind('click', prev);
			$(_nextButton).bind('click', next);

			if ('ontouchstart' in window || 'onmsgesturechange' in window){
				$(_inner).bind("touchstart", onTouchStart);
			} else {
				$(_inner).bind("mousedown", onMouseDown);
			}
		}

		function removeListeners(){
			//console.log(_debugId + " : removeListeners()");
			$(_prevButton).unbind('click', prev);
			$(_nextButton).unbind('click', next);

			if ('ontouchstart' in window || 'onmsgesturechange' in window){
				$(_inner).unbind("touchstart", onTouchStart);
			} else {
				$(_inner).unbind("mousedown", onMouseDown);
			}
		}

		function onMouseDown(event){
			if(!_isMoving) {
				_startX = event.pageX;
				_currentX = _startX;
				_isMoving = true;

				$(_inner).unbind("mousedown", onMouseDown);
				$(document).bind("mousemove", onMouseMove);
				$(document).bind("mouseup", onMouseUp);
			}
			event.preventDefault();
		};

		function onMouseMove(event){
			if(_isMoving) {
				_currentX = event.pageX;
			}
		}

		function onMouseUp(event){	
			$(_inner).bind("mousedown", onMouseDown);
			$(document).unbind("mousemove", onMouseMove);
			$(document).unbind("mouseup", onMouseUp);	
			
			_currentX = event.pageX;

			evaluate();

			_startX = null;
			_isMoving = false;

			event.preventDefault();
		};

		function onTouchStart(event){
			if(!_isMoving) {
				_startX = event.touches[0].pageX;
				_currentX = _startX;
				_isMoving = true;

				$(_inner).unbind("touchstart", onTouchStart);
				$(document).bind("touchmove", onTouchMove);
				$(document).bind("touchend", onTouchEnd);
			}
			
			event.preventDefault();
		};

		function onTouchMove(event){
			if(_isMoving) {
				_currentX = event.touches[0].pageX;
			}
		}
		
		function onTouchEnd(event){
			$(_inner).bind("touchstart", onTouchStart);
			$(document).unbind("touchmove", onTouchMove);
			$(document).unbind("touchend", onTouchEnd);

			evaluate();

			_starX = null;
			_isMoving = false;

			event.preventDefault();
		};

		function evaluate() {
			var x = _currentX;
			var dx = x - _startX;
			var ax = Math.abs(dx);

			var toright = dx > 0 ? true : false;

			if(ax >= _offset) {
				if(toright) {
					prev();
				} else {
					next();
				}
			}
		};

		function move(index){
			if(_isTransitioning) return;

			_isTransitioning = true;
			
			if(_currentImage){
				_prevImage = _currentImage;
				_prevIndex = _currentIndex;

				$(_prevImage).removeClass("gallery-image-current" + " " + _transitionInClassNext + " " + _transitionInClassPrev);
				$(_prevImage).addClass("gallery-image-prev");
				
				if(_prevIndex == _numImages-1 && index == 0){
					$(_prevImage).addClass(_transitionOutClassPrev);
				}else if(_prevIndex == 0 && index == _numImages-1){
					$(_prevImage).addClass(_transitionOutClassNext);
				}else{
					if(_prevIndex <= index){
						$(_prevImage).addClass(_transitionOutClassPrev);
					}else{
						$(_prevImage).addClass(_transitionOutClassNext);
					}
				}
			}

			_currentIndex = index;
			_currentImage = _images[index];

			$(_currentImage).removeClass("gallery-image-prev" + " " + _transitionOutClassNext + " " + _transitionOutClassPrev);
			$(_currentImage).addClass("gallery-image-current");

			if(_prevIndex == _numImages-1 && index == 0){
				$(_currentImage).addClass(_transitionInClassNext);
			}else if(_prevIndex == 0 && index == _numImages-1){
				$(_currentImage).addClass(_transitionInClassPrev);
			}else{
				if(_prevIndex <= index){
					$(_currentImage).addClass(_transitionInClassNext);
				}else{
					$(_currentImage).addClass(_transitionInClassPrev);
				}
			}

			
		}

		function prev(event){			
			var nextIndex = _currentIndex - 1;

			if(_loop){
				if(nextIndex < 0){
					nextIndex = _numImages-1;
				}
				move(nextIndex);
			}else{
				if(nextIndex >= 0){
					move(nextIndex);
				}
			}

			if(event) event.preventDefault();
		}

		function next(event){
			var nextIndex = _currentIndex + 1;

			if(_loop){
				if(nextIndex >= _numImages){
					nextIndex = 0;
				}
				move(nextIndex);
			}else{
				if(nextIndex < _numImages){
					move(nextIndex);
				}
			}

			if(event) event.preventDefault();
		}

		function reset(){
			if(_currentImage){
				_prevImage = _currentImage;
				_prevIndex = _currentIndex;

				$(_prevImage).removeClass("gallery-image-current" + " " + _transitionInClassNext + " " + _transitionInClassPrev);
			}

			_currentIndex = 0;
			_currentImage = _images[0];

			$(_currentImage).removeClass("gallery-image-prev" + " " + _transitionOutClassNext + " " + _transitionOutClassPrev);
			$(_currentImage).addClass("gallery-image-current");
		}

		this.willAppear = function(){
			reset();
			_super.willAppear();
		}

		this.didAppear = function(){
			addListeners();
			_super.didAppear();
		}

		this.willDisappear = function(){
			removeListeners();
			_super.willDisappear();
		}

		this.didDisappear = function(){
			_super.didDisappear();
		}

		this.init = function(){
			setup();
			_super.init();
		}

		this.constructor = Page;
	}

	Page.allowInstance = false;
	PhotosPage.prototype = new Page();
	Page.allowInstance = true;

	window.PhotosPage = PhotosPage;
})(window);