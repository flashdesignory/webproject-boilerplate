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
			var _transitionEvent = whichTransitionEvent();
			var _transitionOutClassPrev, _transitionOutClassNext, _transitionInClassPrev, _transitionInClassNext;

			function handlePageTransitionComplete(event){
				if(!_isActive){
					$(_node).removeClass(_transitionOutClassNext + " " + _transitionOutClassPrev + " site-section-current site-section-prev");
					_node.style.display = "none";
				}
				
				_isPageTransitioning = false;
			}

			function whichTransitionEvent(){
			    var t;
			    var el = document.createElement('fakeelement');
			    var transitions = {
					"animation"      : "animationend",
					"OAnimation"     : "oAnimationEnd",
					"MozAnimation"   : "animationend",
					"WebkitAnimation": "webkitAnimationEnd"
			    }

			    for(t in transitions){
			        if( el.style[t] !== undefined ){
			            return transitions[t];
			        }
			    }
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

			this.setTransitionClasses = function(outPrev, outNext, inPrev, inNext){
				_transitionOutClassPrev = outPrev;
				_transitionOutClassNext = outNext;
				_transitionInClassPrev = inPrev;
				_transitionInClassNext = inNext;
			}

			this.init = function(){
				$(_node).bind(_transitionEvent, handlePageTransitionComplete);
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
				$(_node).removeClass(_transitionOutClassNext + " " + _transitionOutClassPrev + " site-section-current site-section-prev");
				$(_node).addClass("site-section-current");
				_isPageTransitioning = true;

				if(direction == "next"){
					$(_node).addClass(_transitionInClassNext);
				}else{
					$(_node).addClass(_transitionInClassPrev);
				}
			}

			this.hide = function(direction){
				console.log(_debugId + " : hide(" + direction + ")");

				$(_node).removeClass(_transitionInClassNext + " " + _transitionInClassPrev + " site-section-current");
				$(_node).addClass("site-section-prev");

				if(direction == "next"){
					$(_node).addClass(_transitionOutClassPrev);
				}else{
					$(_node).addClass(_transitionOutClassNext);
				}
			}
		}
		this.constructor = Page;
	}
	Page.allowInstance = true;
	window.Page = Page;
})();