const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const searchInput = document.getElementById('search-task');
const searchBtn = document.getElementById('search-btn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Make search button work
searchBtn?.addEventListener('click', function (e) {
  e.preventDefault();
  renderTasks();
});

function renderTasks() {
  const filter = document.getElementById('filter')?.value || 'all';
  const searchTerm = searchInput?.value.toLowerCase() || '';
  list.innerHTML = '';
  tasks.forEach((task, index) => {
    if (
      (filter === 'completed' && !task.completed) ||
      (filter === 'incomplete' && task.completed) ||
      (filter === 'high' && task.priority !== 'High') ||
      (searchTerm && !task.text.toLowerCase().includes(searchTerm))
    ) {
      return;
    }

    const li = document.createElement('li');
    li.className = 'task-item';
    if (task.completed) li.classList.add('completed');

    // Task main text and info
    li.innerHTML = `
      <span class="task-text">${task.text}</span>
      <span class="task-priority">${task.priority ? 'Priority: ' + task.priority : ''}</span>
      <span class="task-due">${task.dueDate ? 'Due: ' + task.dueDate : ''}</span>
      <span class="task-project">${task.project ? 'Project: ' + task.project : ''}</span>
      <span class="task-notes">${task.notes ? 'Notes: ' + task.notes : ''}</span>
      <span class="task-created">${task.createdAt ? 'Created: ' + task.createdAt : ''}</span>
      <button class="toggle-btn">${task.completed ? 'Undo' : 'Done'}</button>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    `;

    // Toggle complete
    li.querySelector('.toggle-btn').addEventListener('click', () => toggleTask(index));
    // Edit
    li.querySelector('.edit-btn').addEventListener('click', () => editTask(index));
    // Delete
    li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(index));

    list.appendChild(li);
  });
}

function addTask(text) {
  const priority = document.getElementById('priority')?.value || '';
  const dueDate = document.getElementById('due-date')?.value || '';
  const project = document.getElementById('project')?.value || '';
  const notes = document.getElementById('notes')?.value || '';
  const createdAt = new Date().toLocaleString();

  tasks.push({
    text,
    completed: false,
    priority,
    dueDate,
    project,
    notes,
    createdAt
  });
  saveTasks();
  renderTasks();
}

form?.addEventListener('submit', function (e) {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    addTask(text);
    input.value = '';
  }
});

document.getElementById('filter')?.addEventListener('change', renderTasks);

document.getElementById('toggle-theme')?.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  document.querySelector('.sidebar')?.classList.toggle('dark-mode');
  document.querySelector('.main-content')?.classList.toggle('dark-mode');
});

document.addEventListener('DOMContentLoaded', () => {
  renderTasks();
});
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt('Edit task:', tasks[index].text);
  if (newText !== null && newText.trim() !== '') {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}
function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;

  document.getElementById('total-tasks').textContent = total;
  document.getElementById('completed-tasks').textContent = completed;
  document.getElementById('pending-tasks').textContent = pending;
}
function renderTasks() {
  list.innerHTML = '';
  tasks.forEach((task, index) => {
    // ... render each task ...
  });
  updateStats(); // 👈 Add this line
}
const li = document.createElement('li');
li.className = 'task-item'; // 👈 Add this line
li.scrollIntoView({ behavior: 'smooth', block: 'start' });












