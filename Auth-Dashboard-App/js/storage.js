const getUsers = () => JSON.parse(localStorage.getItem('users')) || [];
const saveUsers = (users) => localStorage.setItem('users', JSON.stringify(users));
const setSession = (email) => sessionStorage.setItem('loggedIn', email);
const getSession = () => sessionStorage.getItem('loggedIn');
const clearSession = () => sessionStorage.removeItem('loggedIn');

const getTodos = () => JSON.parse(localStorage.getItem('todos')) || [];
const saveTodos = (todos) => localStorage.setItem('todos', JSON.stringify(todos));
const renderTodos = () => {
    const todos = getTodos();
    return todos.map((todo, index) => `
        <div class="todo-item">
            <span>${todo}</span>
            <button onclick="deleteTodo(${index})">Delete</button>
        </div>
    `).join('');
};
const addTodo = () => {
    const input = document.getElementById('todoInput');
    const todo = input.value.trim();
    if (todo) {
        const todos = getTodos();
        todos.push(todo);
        saveTodos(todos);
        input.value = '';
        document.getElementById('todoList').innerHTML = renderTodos();
    }
};
const deleteTodo = (index) => {
    const todos = getTodos();
    todos.splice(index, 1);
    saveTodos(todos);
    document.getElementById('todoList').innerHTML = renderTodos();
};

const exportData = () => {
    const data = {
        users: getUsers(),
        todos: getTodos()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user_data.json';
    a.click();
    URL.revokeObjectURL(url);
};

const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.users) saveUsers(data.users);
                if (data.todos) saveTodos(data.todos);
                alert('Data imported successfully!');
                if (getSession()) navigateTo('dashboard');
            } catch (err) {
                alert('Invalid JSON file');
            }
        };
        reader.readAsText(file);
    }
};

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) => password.length >= 6;