 const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      ${task.text}
      <span>
        <button onclick="toggleTask(${index})">✅</button>
        <button onclick="deleteTask(${index})">❌</button>
      </span>
    `;
    list.appendChild(li);
  });
}

function addTask(text) {
  tasks.push({ text, completed: false });
  saveTasks();
  renderTasks();
}

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

form.addEventListener('submit', e => {
  e.preventDefault();
  addTask(input.value);
  input.value = '';
});

renderTasks();
let priority = document.getElementById('priority').value;
tasks.push({ text, completed: false, priority });
li.innerHTML = `
  <strong>[${task.priority}]</strong> ${task.text}
  <span>
    <button onclick="toggleTask(${index})">✅</button>
    <button onclick="deleteTask(${index})">❌</button>
  </span>
`;

let dueDate = document.getElementById('due-date').value;
tasks.push({ text, completed: false, priority, dueDate });
<li>
  <strong>[${task.priority}]</strong> ${task.text} — Due: ${task.dueDate}
  ...
</li>
document.getElementById('filter').addEventListener('change', renderTasks);

function renderTasks() {
  const filter = document.getElementById('filter').value;
  list.innerHTML = '';
  tasks.forEach((task, index) => {
    if (
      filter === 'completed' && !task.completed ||
      filter === 'incomplete' && task.completed ||
      filter === 'high' && task.priority !== 'High'
    ) return;

    // render task as before
  });
}
li.classList.add(task.priority.toLowerCase());
function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText) {
    tasks[index].text = newText;
    saveTasks();
    renderTasks();
  }
}
<button onclick="editTask(${index})">✏️</button>
let project = document.getElementById('project').value;
tasks.push({ text, completed: false, priority, dueDate, project });
<li><strong>[${task.project}]</strong> ${task.text}</li>
function filterTasks(criteria) {
  return tasks.filter(task => {
    if (criteria === 'high') return task.priority === 'High';
    if (criteria === 'today') return task.dueDate === new Date().toISOString().split('T')[0];
    return true;
  });
}
li.classList.add(task.priority.toLowerCase());
let notes = document.getElementById('notes').value;
tasks.push({ text, notes });
let createdAt = new Date().toLocaleString();
tasks.push({ text, createdAt });
<small>Created: ${task.createdAt}</small>







