var Site = (function(){
	var _debugId = "Site";
	
	//references
	var _window, _html, _body;
	var _homeButton;

	//
	var _isMobile;
	var _lockOrientation = false;
	var _lockMinSize = true;
	var _lockBrowserVersion = true;
	var _minIEVersion = 10;
	var _messages = [];

	//resize / orientation
	var _windowWidth, _windowHeight, _windowRatio;
	var _minHeight = 672;
	var _minWidth = 320;
	var _orientation;
	var _breakpoint;
	var _orientationChanged = false;

	//check for end of resizing 
	var _resizeTime = new Date(1, 1, 2000, 12,00,00);
	var _resizeTimeOut = false;
	var _resizeDelta = 200;
	var _isResizing = false;

	//check for end of scrolling
	var _scrollTime = new Date(1, 1, 2000, 12,00,00);
	var _scrollTimeOut = false;
	var _scrollDelta = 200;
	var _isScrolling = false;

	//background
	var _backgroundWidth = 1920;
	var _backgroundHeight = 1080;
	var _backgroundRatio = _backgroundWidth / _backgroundHeight;
	var _backgroundImages = [];

	function parseData(){
		console.log(_debugId + ", parseData()");
	}

	function addListeners(){
		_window.bind('scroll', handleOnScroll);

		if(typeof window.orientation === 'undefined') {
			if(window.matchMedia){
				var mqOrientation = window.matchMedia("(orientation: portrait)");
			    mqOrientation.addListener(function() { handleOnOrientationChange(); });
			}else{
				_window.bind('orientationchange', handleOnOrientationChange);
			}

			_window.bind('resize', handleOnResize);
			
		} else {
		  _window.bind('orientationchange', handleOnOrientationChange);
		}

		_homeButton.bind('click', handleNavigationRequest);
	}

	//handling scrolling of site
	function handleOnScroll(event){	
		if(!_isResizing){
			_scrollTime = new Date();
		    if (_scrollTimeOut === false) {
		        _scrollTimeOut = true;
		        setTimeout(checkEndOfScroll, _scrollDelta);
		    }
		}
	}
	
	function checkEndOfScroll() {
	    if (new Date() - _scrollTime < _scrollDelta) {
	        setTimeout(checkEndOfScroll, _scrollDelta);
	    } else {
	        _scrollTimeOut = false;
	        _isScrolling = false;
	    }               
	}

	//handling of resize / orientation
	function handleOnResize(event){
		_isResizing = true;
		_windowWidth = $(document).width();
		_windowHeight = $(document).height();
		_windowRatio = _windowWidth / _windowHeight;

		if(_windowWidth >= _windowHeight){
			_orientation = "landscape";
			_body.addClass("landscape").removeClass("portrait");
			
			if(_lockOrientation && _isMobile){
				_messages["ROTATE"].style.display = "block";
			}
		}else{
			_orientation = "portrait";
			_body.addClass("portrait").removeClass("landscape");

			if(_lockOrientation && _isMobile){
				_messages["ROTATE"].style.display = "none";
			}
		}

	    var temp = Utils.getBreakpoint();
	    if(temp != _breakpoint){
	    	_breakpoint = temp;
	    	console.log(_debugId + ", breakpoint: " +  _breakpoint);
	    }
	   
	    _resizeTime = new Date();
	    if (_resizeTimeOut === false) {
	        _resizeTimeOut = true;
	        setTimeout(checkEndOfResize, _resizeDelta);
	    }

	    resizeBackgrounds();

	    //if(_orientationChanged){
	    	//$('html body').scrollTop(0);
	    	//window.scrollTo(0, 0);
	  // }

	  	$('body').animate({
            scrollTop: '0'
        }, 0);


	    _orientationChanged = false;
	}

	function checkEndOfResize() {
	    if (new Date() - _resizeTime < _resizeDelta) {
	        setTimeout(checkEndOfResize, _resizeDelta);
	    } else {
	        _resizeTimeOut = false;
	        _isResizing = false;
	    }               
	}

	function handleOnOrientationChange(event){
		_orientationChanged = true;
		setTimeout(handleOnResize, 500);
	}

	function resizeBackgrounds(){
		var newWidth, newHeight, background;


		for(i = 0; i<_backgroundImages.length; i++){
			background = $(_backgroundImages[i]);
			
			//if(background.is(':visible')){
				newWidth = _windowWidth;
	            newHeight = Math.round(newWidth/_backgroundRatio);
				background.width(newWidth);
	            background.height(newHeight);

	            if(newHeight<_windowHeight){
	                newHeight = _windowHeight;
	                newWidth = Math.round(newHeight*_backgroundRatio);
	                background.width(newWidth);
	                background.height(newHeight);
	            }

	            if(background.attr("data-position") == "center"){
					if(newWidth > _windowWidth){
						background.css("left", ((_windowWidth-newWidth)/2) + "px");
					}else{
						background.css("left", "0px");
					}
					
					if(newHeight > _windowHeight){
						background.css("top", ((_windowHeight - newHeight)/2) + "px");
					}else{
						background.css("top", "0px");
					}
				}
			//}
		}
	}

	function handleNavigationRequest(event){
		var type = $(this).data("navigation-type");
		var id = $(this).data("navigation-id");

		switch(type){
			case "section":
				NavigationController.goToPage(id);
				break;
			case "overlay":
				break;
		}

		if(event) event.preventDefault();
	}

	function handleDataParsed(){
		console.log(_debugId + " : handleDataParsed()");
		console.log(DataManager.getDataByGroup("browser").message);
		addListeners();
		handleOnResize();

		if(Utils.isIE() && Utils.getIEVersion() < _minIEVersion && _lockBrowserVersion){
			_messages["UPDATE"].style.display = "block";
		}else{
			//browser is new enough.. let's start
			NavigationController.init();
			MenuController.init();
			Legal.init();
			NavigationController.start();
		}

		Preloader.hide();
	}

	return {
		init:function(){
			//console.log(_debugId + ", init()");
			_window = $(window);
			_html = $('html');
			_body = $('body');

			//messages for user feedback
			var messages = $('.site-message');
			var title;

			for(i = 0; i<messages.length; i++){
				title = $(messages[i]).data("message-title");
				_messages[title] = messages[i];
			}

			_backgroundImages = $('.section-background');

			_homeButton = $('#main-title-link');

			_isMobile = Utils.isMobile();
			_isMobile ? _body.addClass('mobile') : _body.addClass('desktop');

			DataManager.load("files/data/data.json", handleDataParsed);
		}
	}
})();