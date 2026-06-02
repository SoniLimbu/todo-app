// Load tasks from localStorage or start empty
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

// Add new task
function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    // prevent empty task
    if (text === "") {
        alert("Please enter a task");
        return;
    }

    // create task object
    const newTask = {
        id: Date.now(),
        text: text,
        completed: false,
        important: false
    };

    tasks.push(newTask);

    input.value = "";
    saveTasks();
}

// Delete task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
}

// Toggle complete
function toggleComplete(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
}

// Edit task
function editTask(id) {
    const newText = prompt("Edit your task:");

    if (!newText) return;

    tasks = tasks.map(task =>
        task.id === id ? { ...task, text: newText } : task
    );

    saveTasks();
}

// Mark important
function toggleImportant(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, important: !task.important } : task
    );
    saveTasks();
}

// Clear completed tasks
function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
}

// Render tasks on screen
function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        // task text
        const span = document.createElement("span");
        span.innerText = task.text;

        // apply styles
        if (task.completed) span.classList.add("completed");
        if (task.important) span.classList.add("important");

        // click to toggle complete
        span.onclick = () => toggleComplete(task.id);

        // edit button
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.onclick = () => editTask(task.id);

        // important button
        const impBtn = document.createElement("button");
        impBtn.innerText = "⭐";
        impBtn.onclick = () => toggleImportant(task.id);

        // delete button
        const delBtn = document.createElement("button");
        delBtn.innerText = "Delete";
        delBtn.onclick = () => deleteTask(task.id);

        // append everything
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(impBtn);
        li.appendChild(delBtn);

        list.appendChild(li);
    });
}

// initial render
renderTasks();