// Function to add a task
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskDate = document.getElementById("taskDate");
    const taskTime = document.getElementById("taskTime");
    const taskList = document.getElementById("taskList");

    const taskText = taskInput.value.trim();
    const taskDateString = taskDate.value;
    const taskTimeString = taskTime.value;

    if (taskText === "") return;

    const task = document.createElement("div");
    task.classList.add("task");

    const taskDateTime = new Date(taskDateString + "T" + taskTimeString).toLocaleString();

    const taskData = {
        text: taskText,
        datetime: taskDateTime,
        completed: false
    };
    localStorage.setItem(taskText, JSON.stringify(taskData));

    task.innerHTML = `
        <div class="checkbox-wrapper">
            <input type="checkbox" onchange="toggleTaskComplete(this)">
            <span>${taskText}</span>
        </div>
        <div class="date-time-container">
            <div class="date">${taskDateString}</div>
            <div class="time">${taskTimeString}</div>
        </div>
        <span class="delete-button" onclick="removeTask(this)">X</span>
    `;

    // Insert the new task at the end of the task list
    taskList.appendChild(task);

    setTimeout(() => {
        task.style.opacity = 1;
    }, 10);

    taskInput.value = "";
    taskDate.value = "";
    taskTime.value = "";
}

// Function to toggle task completion
function toggleTaskComplete(checkbox) {
    const task = checkbox.closest(".task");
    const taskText = task.querySelector("span");
    const taskData = JSON.parse(localStorage.getItem(taskText.textContent));

    taskData.completed = checkbox.checked;
    localStorage.setItem(taskText.textContent, JSON.stringify(taskData));

    if (checkbox.checked) {
        taskText.classList.add("completed");
    } else {
        taskText.classList.remove("completed");
    }
}

// Function to remove a task
function removeTask(deleteButton) {
    const task = deleteButton.closest(".task");
    const taskText = task.querySelector("span");
    localStorage.removeItem(taskText.textContent);
    task.style.opacity = 0;
    setTimeout(() => {
        task.remove();
    }, 500);
}

// Function to clear all inputs
function clearInputs() {
    const taskInput = document.getElementById("taskInput");
    const taskDate = document.getElementById("taskDate");
    const taskTime = document.getElementById("taskTime");

    taskInput.value = "";
    taskDate.value = "";
    taskTime.value = "";
}

// Add Clear Inputs button event listener
document.getElementById("clearInputsButton").addEventListener("click", clearInputs);

// Load tasks from local storage
function loadTasks() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const taskData = JSON.parse(localStorage.getItem(key));
        const taskList = document.getElementById("taskList");

        const task = document.createElement("div");
        task.classList.add("task");

        task.innerHTML = `
            <div class="checkbox-wrapper">
                <input type="checkbox" onchange="toggleTaskComplete(this)" ${taskData.completed ? 'checked' : ''}>
                <span class="${taskData.completed ? 'completed' : ''}">${taskData.text}</span>
            </div>
            <div class="date-time-container">
                <div class="date">${taskData.datetime.split(',')[0]}</div>
                <div class="time">${taskData.datetime.split(',')[1]}</div>
            </div>
            <span class="delete-button" onclick="removeTask(this)">X</span>
        `;

        // Insert the loaded task at the end of the task list
        taskList.appendChild(task);

        setTimeout(() => {
            task.style.opacity = 1;
        }, 10);
    }
}

// Load tasks when the page loads
loadTasks();

// Add task button event listener
document.getElementById("addTaskButton").addEventListener("click", addTask);
