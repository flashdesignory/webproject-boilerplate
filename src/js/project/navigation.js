var NavigationController = (function(){
	var _debugId = "NavigationController";
	var _currentPage, _currentPageId;
	var _pages = [];
	var _overlays = [];

	function navigateToPage(name){
		//console.log(_debugId + " : navigateToPage(" + name + ")");
		for(var i = 0; i<_pages.length; i++){
			if(_pages[i].getName() == name){
				if(!_pages[i].getIsActive()){
					$(document).trigger("NAVIGATE_TO_PAGE", name);
					_pages[i].willAppear();
					_pages[i].show();
					_pages[i].didAppear();
				}
			}else{
				if(_pages[i].getIsActive()){
					_pages[i].willDisappear();
					_pages[i].hide();
					_pages[i].didDisappear();
				}
			}
		}
	}

	function navigateToOverlay(name){
		//console.log(_debugId + " : navigateToOverlay(" + name + ")");
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
		//console.log(_debugId + " : navigateFromOveraly(" + name + ")");
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
			//console.log(_debugId + " : init()");

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
		},
		goToPage:function(id){
			//console.log(_debugId + " : goToPage()");
			navigateToPage(id);
		},
		showOverlay:function(id){
			navigateToOverlay(id);
		},
		hideOverlay:function(id){
			navigateFromOverlay(id);
		},
		start:function(){
			//console.log(_debugId + " : start()");
			navigateToPage("HOME");
		}
	}
})();