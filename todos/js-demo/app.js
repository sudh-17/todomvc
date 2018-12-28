(function(){
    var input = document.getElementById('input');
    var btnClear = document.getElementById('btnClear');
    var btnCheck = document.getElementById('btnCheck');

    var ctl = new Controller();

    function initTodos(){
        var list = document.getElementById('list');
        list.innerHTML = '';//**清空 */
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

        //item left
        var left = ctl.itemLeft();
        document.getElementById('itemLeft').innerText = left;

        //display footer
        if(todos == null || todos.length == 0 ){
            document.getElementsByClassName('footer')[0].style.display = 'none';
        }
        else{
            document.getElementsByClassName('footer')[0].style.display = 'block';
        }
    }

    function appendTodo(todo){

        var li=document.createElement("li");
        li.setAttribute('data-id',todo.id);
        var view = document.createElement("div");
        view.setAttribute('class','view');
        var chk = document.createElement('input');
        chk.setAttribute('type','checkbox');
        chk.name = 'items';
        chk.checked = todo.completed;
        chk.onclick = function(){
            //勾选事件
            todo.completed = this.checked;
            ctl.update(todo);
            initTodos();
        };
        var btn = document.createElement('button');
        btn.setAttribute('class','del');
        btn.innerHTML = '×';
        btn.onclick = function(){
            del(todo.id);
        };
        var label = document.createElement('label');
        label.innerHTML = todo.name;
        label.className = todo.completed ? 'done':'';
        view.appendChild(chk);
        view.appendChild(label);
        view.appendChild(btn);
        li.appendChild(view);
        li.ondblclick = function(){
            var edt = document.createElement('input');
            edt.className = 'edit';
            edt.value = todo.name;
            this.appendChild(edt);
            edt.focus();/**获得焦点 */
            edt.onblur = function(){
                todo.name = edt.value;
                ctl.update(todo);
                initTodos();
            };
            edt.onkeydown = function(e){
                if(e.keyCode == 13){
                    todo.name = edt.value;
                    ctl.update(todo);
                    initTodos();
                }
            }
        };
        
        var list = document.getElementById('list');
        list.appendChild(li);
    }

    //** 删除**/
    function del(id){
        ctl.remove(id);
        initTodos();
    }

    /** 初始化**/
    initTodos();

    /**新增 */
    input.onkeydown = function(e){
        if(e.keyCode == 13){
            
            var val = this.value;
            if(val.trim() == ''){
                return ;
            }
            ctl.add(val);
            initTodos();//重新加载todos
            this.value = '';
        }
    }

    /**clear */
    btnClear.onclick = function(e){
        ctl.clearCompleted();
        initTodos();
    }

    /**按钮组事件 */
    var btnGp = document.getElementsByName('btnGp');
    for(var i = 0;i< btnGp.length;i++){
        btnGp[i].onclick = function(){
            for(var i= 0;i < btnGp.length;i++){
                btnGp[i].className = 'btn';
            }
            this.className = 'btn selected';
            initTodos();
        }
    }

    /**全选与反选 */
    btnCheck.onclick = function(){
        ctl.checkedAll(this.checked);
        initTodos();
    }
}())