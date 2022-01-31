window.addEventListener('DOMContentLoaded', () => {

    // Selectors
    const todoInput = document.querySelector('.todo-input'),
        todoButton = document.querySelector('.todo-button'),
        todoList = document.querySelector('.todo-list'),
        filterOptions = document.querySelector('.filter-todo')

    // Event Listeners
    todoButton.addEventListener('click', addTodo);
    todoList.addEventListener('click', deleteCheck);
    filterOptions.addEventListener('click', filterTodo)

    // Functions
    function addTodo(event) {
        event.preventDefault();
        // Todo Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        // Create List
        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)

        // Add todo to local storage 
        saveLocalTodos(todoInput.value)

        // check murk button
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.classList.add('complete-btn')
        todoDiv.appendChild(completeButton);

        // check trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn')
        todoDiv.appendChild(trashButton)

        // append to listener 
        todoList.appendChild(todoDiv)
        todoInput.value = '';
    }

    // Delete func
    function deleteCheck(e) {
        const item = e.target;

        if (item.classList[0] === 'trash-btn') {
            const todo = item.parentElement;
            todo.classList.add('fall');
            todo.addEventListener('transitionend', function () {
                todo.remove()
            })
        }

        if (item.classList[0] === 'complete-btn') {
            const todo = item.parentElement;
            todo.classList.toggle('completed')
        }
    }

    // Filter Todo
    function filterTodo(e) {
        const todos = todoList.childNodes;
        todos.forEach(function (todo) {
            console.log(e.target.value);
            switch (e.target.value) {
                case 'all':
                    todo.style.display = 'flex'
                    break;

                case 'completed':
                    if (todo.classList.contains('completed')) {
                        todo.style.display = 'flex'
                    } else {
                        todo.style.display = 'none'
                        
                    }
                    break;

                    case 'uncompleted':
                    if (todo.classList.contains('completed')) {
                        todo.style.display = 'none'
                    } else {
                        todo.style.display = 'flex'
                        
                    }
                    break;
            }
        })
    }

    // Save local todos
    function saveLocalTodos(todo) {
        let todos;
        if (localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'))
        }

        todos.push(todo)
    }
}) 
