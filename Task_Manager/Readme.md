
# Personal Task Management System

A full-stack web application that allows users to securely register, log in, and manage their personal tasks.  
The application ensures authentication, authorization, and data privacy using token-based security.

This project was developed as part of the **Full Stack Developer Intern – Technical Assignment**.

---

## 🚀 Features

- User registration and login
- Secure authentication using JWT
- Create new tasks
- View personal task list
- Edit existing tasks
- Delete tasks
- User-specific data isolation (each user sees only their tasks)
- Responsive UI using Bootstrap 5

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript (Fetch API)
- Bootstrap 5

### Backend
- Node.js
- Express.js
- JWT (JSON Web Tokens)
- bcryptjs (password hashing)

### Database
- MongoDB (MongoDB Atlas)
- Mongoose ODM

---

## 🔐 Authentication & Security

- Passwords are hashed using bcrypt before storage
- JWT is used for token-based authentication
- Protected routes ensure only authenticated users can access tasks
- Invalid login attempts return proper error messages without exposing sensitive details

---

## 📂 Project Structure

```

Task_Manager/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── index.html
│   ├── register.html
│   ├── dashboard.html
│   ├── script.js
│   └── style.css
│
└── README.md

````

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/Task_Manager.git
cd Task_Manager
````

---

## 🗄️ MongoDB Setup

* MongoDB Atlas (M0 Free Tier) is used as the database.
* A cloud cluster is created and connected using Mongoose.
* Database credentials are stored securely using environment variables.

### Environment Variables

Create a `.env` file inside the `backend` folder and add:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/taskdb
JWT_SECRET=your_secret_key
PORT=5000
```

* Network access is enabled using `0.0.0.0/0`
* User and task data are stored in separate MongoDB collections

---

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Run the backend server:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

* Open the `frontend` folder
* Run `index.html` using **Live Server** (VS Code extension recommended)

---

## 🔄 API Endpoints

### Authentication

| Method | Endpoint      | Description         |
| ------ | ------------- | ------------------- |
| POST   | /api/register | Register a new user |
| POST   | /api/login    | Login user          |

### Tasks (Protected Routes)

| Method | Endpoint       | Description    |
| ------ | -------------- | -------------- |
| GET    | /api/tasks     | Get user tasks |
| POST   | /api/tasks     | Create task    |
| PUT    | /api/tasks/:id | Update task    |
| DELETE | /api/tasks/:id | Delete task    |

---

## 🧪 Testing

* APIs tested using Postman
* Frontend tested in browser using Live Server
* JWT validation verified for protected routes

---

## 📌 Future Enhancements

* Task status (Completed / Pending)
* Task filtering and sorting
* Deployment on Render / Vercel
* Improved form validations

---

## 👨‍💻 Author

**Naga Teja Reddy**
Full Stack Developer Intern Applicant

---

## 📜 License

This project is created for educational and internship evaluation purposes.

```

---

## ✅ FINAL CHECK (IMPORTANT)

Before pushing:
- ✔ Save file as **`README.md`** (capital letters)
- ✔ Place it in **project root**
- ✔ Push to GitHub

---

## 🏁 YOU ARE READY TO SUBMIT

Your project now has:
✔ Working code  
✔ Clean UI  
✔ Secure authentication  
✔ Professional documentation  

If you want, I can:
- Review your **GitHub repo**
- Prepare **interview questions & answers**
- Guide **deployment**

Just tell me 👍
```
