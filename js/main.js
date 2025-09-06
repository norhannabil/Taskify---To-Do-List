 
    const addBtn = document.getElementById('addBtn');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage
    loadTasks();

    // Add Task
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') addTask();
    });

    function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText === '') return;

      const col = document.createElement('div');
      col.className = 'col-12 col-md-6 col-lg-4';

      const card = document.createElement('div');
      card.className = 'card task-card shadow-sm p-3 d-flex flex-row justify-content-between align-items-center ';

      const taskSpan = document.createElement('span');
      taskSpan.textContent = taskText;
      taskSpan.style.fontSize = '16px';
      taskSpan.addEventListener('click', () => {
        taskSpan.classList.toggle('task-completed');
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.className = 'btn btn-delete btn-sm';
      deleteBtn.addEventListener('click', () => {
        card.style.opacity = '0';
        setTimeout(() => col.remove(), 300);
      });

      card.appendChild(taskSpan);
      card.appendChild(deleteBtn);
      col.appendChild(card);
      taskList.appendChild(col);

      taskInput.value = '';
      taskInput.focus();

      // Save to localStorage
      saveTasks();
    }

    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => {
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6 col-lg-4';

        const card = document.createElement('div');
        card.className = 'card task-card shadow-sm p-3 d-flex flex-row justify-content-between align-items-center ';

        const taskSpan = document.createElement('span');
        taskSpan.textContent = task.text;
        taskSpan.style.fontSize = '16px';
        if (task.completed) {
          taskSpan.classList.add('task-completed');
        }
        taskSpan.addEventListener('click', () => {
          taskSpan.classList.toggle('task-completed');
          saveTasks();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'btn btn-delete btn-sm';
        deleteBtn.addEventListener('click', () => {
          card.style.opacity = '0';
          setTimeout(() => {
            col.remove();
            saveTasks();
          }, 300);
        });

        card.appendChild(taskSpan);
        card.appendChild(deleteBtn);
        col.appendChild(card);
        taskList.appendChild(col);
      });
    }

    function saveTasks() {
      const tasks = [];
      const taskCards = taskList.querySelectorAll('.card');
      taskCards.forEach(card => {
        const taskSpan = card.querySelector('span');
        const text = taskSpan.textContent;
        const completed = taskSpan.classList.contains('task-completed');
        tasks.push({ text, completed });
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
 