let tasks = [];  // Array to store tasks
let taskIdCounter = 1;  // Counter to give each task a unique ID

// Load tasks from local storage
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        taskIdCounter = tasks.length ? tasks[tasks.length - 1].id + 1 : 1; // Update task ID counter
    }
}

// Save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
} 

// Function to add a new task
function addTask(description, isCompleted) {
    let task = {
        id: taskIdCounter++, 
        description: description,
        completed: isCompleted  
    };
    tasks.push(task);  // Add task to the array
    saveTasks();  // Save the updated tasks to local storage
}

// Function to display all tasks
function displayTasks() {
    if (tasks.length === 0) {
        console.log("No tasks available!");
    } else {
        tasks.forEach(task => {
            let status = task.completed ? "Completed" : "Incomplete"; 
            console.log(`ID: ${task.id}, Description: ${task.description}, Status: ${status}`);
        });
    }
}

// Function to toggle the completion status of a task by its ID
function toggleTaskCompletion(id) {
    let task = tasks.find(task => task.id === id);  
    if (task) {
        task.completed = !task.completed;  // Toggle the completion status
        console.log(`Task ID: ${id} status has been toggled to ${task.completed ? "Completed" : "Incomplete"}.`);
        saveTasks(); 
    } else {
        console.log(`Task with ID ${id} not found!`);
    }
}

// Function to remove a task by its ID
function removeTask(id) {
    let index = tasks.findIndex(task => task.id === id); 
    if (index !== -1) {
        tasks.splice(index, 1);  // Remove the task from the array
        console.log(`Task ID: ${id} has been removed.`);
        saveTasks();  
    } else {
        console.log(`Task with ID ${id} not found!`);
    }
}

// Function to update the description of a task by its ID
function updateTaskDescription(id, newDescription) {
    let task = tasks.find(task => task.id === id);  
    if (task) {
        task.description = newDescription;  // Update the description
        console.log(`Task ID: ${id} description has been updated to "${newDescription}".`);
        saveTasks(); 
    } else {
        console.log(`Task with ID ${id} not found!`);
    }
}

// Function to search for tasks by description
function searchTasksByDescription(query) {
    let foundTasks = tasks.filter(task => task.description.toLowerCase().includes(query.toLowerCase()));
    if (foundTasks.length === 0) {
        console.log("No tasks found matching your search.");
    } else {
        console.log("Search results:");
        foundTasks.forEach(task => {
            let status = task.completed ? "Completed" : "Incomplete";  
            console.log(`ID: ${task.id}, Description: ${task.description}, Status: ${status}`);
        });
    }
}

// Load tasks when the app starts
loadTasks();

// Main menu loop for user interaction
while (true) {
    let action = prompt("Choose an action: \n1. Add a task \n2. Toggle task completion \n3. Remove a task \n4. Display tasks \n5. Update task description \n6. Search for tasks \n7. Exit");

    switch (action) {
        case '1': 
            while (true) {
                let userInput = prompt("Enter a task description (or leave blank to finish):");
                if (userInput === null || userInput.trim() === "") {
                    break;  
                }
                let completionInput = prompt("Is the task completed? (yes/no):").toLowerCase();
                let isCompleted = (completionInput === "yes");
                addTask(userInput, isCompleted);
                
            }
            displayTasks(); 
            break;

        case '2': 
            while (true) {
                let taskIdInput = prompt("Enter the ID of the task you want to toggle its status (or leave blank to finish):");
                if (taskIdInput === null || taskIdInput.trim() === "") {
                    break;  // Exit the inner loop
                }
                let taskId = parseInt(taskIdInput);
                toggleTaskCompletion(taskId);
                
            }
            displayTasks(); 
            break;

        case '3': 
            while (true) {
                let removeTaskIdInput = prompt("Enter the ID of the task you want to remove (or leave blank to finish):");
                if (removeTaskIdInput === null || removeTaskIdInput.trim() === "") {
                    break; 
                }
                let removeTaskId = parseInt(removeTaskIdInput);
                removeTask(removeTaskId);
                displayTasks();
            }
            break;

        case '4': 
            displayTasks();
            break;

        case '5': 
            while (true) {
                let updateTaskIdInput = prompt("Enter the ID of the task you want to update (or leave blank to finish):");
                if (updateTaskIdInput === null || updateTaskIdInput.trim() === "") {
                    break; 
                }
                let updateTaskId = parseInt(updateTaskIdInput);
                let newDescription = prompt("Enter the new description for the task:");
                if (newDescription !== null) {
                    updateTaskDescription(updateTaskId, newDescription);
                    displayTasks(); 
                }
            }
            break;

        case '6': 
            let searchQuery = prompt("Enter a keyword to search for tasks:");
            if (searchQuery !== null) {
                searchTasksByDescription(searchQuery);
            }
            break;

        case '7': 
            console.log("Exiting...");
            break;

        default:  
            console.log("Invalid option, please try again.");
    }

    // Exit the loop if the user chose to exit
    if (action === '7') {
        break;
    }
}
