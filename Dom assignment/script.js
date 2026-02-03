const input = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const listContainer = document.getElementById('todoList');

let todos = JSON.parse(localStorage.getItem('myTodos')) || [];

function render() {
    listContainer.innerHTML = '';

    if (todos.length === 0) {
        listContainer.innerHTML = '<div class="empty-state">No tasks yet. Add one above!</div>';
        return;
    }

    todos.forEach(todo => {
        const div = document.createElement('div');
        div.className = 'todo-item';

        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = todo.text;

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'actions';

        const editButton = document.createElement('button');
        editButton.className = 'btn-sm btn-edit';
        editButton.textContent = 'Edit';
        editButton.onclick = () => editTodo(todo.id);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn-sm btn-delete';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTodo(todo.id);

        actionsDiv.appendChild(editButton);
        actionsDiv.appendChild(deleteButton);

        div.appendChild(span);
        div.appendChild(actionsDiv);
        listContainer.appendChild(div);
    });
}

function save() {
    localStorage.setItem('myTodos', JSON.stringify(todos));
    render();
}

function addTodo() {
    const text = input.value.trim();
    if (!text) return;

    const todo = {
        id: Date.now(),
        text: text
    };

    todos.push(todo);
    input.value = '';
    save();
    input.focus();
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    save();
}

function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const newText = prompt("Edit task:", todo.text);
    if (newText !== null && newText.trim() !== "") {
        todo.text = newText.trim();
        save();
    }
}
addBtn.addEventListener('click', addTodo);
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});


render();
