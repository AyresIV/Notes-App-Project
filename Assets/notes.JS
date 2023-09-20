// Function to add a task
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskDate = document.getElementById("taskDate");
    const taskTime = document.getElementById("taskTime");
    const taskList = document.getElementById("taskList");

    const taskText = taskInput.value.trim();
    const taskDateString = taskDate.value;
    const taskTimeString = taskTime.value;

    if (taskText === "" || taskDateString === "" || taskTimeString === "") {
        alert("Please fill in all the required fields (Task, Date, and Time).");
        return;
    }

    const task = document.createElement("div");
    task.classList.add("task");

    // Create a container for the task text
    const textContainer = document.createElement("div");
    textContainer.classList.add("text");
    textContainer.textContent = taskText; // Set the text content

    const taskDateTime = new Date(taskDateString + "T" + taskTimeString).toLocaleString();

    const taskData = {
        text: taskText,
        datetime: taskDateTime,
        completed: false
    };
    localStorage.setItem(taskText, JSON.stringify(taskData));

    task.appendChild(textContainer); // Add the text container to the task

    task.innerHTML += `
        <div class="checkbox-wrapper">
            <input type="checkbox" onchange="toggleTaskComplete(this)">
        </div>
        <div class="date-time-container">
            <div class="date">${taskDateString}</div>
            <div class="time">${taskTimeString}</div>
        </div>
        <span class="delete-button" onclick="removeTask(this)">X</span>
    `;

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
    const taskText = task.querySelector(".text"); // Updated selector
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
    const taskText = task.querySelector(".text"); // Updated selector
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

// Clear Inputs button
document.getElementById("clearInputsButton").addEventListener("click", clearInputs);


function loadTasks() {
    const tasks = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const taskData = JSON.parse(localStorage.getItem(key));
        tasks.push(taskData);
    }

    // Sort tasks by datetime
    tasks.sort((a, b) => {
        return new Date(a.datetime) - new Date(b.datetime);
    });

    const taskList = document.getElementById("taskList");


    taskList.innerHTML = "";


    tasks.forEach(taskData => {
        const task = createTaskElement(taskData);
        taskList.appendChild(task);
    });
}

// Function to create a task element based on task data
function createTaskElement(taskData) {
    const task = document.createElement("div");
    task.classList.add("task");

    // Create a container for the task text
    const textContainer = document.createElement("div");
    textContainer.classList.add("text");
    textContainer.textContent = taskData.text;

    task.appendChild(textContainer);

    task.innerHTML += `
        <div class="checkbox-wrapper">
            <input type="checkbox" onchange="toggleTaskComplete(this)" ${taskData.completed ? 'checked' : ''}>
        </div>
        <div class="date-time-container">
            <div class="date">${taskData.datetime.split(',')[0]}</div>
            <div class="time">${taskData.datetime.split(',')[1]}</div>
        </div>
        <span class="delete-button" onclick="removeTask(this)">X</span>
    `;

    setTimeout(() => {
        task.style.opacity = 1;
    }, 10);

    return task;
}

// Load tasks when the page loads
loadTasks();

// Task button event listener
document.getElementById("addTaskButton").addEventListener("click", addTask);
