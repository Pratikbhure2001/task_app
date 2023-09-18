document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('create-task-form');
    const taskList = document.getElementById('tasks');
  
    // Function to fetch and display tasks
    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/tasks');
        const tasks = await response.json();
        displayTasks(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
  
    // Function to display tasks in the taskList
    const displayTasks = (tasks) => {
      taskList.innerHTML = '';
      tasks.forEach((task) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${task.title}</span>
          <span class="status">${task.completed ? 'Completed' : 'Not Completed'}</span>
          <span>${task.description}</span>
          <button class="complete-button" data-task-id="${task._id}">Complete</button>
          <button class="edit-button" data-task-id="${task._id}">Edit</button>
          <button class="delete-button" data-task-id="${task._id}">Delete</button>
        `;
        taskList.appendChild(li);
  
        // Add event listener for complete button
        const completeButton = li.querySelector('.complete-button');
        completeButton.addEventListener('click', () => toggleTaskCompletion(task._id, task.completed));
  
        // Add event listener for edit button
        const editButton = li.querySelector('.edit-button');
        editButton.addEventListener('click', () => editTask(task._id, task.title));
  
        // Add event listener for delete button
        const deleteButton = li.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => deleteTask(task._id));
      });
    };
  
    // Function to create a new task
    const createTask = async (title, description) => {
      try {
        const response = await fetch('/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, description }),
        });
  
        if (response.status === 201) {
          fetchTasks();
        } else {
          console.error('Failed to create task');
        }
      } catch (error) {
        console.error('Error creating task:', error);
      }
    };
  
    // Function to toggle task completion status
    const toggleTaskCompletion = async (taskId, currentStatus) => {
      try {
        const newStatus = !currentStatus;
        const response = await fetch(`/api/tasks/${taskId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ completed: newStatus }),
        });
  
        if (response.status === 200) {
          fetchTasks();
        } else {
          console.error('Failed to toggle task completion');
        }
      } catch (error) {
        console.error('Error toggling task completion:', error);
      }
    };
  
    // Function to edit a task
    const editTask = async (taskId, currentTitle) => {
      const newTitle = prompt('Edit task title:', currentTitle);
      if (newTitle !== null && newTitle.trim() !== '') {
        try {
          const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: newTitle }),
          });
  
          if (response.status === 200) {
            fetchTasks();
          } else {
            console.error('Failed to edit task');
          }
        } catch (error) {
          console.error('Error editing task:', error);
        }
      }
    };
  
    // Function to delete a task
    const deleteTask = async (taskId) => {
      try {
        const response = await fetch(`/api/tasks/${taskId}`, {
          method: 'DELETE',
        });
  
        if (response.status === 204) {
          fetchTasks();
        } else {
          console.error('Failed to delete task');
        }
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    };
  
    // Event listener for task form submission
    taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = e.target.title.value;
      const description = e.target.description.value;
      createTask(title, description);
      taskForm.reset();
    });
  
    // Fetch and display tasks when the page loads
    fetchTasks();
  });
  