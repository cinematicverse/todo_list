$(document).ready(function() {
    // Fetch tasks and render them in the browser
    fetchTasks();

    // Add task form submission
    $('#task-form').on('submit', function(e) {
        e.preventDefault();
        let task = $('#task-input').val().trim();
        if (task !== '') {
            addTask(task);
            $('#task-input').val('');
        }
    });

    // Task status update
    $(document).on('change', '.completed-checkbox', function() {
        let id = $(this).data('id');
        let completed = $(this).is(':checked') ? 1 : 0;
        updateTask(id, completed);
    });

    // Task deletion
    $(document).on('click', '.delete-task', function() {
        let id = $(this).data('id');
        deleteTask(id);
    });
});

function fetchTasks() {
    $.ajax({
        url: 'fetch_tasks.php',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            let tasks = '';
            $.each(data, function(index, task) {
                tasks += `<li id="task-${task.id}">
                    <input type="checkbox" class="completed-checkbox" data-id="${task.id}" ${task.completed === 1 ? 'checked' : ''}>
                    <span>${task.title}</span>
                    <button class="delete-task" data-id="${task.id}">Delete</button>
                </li>`;
            });
            $('#task-list').html(tasks);
        }
    });
}

function addTask(title) {
    $.ajax({
        url: 'fetch_tasks.php',
        type: 'POST',
        data: { action: 'add', title: title },
        success: function() {
            fetchTasks();
        }
    });
}

function updateTask(id, completed) {
    $.ajax({
        url: 'fetch_tasks.php',
        type: 'POST',
        data: { action: 'update', id: id, completed: completed },
        success: function() {
            fetchTasks();
        }
    });
}

function deleteTask(id) {
    $.ajax({
        url: 'fetch_tasks.php',
        type: 'POST',
        data: { action: 'delete', id: id },
        success: function() {
            fetchTasks();
        }
    });
}