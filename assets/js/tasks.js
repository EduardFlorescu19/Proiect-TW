document.addEventListener('DOMContentLoaded', function() {
    // Function to create a new task item
    function createTaskItem(id, title, description, deadline) {
        var taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.setAttribute('draggable', 'true');
        taskItem.dataset.id = id;

        // Task content
        var taskContent = document.createElement('div');
        taskContent.className = 'task-content';

        // Title
        var titleElement = document.createElement('div');
        titleElement.className = 'task-title';
        titleElement.textContent = title;

        // Description
        var descriptionElement = document.createElement('div');
        descriptionElement.className = 'task-description';
        descriptionElement.textContent = description;

        // Deadline
        var deadlineElement = document.createElement('div');
        deadlineElement.className = 'task-deadline';
        deadlineElement.textContent = 'Deadline: ' + deadline;

        // Edit button
        var editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function() {
            editTask(id);
        });

        // Append elements to task content
        taskContent.appendChild(titleElement);
        taskContent.appendChild(descriptionElement);
        taskContent.appendChild(deadlineElement);

        // Append task content and edit button to task item
        taskItem.appendChild(taskContent);
        taskItem.appendChild(editButton);

        return taskItem;
    }

    // Function to handle drag-and-drop events
    function handleDragAndDrop() {
        var taskItems = document.querySelectorAll('.task-item');

        taskItems.forEach(function(taskItem) {
            taskItem.addEventListener('dragstart', function(event) {
                event.dataTransfer.setData('text/plain', taskItem.dataset.id);
                setTimeout(function() {
                    taskItem.classList.add('dragging');
                }, 0);
            });

            taskItem.addEventListener('dragend', function() {
                setTimeout(function() {
                    taskItem.classList.remove('dragging');
                }, 0);
            });
        });

        var columns = document.querySelectorAll('.task-list');

        columns.forEach(function(column) {
            column.addEventListener('dragover', function(event) {
                event.preventDefault();
                const afterElement = getDragAfterElement(column, event.clientY);
                const draggable = document.querySelector('.dragging');
                if (afterElement == null) {
                    column.appendChild(draggable);
                } else {
                    column.insertBefore(draggable, afterElement);
                }
            });
        });
    }

    // Function to determine the position for dropping a task
    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.task-item:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // Function to add a new task
    function addTask() {
        var form = document.createElement('form');
        form.className = 'task-form';
    
        var titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.placeholder = 'Task Title';
        titleInput.required = true;
    
        var descriptionInput = document.createElement('input');
        descriptionInput.type = 'text';
        descriptionInput.placeholder = 'Task Description';
    
        var deadlineInput = document.createElement('input');
        deadlineInput.type = 'date';
        deadlineInput.required = true;
    
        var submitButton = document.createElement('button');
        submitButton.type = 'button';
        submitButton.textContent = 'Add Task';
        submitButton.addEventListener('click', function() {
            var title = titleInput.value;
            var description = descriptionInput.value;
            var deadline = deadlineInput.value;
    
            if (title !== '') {
                var id = Date.now().toString(); // Use a unique identifier for each task
                var taskItem = createTaskItem(id, title, description, deadline);
                var todoList = document.getElementById('todo-list');
                todoList.appendChild(taskItem);
                form.remove();
                handleDragAndDrop();
            }
        });
    
        form.appendChild(titleInput);
        form.appendChild(descriptionInput);
        form.appendChild(deadlineInput);
        form.appendChild(submitButton);
    
        var todoList = document.getElementById('todo-list');
        todoList.appendChild(form);
    }    

    // Function to edit an existing task
    function editTask(id) {
        var taskItem = document.querySelector('.task-item[data-id="' + id + '"]');
        var title = prompt('Edit task title:', taskItem.querySelector('.task-title').textContent);
        var description = prompt('Edit task description:', taskItem.querySelector('.task-description').textContent);
        var deadline = prompt('Edit task deadline:', taskItem.querySelector('.task-deadline').textContent.slice(10));

        if (title !== null && title !== '') {
            taskItem.querySelector('.task-title').textContent = title;
            taskItem.querySelector('.task-description').textContent = description;
            taskItem.querySelector('.task-deadline').textContent = 'Deadline: ' + deadline;
        }
    }

    // Add event listener for adding a new task
    var addButton = document.querySelector('.add-task-button');
    addButton.addEventListener('click', function() {
        addTask();
    });

    // Enable drag-and-drop functionality
    handleDragAndDrop();
});
