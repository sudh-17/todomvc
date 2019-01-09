/***
 * author sdh
 */
(function(window){
    function Controller(model,view){
        this.model = model;
        this.view = view;
    }
    
    Controller.prototype.showAll = function(){
        var self = this;
        self.model.read(function(data){
            self.view.showItems(data);
        });
        self.model.counter(function(counter){
            self.view.counter(counter);
        })
    }

    Controller.prototype.showActive = function(){
        var self = this;
        var filter = false;
        self.model.read(function(data){
            self.view.showItems(data);
        },function(a,b){
            if(a == b.completed){
                return true;
            }
        },filter);
    }

    Controller.prototype.showCompleted = function(){
        var self = this;
        var filter = true;
        self.model.read(function(data){
            self.view.showItems(data);
        },function(a,b){
            if(a == b.completed){
                return true;
            }
        },filter);
    }

    Controller.prototype.addItem = function(newItem){
        var self = this;
        self.model.add(newItem,function(item){
            self.view.addItem(item);
        });
        self.model.counter(function(counter){
            self.view.counter(counter);
        })
    }

    Controller.prototype.bind = function(){
        var self = this;
        self.view.bindAddAction(function(event){
            if(event.keyCode == 13){
                var val = qs('.new-todo').value;
                self.addItem(val);
                self.view.clearNewTodo();
            }
        });

        self.view.bindDelAction(function(event){
            var target = event.target;
            var p = target.parentNode.parentNode;
            var id = p.getAttribute('data-id');
            self.model.remove(id,function(id){
                self.view.removeItem(id);
            });
            self.model.counter(function(counter){
                self.view.counter(counter);
            })
        });

        self.view.bindFilterAction(function(event){
            var target = event.target;
            var filter = target.innerText;
            self.view.setFilter(filter);
            if(filter == 'All'){
                self.showAll();
            }
            else if(filter == 'Active'){
                self.showActive();
            }
            else if(filter == 'Completed'){
                self.showCompleted();
            }
        });

        self.view.bindToggleAction(function(event){
            var target = event.target;
            var li = target.parentNode.parentNode;
            var id = li.getAttribute('data-id');
            var item = self.model.findById(id);
            item.completed = target.checked;
            self.model.update(item,function(updateItem){
                self.view.updateItem(updateItem);
            });
            self.model.counter(function(counter){
                self.view.counter(counter);
            })
        });

        self.view.bindToggleAllAction(function(event){
            var toggleAll = event.target;
            self.model.changeAllStatus(toggleAll.checked,function(data){
                self.view.showItems(data);
            })
        })
    }

    window.app = window.app || {};
    window.app.Controller = Controller;
}(window))

