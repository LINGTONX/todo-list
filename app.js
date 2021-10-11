  
let addTaskButton = document.getElementById('addTask');
let taskInputField = document.getElementById('taskInput');
let toDolist = document.getElementById('toDolist');
let doList = document.getElementsByClassName('dolis');
let todoKey = 'todokey';
let todos;

// var sampletodo = [
//     {
//         task: "i will go to market",
//         complete: "true"
//     },
//     {
//         task: "i will go to market",
//         complete: "false"
//     },
// ];

todos = JSON.parse(localStorage.getItem(todoKey)) || [];
 previousTodos();

addTaskButton.addEventListener('click', function(){
    if (taskInputField.value.trim().length < 5){
        alert('Add task please');
        return 
    }

    addToLocalStorage(taskInputField.value);
    taskInputField.value = '';
});


function addToLocalStorage(todo){
    let newTodo = {
        task: todo,
        complete: false
    }
    
    todos.push(newTodo);
    localStorage.setItem(todoKey,JSON.stringify(todos));
    showTodo(newTodo, todos.length-1)
}

function showTodo(newTodo,index){
    var str = '<div class="dolis">'+
    '<div>'+
    '<p>'+ newTodo.task +'</p>'+ 
    '</div>'+
    
    '<div id="'+ index +'">'+
        '<button onclick="editTodo(this)" class="editBtn">Edit</button>'+
        '<button onclick="deleteFromLocalStorage(this)" class="deleteBtn">Delete</button>'+
    '</div>'+
    '</div>';
    toDolist.insertAdjacentHTML('beforeend', str)
}

function previousTodos(){
    todos.forEach((element, index) => {
        showTodo(element,index)
    });
}

function deleteFromLocalStorage(e){
    var index = e.parentNode.getAttribute("id");
    todos.splice(index,1)
    localStorage.setItem(todoKey,JSON.stringify(todos));
    e.closest(".dolis").remove();
}

function editTodo(e){
   let div =  e.parentNode.previousSibling.firstChild.innerHTML;
   var editfield = '<input class="editInputField" type="text" value="'+ div +'">'+
   '<button id="editSubmitBtn" class="" onclick="saveEditedTodo(this)" class="deleteBtn">Save</button>';
   e.parentNode.previousSibling.innerHTML = editfield
}

function saveEditedTodo(e){
    var todoEdited = e.previousSibling.value.trim();
    if (todoEdited.length < 5){
        alert('Add task please');
        return 
    }
    var index = e.parentNode.nextSibling.getAttribute("id");
    todos[index].task = todoEdited;
    e.parentNode.innerHTML =  '<p>'+ todoEdited +'</p>';
    localStorage.setItem(todoKey,JSON.stringify(todos));
}