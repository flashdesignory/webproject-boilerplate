(function(){
	function Page(id, node, name){
		if(Page.allowInstance){
			var _debugId = id;
			var _name = name;
			var _id = id;
			var _node = node;
			var _enabled = false;
			var _isActive = false;

			var _isPageTransitioning = false;
			var _pageTransitionEvent = Transitions.getTransitionEvent();
			var _pageTransitionOutClassPrev, _pageTransitionOutClassNext, _pageTransitionInClassPrev, _pageTtransitionInClassNext;

			function handlePageTransitionComplete(event){
				if(!_isActive){
					$(_node).removeClass(_pageTransitionOutClassNext + " " + _pageTransitionOutClassPrev + " site-section-current site-section-prev");
					_node.style.display = "none";
				}
				
				_isPageTransitioning = false;
			}

			this.getId = function(){
				return _id;
			}

			this.getNode = function(){
				return _node;
			}

			this.getName = function(){
				return _name;
			}

			this.getEnabled = function(){
				return _enabled;
			}

			this.getIsActive = function(){
				return _isActive;
			}

			this.getPageIsTransitioning = function(){
				return _isPageTransitioning;
			}

			this.setPgeTransitionClasses = function(outPrev, outNext, inPrev, inNext){
				_pageTransitionOutClassPrev = outPrev;
				_pageTransitionOutClassNext = outNext;
				_pageTransitionInClassPrev = inPrev;
				_pageTransitionInClassNext = inNext;
			}

			this.init = function(){
				$(_node).bind(_pageTransitionEvent, handlePageTransitionComplete);
			}

			this.enable = function(){
				_enabled = true;
			}

			this.disable = function(){
				_enabled = false;
			}

			this.willAppear = function(){
				_isActive = true;
			}

			this.didAppear = function(){}

			this.willDisappear = function(){
				_isActive = false;
			}

			this.didDisappear = function(){}

			this.show = function(direction){
				console.log(_debugId + " : show(" + direction + ")");

				_node.style.display = "block";
				$(_node).removeClass(_pageTransitionOutClassNext + " " + _pageTransitionOutClassPrev + " site-section-current site-section-prev");
				$(_node).addClass("site-section-current");
				
				if(direction == "next"){
					_isPageTransitioning = true;
					$(_node).addClass(_pageTransitionInClassNext);
				}else if(direction == "prev"){
					_isPageTransitioning = true;
					$(_node).addClass(_pageTransitionInClassPrev);
				}
			}

			this.hide = function(direction){
				console.log(_debugId + " : hide(" + direction + ")");

				$(_node).removeClass(_pageTransitionInClassNext + " " + _pageTransitionInClassPrev + " site-section-current");
				$(_node).addClass("site-section-prev");

				if(direction == "next"){
					$(_node).addClass(_pageTransitionOutClassPrev);
				}else{
					$(_node).addClass(_pageTransitionOutClassNext);
				}
			}
		}
		this.constructor = Page;
	}
	Page.allowInstance = true;
	window.Page = Page;
})();