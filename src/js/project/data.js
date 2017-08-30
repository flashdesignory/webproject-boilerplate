var DataManager = (function(){
	var _debugId = "DataManager";
	var _data;

	return {
		load:function(url, callback){
			$.getJSON(url, function( data ) {
				_data = data;
				if(callback) callback();
				$(DataManager).trigger('COMPLETE');
			});
		},
		getDataByGroup:function(id){
			return _data[id];
		}
	}
})();