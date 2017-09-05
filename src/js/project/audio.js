var AudioController = (function(){
	var _debugId = "AudioController";
	var _elements = [];

	var _isPlaying = false;
	var _isMuted = false;

	var _source = "files/audio/Overture.mp3";
	var _player;

	function setup(){
		_player = new Audio(_source);
		_player.play();
	}

	function addListeners(){
		$(_elements["mute"]).bind('click', handleOnClick);
		$(_elements["unmute"]).bind('click', handleOnClick);
	}

	function handleOnClick(event){
		_isMuted = !_isMuted;

		if(_isMuted){
			_player.muted = true;
		}else{
			_player.muted = false;
		}

		updateDisplay();
		event.preventDefault();
	}


	function updateDisplay(){
		if(_isMuted){
			$(_elements["mute"]).hide();
			$(_elements["unmute"]).show();
		}else{
			$(_elements["mute"]).show();
			$(_elements["unmute"]).hide();
		}
	}

	return {
		init:function(){
			var elements =$(document).find('[data-module="audio"]');
			for(var i = 0; i<elements.length; i++){
				var type = $(elements[i]).data("type");
				_elements[type] = elements[i];
			}

			setup();

			addListeners();
			updateDisplay();
		}
	}
})();