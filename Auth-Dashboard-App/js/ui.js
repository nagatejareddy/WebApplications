const toggleTheme = () => {
    const theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    document.body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
};

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.dataset.theme = savedTheme;

const togglePassword = (id) => {
    const input = document.getElementById(id);
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    const toggle = input.nextElementSibling;
    toggle.textContent = isPassword ? '🙈' : '👁️';
};

const updatePasswordStrength = (password, strengthElement) => {
    let strength = 'weak';
    if (password.length >= 12 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
        strength = 'strong';
    } else if (password.length >= 8 && /[A-Z]/.test(password)) {
        strength = 'medium';
    }
    strengthElement.className = `password-strength strength-${strength}`;
};