var MenuController = (function(){
	var _debugId = "MenuController";
	var _expanded = false;
	var _buttons = [];
	var _elements = [];

	function addListeners(){
		for(var i = 0; i<_buttons.length; i++){
			$(_buttons[i]).bind('click', handleOnClick);
		}

		$(_elements["open"]).bind('click', open);
		$(_elements["navigation"]).bind('click', close);

		$(NavigationController).bind('NAVIGATE_TO_PAGE', updateNavigation);
	}

	function handleOnClick(event){
		var type = $(this).data("navigation-type");
		var id = $(this).data("navigation-id");

		switch(type){
			case "section":
				NavigationController.goToPage(id);
				break;
			case "overlay":
				NavigationController.showOverlay(id);
				break;
		}

		if(event) event.preventDefault();
	}

	function open(event){
		if(!_expanded){
			_expanded = true;
		}
		updateDisplay();
		if(event) event.preventDefault();
	}

	function close(event){
		if(_expanded){
			_expanded = false;
		}
		updateDisplay();
		if(event) event.preventDefault();
	}

	function updateDisplay(){
		if(_expanded){
			$(_elements["container"]).addClass("expanded").removeClass("collapsed");
			$(_elements["navigation"]).addClass("expanded").removeClass("collapsed");
		}else{
			$(_elements["container"]).removeClass("expanded").addClass("collapsed");
			$(_elements["navigation"]).removeClass("expanded").addClass("collapsed");
		}
	}

	function updateNavigation(event, page){
		for(var i = 0; i<_buttons.length; i++){
			var type =$(_buttons[i]).data("navigation-type");
			var id = $(_buttons[i]).data("navigation-id");
			if(type == "section"){
				if(id == page){
					$(_buttons[i]).addClass("active");
				}else{
					$(_buttons[i]).removeClass("active");
				}
			}
		}
	}

	return {
		init:function(){
			var elements =$(document).find('[data-module="menu"]');
			for(var i = 0; i<elements.length; i++){
				var type = $(elements[i]).data("type");
				_elements[type] = elements[i];
			}

			_buttons = $('.navigation-item');
			updateDisplay();
			addListeners();
		}
	}
})();