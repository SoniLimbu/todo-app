// Function to add a new task
function addTask() {

    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    // Check if input is empty
    if(taskText === ""){
        alert("Please enter a task");
        return;
    }

    // Create new list item
    const li = document.createElement("li");

    // Task text
    const span = document.createElement("span");
    span.innerText = taskText;

    // Mark complete when clicked
    span.onclick = function(){
        span.classList.toggle("completed");
    };

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";

    deleteBtn.onclick = function(){
        li.remove();
    };

    // Add text and button to list item
    li.appendChild(span);
    li.appendChild(deleteBtn);

    // Add list item to task list
    document.getElementById("taskList").appendChild(li);

    // Clear input field
    taskInput.value = "";
}