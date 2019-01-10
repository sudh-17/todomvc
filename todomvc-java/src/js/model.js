/**
 * author sdh
 */
(function(window){
    function Model(store){
    	this.store = store;
    }

    Model.prototype.read = function(callback,equals, filter){
        this.store.getAll(callback);
    }

    Model.prototype.add = function(title,callback){
        this.store.add(title,callback);
    }

    Model.prototype.remove = function(id,callback){
        this.store.remove(id,callback);
    }

    Model.prototype.update = function(id,title,completed,callback){
        var data = {
        		id: id,
        		title: title,
        		completed: completed
        };
    	this.store.update(data,callback);
        
    }

    Model.prototype.counter = function(callback){
        this.store.getAll(function(list){
            var counter = {};
            counter.undone = 0;
            counter.done = 0;
            counter.total = list.length;
            for(let i = 0;i < list.length; i++){
                if(list[i].completed == false){
                    counter.undone ++;
                }
                else{
                    counter.done ++;
                }
            }
            callback.call(this,counter);
        });
    }

    Model.prototype.changeAllStatus = function(status,callback){
        /*callback = callback || function () {};
        var list = JSON.parse(localStorage.getItem(this._dbName));
        for(let i = 0; i < list.length; i++){
            list[i].completed = status;
        }
        localStorage.setItem(this._dbName,JSON.stringify(list));
        callback.call(this,list);*/
    }
    
    window.app = window.app || {};
    window.app.Model = Model;
}(window))