var Transitions = (function(){
	return {
		getTransitionEvent:function(){
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
		},
		getTransitionClasses:function(transition, direction){
			switch(transition){
				case "slide":
					if(direction == "horizontal"){
						_transitionOutClassNext = "pt-page-moveToRight";
						_transitionOutClassPrev = "pt-page-moveToLeft"
						_transitionInClassNext = "pt-page-moveFromRight";
						_transitionInClassPrev = "pt-page-moveFromLeft";
					}else{
						_transitionOutClassNext = "pt-page-moveToBottom";
						_transitionOutClassPrev = "pt-page-moveToTop"
						_transitionInClassNext = "pt-page-moveFromBottom";
						_transitionInClassPrev = "pt-page-moveFromTop";
					}
					break;
				case "rotateslide":
					if(direction == "horizontal"){
						_transitionOutClassNext = "pt-page-rotateSlideOutToRight";
						_transitionOutClassPrev = "pt-page-rotateSlideOutToLeft"
						_transitionInClassNext = "pt-page-rotateSlideInFromRight";
						_transitionInClassPrev = "pt-page-rotateSlideInFromLeft";
					}else{
						_transitionOutClassNext = "pt-page-rotateSlideOutToBottom";
						_transitionOutClassPrev = "pt-page-rotateSlideOutToTop"
						_transitionInClassNext = "pt-page-rotateSlideInFromBottom";
						_transitionInClassPrev = "pt-page-rotateSlideInFromTop";
					}
					break;
				case "scale":
					_transitionOutClassNext = "pt-page-scaleToDown";
					_transitionOutClassPrev = "pt-page-scaleToUp"
					_transitionInClassNext = "pt-page-scaleFromDown";
					_transitionInClassPrev = "pt-page-scaleFromUp";
					break;
				case "flip":
					if(direction == "horizontal"){
						_transitionOutClassPrev = "pt-page-flipOutToLeft";
						_transitionOutClassNext = "pt-page-flipOutToRight"
						_transitionInClassPrev = "pt-page-flipInFromLeft";
						_transitionInClassNext = "pt-page-flipInFromRight";
					}else{
						_transitionOutClassNext = "pt-page-flipOutToTop";
						_transitionOutClassPrev = "pt-page-flipOutToBottom"
						_transitionInClassNext = "pt-page-flipInFromTop";
						_transitionInClassPrev = "pt-page-flipInFromBottom";
					}
					break;
			}

			var obj = {
				inNext: _transitionInClassNext,
				inPrev: _transitionInClassPrev,
				outNext: _transitionOutClassNext,
				outPrev: _transitionOutClassPrev
			}

			return obj;
		}
	}
})();