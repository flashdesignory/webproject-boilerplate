(function(){
	function Overlay(id, node, name){
		if(Overlay.allowInstance){
			var _debugId = id;
			var _name = name;
			var _id = id;
			var _node = node;
			var _enabled = false;
			var _isActive = false;

			this.getId = function(){
				return _id;
			}

			this.getNode = function(){
				return _node;
			}

			this.getName = function(){
				return _name;
			}

			this.getEnabled = function(){
				return _enabled;
			}

			this.getIsActive = function(){
				return _isActive;
			}

			this.init = function(){}

			this.enable = function(){
				_enabled = true;
			}

			this.disable = function(){
				_enabled = false;
			}

			this.willAppear = function(){
				_isActive = true;
			}

			this.didAppear = function(){}

			this.willDisappear = function(){
				_isActive = false;
			}

			this.didDisappear = function(){}

			this.show = function(){
				_node.style.display = "block";
			}

			this.hide = function(){
				_node.style.display = "none";
			}
		}
		this.constructor = Overlay;
	}
	Overlay.allowInstance = true;
	window.Overlay = Overlay;
})();