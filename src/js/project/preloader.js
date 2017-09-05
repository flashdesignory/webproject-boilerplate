var Preloader = (function(){
	var _debugId = "Preloader";
	var _minDuration = 4000;
	var _duration;
	var _pageTransitionEvent = Transitions.getTransitionEvent();

	//performance.timing.loadEventEnd - performance.timing.navigationStart

	function animateOut(){
		$('#preload-container').bind(_pageTransitionEvent, handlePageTransitionComplete);
		$('body').removeClass('loading').addClass('loaded');
	}

	function handlePageTransitionComplete(event){
		$('#preload-container').css("display", "none");
	}

	return {
		hide:function(){
			_duration = new Date() - window.pageLoadStart;
			if(_minDuration > _duration){
				setTimeout(animateOut, (_minDuration-_duration))
			}
		}
	}
})();