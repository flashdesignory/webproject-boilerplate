(function(){
	function VideoOverlay(id, node, name){
		var _debugId = "VideoOverlay";
		var _super = new Overlay(id, node, name);
		var _elements = [];
		var _youtubeId = "r_rSAbYyIq0";
		var _youtubePlayer;
		var _apiReady = false;

		for(var name in _super){
			this[name] = _super[name];
		}

		function handleAPIReady(){
			_apiReady = true;
		}

		function addListeners(){
			$(_elements["close"]).bind('click', handleOnClick);
		}

		function removeListeners(){
			$(_elements["close"]).unbind('click', handleOnClick);
		}

		function handleOnClick(event){
			NavigationController.hideOverlay("VIDEO");
			event.preventDefault();
		}

		function addPlayer(){
			_youtubePlayer = new YT.Player(_elements["player"], {
		        height: '100%',
		        width: '100%',
		        videoId: _youtubeId,
				playerVars: {  /*'html5': 1, */'autoplay': 1, 'controls': 1,'autohide':1, 'wmode':'opaque', 'showinfo' : 0, 'rel' : 0 },
		        events: {
		            'onReady': onPlayerReady,
		            'onStateChange': onPlayerStateChange
		        }
		    });
		}

		function removePlayer(){
			_youtubePlayer.destroy();
		}

		function disableVideo(){
			if(_youtubePlayer.getPlayerState){
				if(_youtubePlayer.getPlayerState() == 1){
					_youtubePlayer.pauseVideo();
				}
			}
		}

		function onPlayerReady(event){
			console.log("onPlayerReady()");
			//if($('body').hasClass("desktop")){
			//	event.target.playVideo();
			//}
	    }

	    function onPlayerStateChange(event){
		   	console.log("onPlayerStateChange(" + event.data + ")");
		   	if(event.data == 0){
		   		//if($('body').hasClass("desktop")){
					$(_elements["close"]).trigger("click");
			//	}
		   	}
	   }

		this.didAppear = function(){
			addListeners();
			addPlayer();
			_super.didAppear();
		};

		this.willDisappear = function(){
			removeListeners();
			removePlayer();
			_super.willDisappear();
		}

		this.init = function(id){
			if(id) _youtubeId = id;

			YT.ready(function(){
				handleAPIReady();
			})

			var elements =$(_super.getNode()).find('[data-module="video"]');
			for(var i = 0; i<elements.length; i++){
				var type = $(elements[i]).data("type");
				_elements[type] = elements[i];
			}

			_super.init();
		}

		this.constructor = Overlay;
	}

	Overlay.allowInstance = false;
	VideoOverlay.prototype = new Overlay();
	Overlay.allowInstance = true;

	window.VideoOverlay = VideoOverlay;
})(window);