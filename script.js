const tasks = [
  { id: 1, title: "Buy groceries", completed: false },
  { id: 2, title: "Read a book", completed: true },
  { id: 3, title: "Walk the dog", completed: false },
];

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", renderTasks);


taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const newTaskTitle = taskInput.value.trim();

  if (newTaskTitle) {
    const newTask = {
      id: Date.now(), 
      title: newTaskTitle,
      completed: false,
    };
    tasks.push(newTask);
    renderTasks();
    taskInput.value = "";
  }
});

function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML =
      '<p class="text-gray-500">No tasks yet. Add one above!</p>';
    return;
  }

  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.className = `flex items-center justify-between p-3 rounded-lg ${
      task.completed ? "bg-gray-100" : "bg-white"
    } border`;

    taskItem.innerHTML = `
            <div class="flex items-center">
                <input 
                    type="checkbox" 
                    ${task.completed ? "checked" : ""} 
                    data-id="${task.id}"
                    class="mr-3 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                >
                <span class="${
                  task.completed
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }">${task.title}</span>
            </div>
            <button 
                data-id="${task.id}"
                class="text-red-500 hover:text-red-700 transition"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        `;

    taskList.appendChild(taskItem);
  });

  
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener("change", toggleTask);
  });

  document.querySelectorAll("button[data-id]").forEach((button) => {
    if (!button.hasAttribute("type")) {
      
      button.addEventListener("click", deleteTask);
    }
  });
}

function toggleTask(e) {
  const taskId = parseInt(e.target.dataset.id);
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    task.completed = e.target.checked;
    renderTasks();
  }
}


function deleteTask(e) {
  const taskId = parseInt(e.target.dataset.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    renderTasks();
  }
}
