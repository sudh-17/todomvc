/**
 * author sdh
 */
(function(window){
    function Model(_dbName){
        this._dbName = _dbName;
        var local = localStorage.getItem(this._dbName);
        if(local == null){
            localStorage.setItem(this._dbName,JSON.stringify([]));
        }
    }

    Model.prototype.add = function(title,callback){
        callback = callback || function () {};
        var list = JSON.parse(localStorage.getItem(this._dbName));
        var newItem = {
            id : new Date().getTime(),
            title: title,
            completed: false
        };
        list.push(newItem);
        localStorage.setItem(this._dbName,JSON.stringify(list));
        callback.call(this,newItem);
    }

    Model.prototype.remove = function(id,callback){
        callback = callback || function () {};
        var list = JSON.parse(localStorage.getItem(this._dbName));
        for(var i = 0; list.length;i++){
            if(id == list[i].id){
                list.splice(i,1);
                break;
            }
        }
        localStorage.setItem(this._dbName,JSON.stringify(list));
        callback.call(this,id);
    }

    Model.prototype.update = function(updateItem,callback){
        callback = callback || function () {};
        var list = JSON.parse(localStorage.getItem(this._dbName));
        for(var i = 0; list.length;i++){
            if(updateItem.id == list[i].id){
                list[i] = updateItem;
                break;
            }
        }
        localStorage.setItem(this._dbName,JSON.stringify(list));
        callback.call(this,updateItem);
    }

    Model.prototype.changeAllStatus = function(status,callback){
        callback = callback || function () {};
        var list = JSON.parse(localStorage.getItem(this._dbName));
        for(let i = 0; i < list.length; i++){
            list[i].completed = status;
        }
        localStorage.setItem(this._dbName,JSON.stringify(list));
        callback.call(this,list);
    }

    Model.prototype.read = function(callback,equals, filter){
       // this.storage.findAll(callback);
        callback = callback || function () {};
        var list = JSON.parse(localStorage.getItem(this._dbName));
        if(equals == null || filter == null){
            callback.call(this, list);
        }
        else{
            var subList = [];
            for(var i = 0;i < list.length; i++){
                if(equals.call(this,filter,list[i])){
                    subList.push(list[i]);
                }
            }
            callback.call(this, subList);
        }
    }

    Model.prototype.findById = function(id){
        var list = JSON.parse(localStorage.getItem(this._dbName));
        var item = null;
        for(var i = 0;i < list.length; i++){
            if(id == list[i].id){
                item = list[i];
            }
        }
        return item;
    }

    Model.prototype.counter = function(callback){
        callback = callback || function () {};
        var list = JSON.parse(localStorage.getItem(this._dbName));
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
    }

    /**
     Model.prototype.save = function(newItem,callback){
        callback = callback || function () {};
        var list = JSON.parse(localStorage.getItem(this._dbName));
        list.push(newItem);
        localStorage.setItem(this._dbName,JSON.stringify(list));
        callback.call(this,list);
    }
     */
    window.app = window.app || {};
    window.app.Model = Model;
}(window))