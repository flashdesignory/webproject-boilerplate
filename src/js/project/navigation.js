var NavigationController = (function(){
	var _debugId = "NavigationController";
	var _currentPageId;
	var _pageFlow = "next";
	var _pages = [];
	var _overlays = [];

	var _transition = "scale";
	var _direction = "horizontal";
	var _transitionOutClassPrev, _transitionOutClassNext, _transitionInClassPrev, _transitionInClassNext;

	function setup(){
		getTransitionClasses();
		for(var i = 0; i<_pages.length; i++){
			_pages[i].setTransitionClasses(_transitionOutClassPrev, _transitionOutClassNext, _transitionInClassPrev, _transitionInClassNext);
		}
	}

	function navigateToPage(name){
		var i;
		for(i = 0; i<_pages.length; i++){
			if(_pages[i].getPageIsTransitioning()) return;
			
			if(_pages[i].getName() == name){
				if(!_pages[i].getIsActive()){
					$(NavigationController).trigger("NAVIGATE_TO_PAGE", name);

					if(i >= _currentPageId || _currentPageId == undefined){
						_pageFlow = "next";
					}else{
						_pageFlow = "prev";
					}

					_currentPageId = i;

					_pages[i].willAppear();
					_pages[i].show(_pageFlow);
					_pages[i].didAppear();
				}
			}
		}

		for(i = 0; i<_pages.length; i++){
			if(_pages[i].getName() != name){
				if(_pages[i].getIsActive()){
					_pages[i].willDisappear();
					_pages[i].hide(_pageFlow);
					_pages[i].didDisappear();
				}
			}
		}
	}

	function navigateToOverlay(name){
		for(var i = 0; i<_overlays.length; i++){
			if(_overlays[i].getName() == name){
				if(!_overlays[i].getIsActive()){
					_overlays[i].willAppear();
					_overlays[i].show();
					_overlays[i].didAppear();
				}
			}
		}
	}

	function navigateFromOverlay(name){
		for(var i = 0; i<_overlays.length; i++){
			if(_overlays[i].getName() == name){
				if(_overlays[i].getIsActive()){
					_overlays[i].willDisappear();
					_overlays[i].hide();
					_overlays[i].didDisappear();
				}
			}
		}
	}

	function getTransitionClasses(){
		switch(_transition){
			case "slide":
				if(_direction == "horizontal"){
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
				if(_direction == "horizontal"){
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
				if(_direction == "horizontal"){
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
	}

	return {
		getSectionByName(name){
			for(var i = 0; i<_pages.length; i++){
				if(_pages[i].getName() == name){
					return _pages[i];
				}
			}
		},
		init:function(){
			var sections = $('.site-section');
			var overlays = $('.site-overlay');

			var title, section, overlay, i;

			for(i = 0; i<sections.length; i++){
				title = $(sections[i]).data("section-title");

				switch(title){
					case "HOME":
						section = new HomePage(sections[i].id, sections[i], title);
						break;
					case "STORY":
						section = new StoryPage(sections[i].id, sections[i], title);
						break;
					case "PHOTOS":
						section = new PhotosPage(sections[i].id, sections[i], title);
						break;
					case "CAST":
						section = new CastPage(sections[i].id, sections[i], title);
						break;
					default:
						section = new Page(sections[i].id, sections[i], title);
				}

				section.init();
				_pages.push(section);
			}

			for(i = 0; i<overlays.length; i++){
				title  = $(overlays[i]).data("overlay-title");
				switch(title){
					case "INTRO":
						overlay = new IntroOverlay(overlays[i].id, overlays[i], title);
						break;
					case "VIDEO":
						overlay = new VideoOverlay(overlays[i].id, overlays[i], title);
						break;
				}

				overlay.init();
				_overlays.push(overlay);
			}

			setup();
		},
		goToPage:function(id){
			navigateToPage(id);
		},
		showOverlay:function(id){
			navigateToOverlay(id);
		},
		hideOverlay:function(id){
			navigateFromOverlay(id);
		},
		start:function(){
			navigateToPage("HOME");
		}
	}
})();