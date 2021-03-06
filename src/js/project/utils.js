var Utils = (function(){
	var _debugId = "utils";
	var _isIE;
	var _ieVersion;
	var _isMobile;
	var _isIOS;
	var _isIphone;
	var _isAndroid;
	var _iosVersion;
	var _androidVersion;
	var _webkitVersion;

	return {
		addListener:function(_obj, _type, _function, _capture){
			if(document.addEventListener){
				_obj.addEventListener(_type, _function, _capture);	
			}else if(document.attachEvent){
				_obj.attachEvent('on' + _type, _function);	
			}else{
				_obj['on' + _type] = _function;	
			}
		},
		removeListener:function(_obj, _type, _function){
			if(document.removeEventListener){
				_obj.removeEventListener(_type, _function);	
			}else if(document.detachEvent){
				_obj.detachEvent('on' + _type, _function);	
			}
		},
		getEventTarget:function(_event){
			if(window.event != null) return window.event.srcElement;
			else return _event.currentTarget;
		},
		preventDefault:function(_event){
			if(window.event != null) window.event.returnValue = false;
			else _event.preventDefault();

		},
		dispatchEvent:function(_obj, _type){
			var e = null;
			if(document.dispatchEvent){
				e = document.createEvent('HTMLEvents');
				e.initEvent(_type, true, true);
				_obj.dispatchEvent(e);
			}else{
				e = document.createEventObject();
				_obj.fireEvent('on' + _type, e);
			}
		},
		dispatchCustomEvent:function(_obj, _type, _data){
			_obj.dispatchEvent(new CustomEvent(_type, {detail:_data}));
		},
		addClass:function(element, value){
			if(element){
				if(element.classList){
					var classes = element.classList;
					if(!classes.contains(value)){
						classes.add(value);
					}
				}
			}
		},
		removeClass:function(element, value){
			if(element){
				if(element.classList){
					var classes = element.classList;
					classes.remove(value);
				}
			}
		},
		hasClass:function(element, value){
			var temp = false;
			if(element){
				if(element.classList){
					var classes = element.classList;
					if(classes.contains(value)){
						temp = true;
					}
				}
			}
			return temp;
		},
		getBreakpoint:function(){
			var div = document.getElementById("breakpoints");
			var tag = window.getComputedStyle(div,":after").getPropertyValue("content");

			if(_isIE == undefined){
				Utils.isIE();
			}

			if(tag){
				if (_isIE) {
					tag = tag.replace(/"/g,"");
				}else{
					tag = tag.replace(/"/g,""); 
			   		tag = tag.replace(/(^')|('$)/g, '');
				}
			}else{
				tag = "NaN";
			}
				 		   
		    return parseInt(tag);
		},
		isMobile:function(){
			if(_isMobile == undefined){
				var a = navigator.userAgent;
				if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))){
					_isMobile = true;
				} else {
					_isMobile = false;
				}
			}
			return _isMobile;
		},
		isIE:function(){
			if(_isIE == undefined){
				var ua = navigator.userAgent;
	            if (ua.indexOf("MSIE ") > 0 || ua.indexOf("Trident") > 0 || ua.indexOf("Edge") > 0){
	            	_isIE = true;
	            }else{
	            	_isIE = false;
            	}
			}
            return _isIE;
		},
		getIEVersion:function(){
			if(_ieVersion == undefined){
				var ua = navigator.userAgent;
		        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");

		        if (ua.indexOf("MSIE ") > 0){
		        	if (re.exec(ua) != null)
		            _ieVersion = parseFloat(RegExp.$1);
		        }
			}

			return _ieVersion;
		},
		isAndroid:function(){
			if(_isAndroid == undefined){
				if((navigator.userAgent.match(/android/i))){
					_isAndroid = true;
				} else {
					_isAndroid = false;
				}
			}
			return _isAndroid;
		},
		getAndroidVersion:function(){
			if(_androidVersion == undefined){
				var ua = navigator.userAgent.toLowerCase(); 
			    var match = ua.match(/android\s([0-9\.]*)/);
			    _androidVersion =  match ? match[1] : false;
			}

			return _androidVersion;
		},
		getWebkitVersion:function(){
			if(_webkitVersion == undefined){
				_webkitVersion = navigator.appVersion.match(/.*Chrome\/([0-9\.]+)/)[1];
			}

			return _webkitVersion; 
		},
		formatTime: function(seconds){
			seconds = Math.round(seconds);
			minutes = Math.floor(seconds / 60);
			minutes = (minutes >= 10) ? minutes : "0" + minutes;
			seconds = Math.floor(seconds % 60);
			seconds = (seconds >= 10) ? seconds : "0" + seconds;
			return minutes + ":" + seconds;
		},
		getClosest:function (elem, selector){
		    var firstChar = selector.charAt(0);
		    for (; elem && elem !== document; elem = elem.parentNode){
		        if (firstChar === '.') {
		            if (elem.classList.contains( selector.substr(1))){
		                return elem;
		            }
		        }
		        if (firstChar === '#'){
		            if (elem.id === selector.substr(1)){
		                return elem;
		            }
		        } 
		        if ( firstChar === '['){
		            if (elem.hasAttribute( selector.substr(1, selector.length - 2))){
		                return elem;
		            }
		        }
		        if (elem.tagName.toLowerCase() === selector){
		            return elem;
		        }
		    }
		    return false;
		},
		selectorMatches:function(el, selector) {
			var p = Element.prototype;
			var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
				return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
			};
			return f.call(el, selector);
		},
		getParameterByName:function(name){
		    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		        results = regex.exec(location.search);
		    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
		},
		shuffle:function(array){
		    for(var j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
		    return array;
		},
		sortByKey:function(array, key) {
		    return array.sort(function(a, b) {
		        var x = a[key]; var y = b[key];
		        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		    });
		}
	}
})();

if (!window.getComputedStyle) {
	window.getComputedStyle = function(el, pseudo) {
		this.el = el;
		this.getPropertyValue = function(prop) {
			var re = /(\-([a-z]){1})/g;
			if (prop == 'float') prop = 'styleFloat';
			if (re.test(prop)) {
				prop = prop.replace(re, function () {return arguments[2].toUpperCase();});
			}
			return el.currentStyle[prop] ? el.currentStyle[prop] : null;
		}
		return this;
	}
}