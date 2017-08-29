var Legal = (function(){
	var _debugId = "Legal";
	var _elements = [];
	var _expanded = false;

	function addListeners(){
		$(_elements["close"]).bind('click', handleOnClick);
		$(_elements["open"]).bind('click', handleOnClick);
	}

	function handleOnClick(event){
		console.log(_debugId + " : handleOnClick()");
		_expanded = !_expanded;
		updateDisplay();
		if(event) event.preventDefault();
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
			var elements =$(document).find('[data-module="legal"]');
			for(var i = 0; i<elements.length; i++){
				var type = $(elements[i]).data("type");
				_elements[type] = elements[i];
			}

			updateDisplay();
			addListeners();
		}
	}
})();