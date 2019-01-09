/**
 * author sdh
 * 数据层
 */
(function(window){
    function Store(name){
        this._dbName = name;
        var local = localStorage.getItem(name);
        if(local == null){
            localStorage.setItem(name,JSON.stringify([]));
        }
        
        let todos = JSON.parse(localStorage.getItem(this._dbName));
        todos.push({id: '1', title: 'JJ',completed: false});
        todos.push({id: '2', title: 'DD',completed: false});
        todos.push({id: '3', title: 'FF',completed: false});
        localStorage.setItem(this._dbName,todos);

    }
    
    Store.prototype.save = function(){
        
    }

    Store.prototype.findAll = function(callback){
        callback = callback || function () {};
        console.log('local');
        console.log(JSON.parse(localStorage.getItem(this._dbName)))
		callback.call(this, JSON.parse(localStorage.getItem(this._dbName)));
    }

    window.app = window.app || {};
    window.app.Store = Store;
}(window))


/*
Store.prototype = {
    save: function(updateData,callback,id){

    },
    findAll: function(callback){
        callback = callback || function () {};
		callback.call(this, JSON.parse(localStorage.getItem(this._dbName)));
    },
    get: function(){
        var list = JSON.parse(localStorage.getItem(this.name));
        return list;
    },
    set: function(list){
        localStorage.setItem(this.name,JSON.stringify(list));
    },
    add: function(newItem){
        var list = JSON.parse(localStorage.getItem(this.name));
        list.push(newItem);
        localStorage.setItem(this.name,JSON.stringify(list));
    },
    remove: function(id,equals){
        var list = JSON.parse(localStorage.getItem(this.name));
        var res = false;
        for(var i = 0; i< list.length; i++){
            if(equals.call(this,id,list[i])){
                list.splice(i,1);
                res = true;
            }
        }
        localStorage.setItem(this.name,JSON.stringify(list));
        return res;
    },
    destroy: function(){
        localStorage.setItem(this.name,JSON.stringify([]));
    },
    toString: function(){
        var list = JSON.parse(localStorage.getItem(this.name));
        console.log(list)
    }   
}*/