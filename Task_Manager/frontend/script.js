const BASE_URL = "http://localhost:5000/api";

/* ---------- LOGIN ---------- */
function login() {
  fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      const errorBox = document.getElementById("error");
      errorBox.innerText = data.error;
      errorBox.classList.remove("d-none");
      return;
    }

    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";
  })
  .catch(() => {
    alert("Server error. Try again later.");
  });
}

/* ---------- REGISTER ---------- */
function register() {
  fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username.value,
      email: email.value,
      password: password.value
    })
  })
  .then(() => {
    alert("Registered successfully");
    window.location.href = "index.html";
  });
}

/* ---------- GET TASKS ---------- */
function getTasks() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "index.html";
    return;
  }

  fetch(`${BASE_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => res.json())
  .then(tasks => {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    if (tasks.length === 0) {
      list.innerHTML = `<p class="text-muted">No tasks yet</p>`;
      return;
    }

    tasks.forEach(task => {
      list.innerHTML += `
        <div class="card mb-2 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">${task.title}</h5>
            <p class="card-text">${task.description || "No description"}</p>

            <button class="btn btn-sm btn-warning"
              onclick="editTask('${task._id}', '${task.title}', '${task.description || ""}')">
              Edit
            </button>

            <button class="btn btn-sm btn-danger"
              onclick="deleteTask('${task._id}')">
              Delete
            </button>
          </div>
        </div>
      `;
    });
  });
}


/* ---------- ADD TASK ---------- */
function addTask() {
  const token = localStorage.getItem("token");

  fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      title: title.value,
      description: description.value
    })
  })
  .then(() => {
    title.value = "";
    description.value = "";
    getTasks();
  });
}

/* ---------- EDIT TASK ---------- */
function editTask(id, oldTitle, oldDesc) {
  const newTitle = prompt("Edit title", oldTitle);
  const newDesc = prompt("Edit description", oldDesc);

  if (!newTitle) return;

  const token = localStorage.getItem("token");

  fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      title: newTitle,
      description: newDesc
    })
  })
  .then(() => getTasks());
}

/* ---------- DELETE TASK ---------- */
function deleteTask(id) {
  const token = localStorage.getItem("token");

  if (!confirm("Delete this task?")) return;

  fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(() => getTasks());
}

/* ---------- LOGOUT ---------- */
function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}
