(function(){

    function Todo(mame){
    	this.store = new app.Store();
		this.model = new app.Model(this.store);
		this.view = new app.View();
		this.controller = new app.Controller(this.model, this.view);
    }

    var todo = new Todo('todos1');
    todo.controller.showAll();
    todo.controller.bind();
    
}())