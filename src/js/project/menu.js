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
	}

	function handleOnClick(event){
		console.log(_debugId + " : handleOnClick(" + $(this).data("navigation-id") + ")");
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
		//if(event) event.preventDefault();
	}

	function updateDisplay(){
		if(_expanded){
			$(_elements["container"]).addClass("expanded").removeClass("collapsed");

		}else{
			$(_elements["container"]).removeClass("expanded").addClass("collapsed");
		}
	}

	return {
		init:function(){
			console.log(_debugId + " : init()");

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