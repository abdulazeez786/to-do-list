document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addButton = document.getElementById("addButton");
    const taskList = document.getElementById("taskList");

    // Load data on startup
    function showTask() {
        taskList.innerHTML = localStorage.getItem("data") || "";
        // Re-attach event listeners to deleted buttons after loading
        const deleteButtons = document.querySelectorAll(".deleteButton");
        deleteButtons.forEach(btn => {
            btn.onclick = function() {
                this.parentElement.remove();
                saveData();
            };
        });
    }

    function saveData() {
        localStorage.setItem("data", taskList.innerHTML);
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const li = document.createElement("li");
        li.textContent = taskText;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "deleteButton";
        deleteButton.onclick = (e) => {
            e.stopPropagation(); // Prevent triggering the 'completed' toggle
            li.remove();
            saveData();
        };

        li.appendChild(deleteButton);
        li.onclick = () => {
            li.classList.toggle("completed");
            saveData();
        };

        taskList.appendChild(li);
        taskInput.value = ""; 
        saveData();
    }

    addButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTask();
    });

    showTask(); // Initialize the list
});