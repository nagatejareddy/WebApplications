# Auth Dashboard App



A modern, client-side web application built with HTML, CSS, and JavaScript, featuring user authentication, profile management, and a to-do list. The app includes a visually appealing dashboard with a card-based layout, dark/light mode, password strength indicators, and JSON data import/export functionality.

## Features

- **User Authentication**: Register and log in with email and password, with client-side validation.
- **Profile Management**: Edit user name and password via a dedicated profile page.
- **To-Do List**: Add, view, and delete tasks, stored in `localStorage`.
- **Password Visibility Toggle**: Show/hide passwords with an interactive eye icon.
- **Password Strength Indicator**: Visual feedback (weak, medium, strong) during password entry.
- **Dark/Light Mode**: Toggle between themes, with preferences saved in `localStorage`.
- **JSON Import/Export**: Backup and restore user data and to-do lists as JSON files.
- **Responsive Design**: Optimized for desktop and mobile devices with a modern, card-based dashboard.
- **Smooth Animations**: Fade-in transitions between pages and interactive button effects.
- **Session Management**: Maintains login state using `sessionStorage`.


## Installation

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari).
- A local web server (e.g., XAMPP, Node.js `http-server`, or Python’s `http.server`) for optimal performance.
- Optional: Git for cloning the repository.

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/Auth-Dashboard-App.git
   cd Auth-Dashboard-App
   ```

2. **Set Up the Folder Structure**
   Ensure the following structure is present:
   ```
   Auth-Dashboard-App/
   │
   ├── index.html           # Login page
   ├── register.html        # Registration page
   ├── dashboard.html       # Dashboard page
   │
   ├── css/
   │   └── style.css        # Styling (light/dark mode, animations)
   │
   ├── js/
   │   ├── auth.js          # Authentication and page rendering
   │   ├── ui.js            # UI interactions (theme, password toggle)
   │   └── storage.js       # Storage and to-do list management
   │
   ├── assets/
   │   └── logo.png         # Placeholder for images (optional)
   │
   ├── data/
   │   └── users.json       # Sample JSON for import
   │
   └── README.md            # Project documentation
   ```

3. **Run the App**
   - **Using a Local Web Server (Recommended)**:
     - **XAMPP**:
       1. Copy the `Auth-Dashboard-App` folder to XAMPP’s `htdocs` (e.g., `C:\xampp\htdocs\Auth-Dashboard-App`).
       2. Start Apache via the XAMPP Control Panel.
       3. Open `http://localhost/Auth-Dashboard-App/index.html` in a browser.
     - **Node.js**:
       ```bash
       npm install -g http-server
       http-server
       ```
       Access `http://localhost:8080/index.html`.
     - **Python**:
       ```bash
       python -m http.server 8000
       ```
       Access `http://localhost:8000/index.html`.
   - **Directly in Browser**:
     - Open `index.html` in a browser, but note that some features (e.g., file imports) may be restricted due to `file://` protocol limitations.

## Usage

1. **Register**:
   - Navigate to `register.html` or click "Register" on the login page.
   - Enter a name, valid email, and password (6+ characters).
   - Password strength is displayed, and passwords must match the confirmation.

2. **Login**:
   - On `index.html`, enter your registered email and password.
   - Successful login redirects to `dashboard.html`.

3. **Dashboard**:
   - View a personalized welcome message with an avatar (initial of your name).
   - **To-Do List**: Add tasks via the input field and delete them with the red "Delete" button.
   - **Profile**: Click "Edit Profile" to update your name or password.
   - **Data Management**: Export data as JSON or import a JSON file (use `data/users.json` as a template).
   - **Theme**: Toggle light/dark mode with the "Toggle Theme" button.
   - **Logout**: Clears the session and redirects to the login page.

4. **Navigation**:
   - Use links/buttons to switch between pages.
   - Direct access to `dashboard.html` without a session redirects to `index.html`.

## Folder Structure

```
Auth-Dashboard-App/
│
├── index.html           # Login page
├── register.html        # Registration page
├── dashboard.html       # Dashboard page
│
├── css/
│   └── style.css        # Styling (light/dark mode, animations)
│
├── js/
│   ├── auth.js          # Authentication and page rendering
│   ├── ui.js            # UI interactions (theme, password toggle)
│   └── storage.js       # Storage and to-do list management
│
├── assets/
│   └── logo.png         # Placeholder for images (optional)
│
├── data/
│   └── users.json       # Sample JSON for import
│
└── README.md            # Project documentation
```

## Technologies

- **HTML5**: Structure for login, register, and dashboard pages.
- **CSS3**: Responsive styling with CSS variables, gradients, and animations.
- **JavaScript**: Client-side logic for authentication, UI interactions, and storage.
- **Storage**: `localStorage` for users/todos, `sessionStorage` for login state.

## Notes

- **Security**: Passwords are stored in plain text in `localStorage` for demo purposes. In production, use a backend with proper encryption.
- **Assets**: The `assets/logo.png` is a placeholder. Add images to the `assets/` folder if needed.
- **Browser Support**: Tested on modern browsers. Some features may not work in older browsers.
- **Data Persistence**: Data is stored client-side and persists until `localStorage` is cleared.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make changes and commit (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

Please ensure code follows the existing style and includes tests if applicable.


## Acknowledgements

- Inspired by modern web app designs with card-based layouts.
- Built with pure JavaScript, no external frameworks.

## Contact

For questions or feedback, open an issue or contact [nagatejareddy](https://github.com/nagatejareddy).

---

*Built with ❤️ by Naga Teja Reddy
