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
		var transitions = Transitions.getTransitionClasses(_transition, _direction);
		_transitionInClassNext = transitions.inNext;
		_transitionInClassPrev = transitions.inPrev;
		_transitionOutClassNext = transitions.outNext;
		_transitionOutClassPrev = transitions.outPrev;

		for(var i = 0; i<_pages.length; i++){
			_pages[i].setPgeTransitionClasses(_transitionOutClassPrev, _transitionOutClassNext, _transitionInClassPrev, _transitionInClassNext);
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