document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addButton = document.getElementById("addButton");
    const taskList = document.getElementById("taskList");
    function saveData(){
localStorage.setItem("data",taskList.innerhtml);
    }
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const li = document.createElement("li");
        li.textContent = taskText;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "deleteButton";
        deleteButton.onclick = () => {
            taskList.removeChild(li);
        };

        li.appendChild(deleteButton);
        li.onclick = () => {
            li.classList.toggle("completed");
        };

        taskList.appendChild(li);
        taskInput.value = ""; // Clear input
        saveData();
    }

    // Add event listener to the button
    addButton.addEventListener("click", addTask);

    // Allow pressing Enter to add task
    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });
});
