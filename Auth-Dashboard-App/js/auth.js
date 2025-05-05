const pages = {
    register: () => `
        <div class="container">
            <h2>Register</h2>
            <form id="registerForm">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required>
                    <div class="error" id="emailError">Invalid email format</div>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" required>
                    <span class="password-toggle" onclick="togglePassword('password')">👁️</span>
                    <div class="error" id="passwordError">Password must be at least 6 characters</div>
                    <div class="password-strength" id="passwordStrength"></div>
                </div>
                <div class="form-group">
                    <label for="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" required>
                    <span class="password-toggle" onclick="togglePassword('confirmPassword')">👁️</span>
                    <div class="error" id="confirmError">Passwords do not match</div>
                </div>
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <a href="index.html">Login</a></p>
        </div>
    `,
    login: () => `
        <div class="container">
            <h2>Login</h2>
            <form id="loginForm">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" required>
                    <span class="password-toggle" onclick="togglePassword('password')">👁️</span>
                    <div class="error" id="loginError">Invalid email or password</div>
                </div>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="register.html">Register</a></p>
        </div>
    `,
    dashboard: () => {
        const email = getSession();
        const user = getUsers().find(u => u.email === email);
        const initial = user.name.charAt(0).toUpperCase();
        return `
            <div class="container dashboard">
                <div class="dashboard-header">
                    <div class="avatar">${initial}</div>
                    <h2>Welcome, ${user.name}!</h2>
                </div>
                <div class="card">
                    <button onclick="navigateTo('editProfile')">Edit Profile</button>
                    <button onclick="logout()">Logout</button>
                </div>
                <div class="card todo-list">
                    <h3>Your To-Do List</h3>
                    <div class="todo-input-group">
                        <input type="text" id="todoInput" placeholder="Add a new task">
                        <button onclick="addTodo()">Add</button>
                    </div>
                    <div id="todoList">${renderTodos()}</div>
                </div>
                <div class="card data-controls">
                    <button onclick="exportData()">Export Data</button>
                    <input type="file" id="importFile" accept=".json" style="display: none;" onchange="importData(event)">
                    <button onclick="document.getElementById('importFile').click()">Import Data</button>
                </div>
            </div>
        `;
    },
    editProfile: () => {
        const email = getSession();
        const user = getUsers().find(u => u.email === email);
        return `
            <div class="container">
                <h2>Edit Profile</h2>
                <form id="editProfileForm">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" value="${user.name}" required>
                    </div>
                    <div class="form-group">
                        <label for="password">New Password</label>
                        <input type="password" id="password">
                        <span class="password-toggle" onclick="togglePassword('password')">👁️</span>
                        <div class="error" id="passwordError">Password must be at least 6 characters</div>
                        <div class="password-strength" id="passwordStrength"></div>
                    </div>
                    <button type="submit">Save Changes</button>
                </form>
                <button onclick="navigateTo('dashboard')">Back to Dashboard</button>
            </div>
        `;
    }
};

const navigateTo = (page) => {
    const app = document.getElementById('app');
    app.style.opacity = '0';
    setTimeout(() => {
        app.innerHTML = pages[page]();
        app.style.opacity = '1';
        attachEventListeners(page);
        if (page === 'dashboard' && !getSession()) {
            window.location.href = 'index.html';
        }
    }, 300);
};

const attachEventListeners = (page) => {
    if (page === 'register') {
        const form = document.getElementById('registerForm');
        const passwordInput = document.getElementById('password');
        const strengthElement = document.getElementById('passwordStrength');
        passwordInput.addEventListener('input', () => updatePasswordStrength(passwordInput.value, strengthElement));
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            let valid = true;
            document.getElementById('emailError').style.display = 'none';
            document.getElementById('passwordError').style.display = 'none';
            document.getElementById('confirmError').style.display = 'none';

            if (!validateEmail(email)) {
                document.getElementById('emailError').style.display = 'block';
                valid = false;
            }
            if (!validatePassword(password)) {
                document.getElementById('passwordError').style.display = 'block';
                valid = false;
            }
            if (password !== confirmPassword) {
                document.getElementById('confirmError').style.display = 'block';
                valid = false;
            }

            if (valid) {
                const users = getUsers();
                if (users.find(u => u.email === email)) {
                    document.getElementById('emailError').textContent = 'Email already registered';
                    document.getElementById('emailError').style.display = 'block';
                    return;
                }
                users.push({ name, email, password });
                saveUsers(users);
                window.location.href = 'index.html';
            }
        });
    } else if (page === 'login') {
        const form = document.getElementById('loginForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const users = getUsers();
            const user = users.find(u => u.email === email && u.password === password);

            document.getElementById('loginError').style.display = 'none';
            if (user) {
                setSession(email);
                window.location.href = 'dashboard.html';
            } else {
                document.getElementById('loginError').style.display = 'block';
            }
        });
    } else if (page === 'editProfile') {
        const form = document.getElementById('editProfileForm');
        const passwordInput = document.getElementById('password');
        const strengthElement = document.getElementById('passwordStrength');
        passwordInput.addEventListener('input', () => updatePasswordStrength(passwordInput.value, strengthElement));
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const password = document.getElementById('password').value;

            let valid = true;
            document.getElementById('passwordError').style.display = 'none';

            if (password && !validatePassword(password)) {
                document.getElementById('passwordError').style.display = 'block';
                valid = false;
            }

            if (valid) {
                const email = getSession();
                const users = getUsers();
                const userIndex = users.findIndex(u => u.email === email);
                users[userIndex].name = name;
                if (password) users[userIndex].password = password;
                saveUsers(users);
                navigateTo('dashboard');
            }
        });
    }
};

const logout = () => {
    clearSession();
    window.location.href = 'index.html';
};