/**
 * 
 */
//import $ from 'jquery'


(function(window){
	
	function Store(){
		this.version = '.do';
		this.domain = 'http://localhost:8080/todomvc-java/';//域
		this.urls = {
			getAll: this.createURL('getAll'),
			add: this.createURL('add'),
			remove: this.createURL('remove'),
			update: this.createURL('update')
		}
	}

	Store.prototype.createURL  = function (action){
		return this.domain + action + this.version;
	}
	
	Store.prototype.getAll = function(callback){
		callback = callback || function () {};
		$ajax({
        	type: 'get',
        	url: this.urls.getAll,
        	success: function(data){
        		data = data || [];
        		callback.call(this, data);
        	},
        	error: function(stat){
        		console.error(stat+': request data exception!')
        	}
        });
	}

	Store.prototype.add = function(title,callback){
		callback = callback || function () {};
		$ajax({
        	type: 'get',
        	url: this.urls.add,
        	data: {title: title},
        	success: function(newItem){
        		callback.call(this, newItem);
        	},
        	error: function(stat){
        		console.error(stat+': request data exception!')
        	}
        });
	}
	
	Store.prototype.remove = function(id,callback){
		callback = callback || function () {};	
		$ajax({
        	type: 'get',
        	url: this.urls.remove,
        	data: {id: id},
        	success: function(id){
        		callback.call(this,id);
        	},
        	error: function(stat){
        		console.error(stat+': request data exception!')
        	}
        });
	}
	
	Store.prototype.update = function(data,callback){
		callback = callback || function () {};
		$ajax({
        	type: 'get',
        	url: this.urls.update,
        	data: data,
        	success: function(updateItem){
        		callback.call(this,updateItem);
        	},
        	error: function(stat){
        		console.error(stat+': request data exception!')
        	}
        });
	}
	
	
	window.app = window.app || {};
	window.app.Store = Store;
	
}(window))