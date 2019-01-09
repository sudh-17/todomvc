(function(){

    function Todo(mame){
		this.model = new app.Model(name);
		this.view = new app.View();
		this.controller = new app.Controller(this.model, this.view);
    }

    var todo = new Todo('todos1');
    todo.controller.showAll();
    //todo.controller.addItem({id: '4',title: 'new title',completed: false});
    todo.controller.bind();
    //todo.controller.showCompleted();
   //todo.controller.showActive();

    /*var ctl = new Controller();

    function initTodos(){
        var list = document.getElementById('list');
        list.innerHTML = '';//**清空 
        var completed = null;
        var btnGp = document.getElementsByName('btnGp');
        for(var i= 0;i < btnGp.length;i++){
            var className = btnGp[i].className;
            if(className.indexOf("selected") != -1){
                var n = btnGp[i].innerText;
                if(n == 'active'){
                    completed = false;
                }
                else if(n == 'completed'){
                    completed = true;
                }
            }
        }     
        //append list
        var todos = ctl.get();

        if(completed == null){
            for(var i =0 ;i< todos.length; i++){
                var item = todos[i];
                appendTodo(item);
            }
        }
        else{
            for(var i =0 ;i< todos.length; i++){
                var item = todos[i];
                if(completed == item.completed){
                    appendTodo(item);
                }
            }
        }

        itemLeft();
        tools();
        isCheckAll();
    }

    //item left
    function itemLeft(){
        var left = ctl.itemLeft();
        document.getElementById('itemLeft').innerText = left;
    }

    function tools(){
        var list = ctl.get();
        if(list.length == 0){
            document.getElementById('btnCheck').style.display = 'none';
            document.getElementById('btnCheck').checked = false;
            document.getElementsByClassName('footer')[0].style.display = 'none';
        }
        else{
            document.getElementById('btnCheck').style.display = 'block';
            document.getElementsByClassName('footer')[0].style.display = 'block';
        }
    }

    function isCheckAll(){
        var items = document.getElementsByName('items');
        var checkAll = false;
        if(items.length > 0){
            checkAll = true;
            for(var i = 0 ;i< items.length;i++){
                if(items[i].checked == false){
                    checkAll =  false;
                    break;
                }
            }
        }
        document.getElementById('btnCheck').checked = checkAll;
    }

    function appendTodo(todo){

        var li=document.createElement("li");
        li.setAttribute('data-id',todo.id);
        li.setAttribute('data-stat',todo.completed ? 'done':'none');
        //li.className = todo.completed ? 'done':'none';
        var view = document.createElement("div");
        view.setAttribute('class','view');
        var chk = document.createElement('input');
        chk.setAttribute('type','checkbox');
        chk.name = 'items';
        chk.checked = todo.completed;
        
        var btn = document.createElement('button');
        btn.setAttribute('class','del');
        btn.innerHTML = '×';
        
        var label = document.createElement('label');
        label.innerHTML = todo.name;
        label.className = todo.completed ? 'done':'';
        view.appendChild(chk);
        view.appendChild(label);
        view.appendChild(btn);
        li.appendChild(view);
        
        label.ondblclick = function(){
            var edt = document.createElement('input');
            edt.className = 'edit';
            edt.value = todo.name;
            var parent = label.parentElement.parentElement;
            parent.appendChild(edt);
            edt.focus();/**获得焦点 
            edt.onblur = function(){
                todo.name = edt.value;
                ctl.update(todo);
                label.innerText = edt.value;
                parent.removeChild(edt);
            };
            edt.onkeydown = function(e){
                if(e.keyCode == 13){
                    todo.name = edt.value;
                    ctl.update(todo);
                    label.innerText = edt.value;
                    parent.removeChild(edt);
                }
            }
        };

        btn.onclick = function(){
            del(todo.id);
        };

        chk.onclick = function(){
            //勾选事件
            todo.completed = this.checked;
            ctl.update(todo);
            label.className = this.checked ? 'done':'';
            itemLeft();
            isCheckAll();
            
        };
        
        var list = document.getElementById('list');
        list.appendChild(li);
    }

    //** 删除*
    function del(id){
        var res = ctl.remove(id);
        console.log(res)
        if(res == true){
            var li = document.getElementsByTagName('li');
            for(var i = 0;i<li.length;i++){
                if(li[i].getAttribute('data-id') == id){
                    document.getElementById('list').removeChild(li[i]);
                    break;
                }
            }
            itemLeft();
            tools();
            isCheckAll();
        }
    }

    

    /**add action 
    function addAction(){
        var input = document.getElementById('input');
        input.onkeydown = function(e){
            if(e.keyCode == 13){
                
                var val = this.value;
                if(val.trim() == ''){
                    return ;
                }
                var newItem = {
                    id: new Date().getTime(),
                    name: val,
                    completed: false
                };
                var res = ctl.add(newItem);
                if(res){
                    this.value = '';
                    appendTodo(newItem);
                    itemLeft();
                    tools();
                    isCheckAll();
                }
            }
        }
    }

    /**clear action
    function clearAction(){
        var btnClear = document.getElementById('btnClear');
        btnClear.onclick = function(e){
            ctl.clearCompleted();
            var list = document.getElementById('list');
            var nodes = list.childNodes;
            var done = [];
            for(var i = 0; i< nodes.length; i++){
                if(nodes[i].getAttribute('data-stat') == 'done'){
                    done.push(nodes[i]);
                }
            }
            for(var i=0;i<done.length;i++){
                list.removeChild(done[i])
            }
            isCheckAll();
        }
    }

    /**all, active, completed action
    function btnGpAction(){
        var btnGp = document.getElementsByName('btnGp');
        for(var i = 0;i< btnGp.length;i++){
            btnGp[i].onclick = function(){
                for(var i= 0;i < btnGp.length;i++){
                    btnGp[i].className = 'btn';
                }
                this.className = 'btn selected';
                initTodos();
                isCheckAll();
            }
        }
    }

    /**checkAll action
    function checkAllAction(){
        document.getElementById('btnCheck').onclick = function(){
            var completed = this.checked;
            ctl.checkedAll(completed);
            var list = document.getElementById('list');
            var nodes = list.childNodes;
            for(var i = 0; i<nodes.length; i++){
                var view = nodes[i].getElementsByClassName('view')[0];
                view.getElementsByTagName('input')[0].checked = completed;
                view.getElementsByTagName('label')[0].className = completed ? 'done':'';
            }
        }
    }

    /** 初始化*
    initTodos();

    addAction();

    clearAction();

    btnGpAction();

    checkAllAction();*/
}())