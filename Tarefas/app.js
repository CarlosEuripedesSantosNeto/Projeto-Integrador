document.addEventListener('DOMContentLoaded', function() {
  const formTask = document.getElementById('addTask');
  const taskInput = document.getElementById('task');
  const user = firebase.auth().currentUser;

  formTask.addEventListener('submit', (event) => {
    event.preventDefault();
    if (taskInput.value.trim() !== '') {
      addTask(taskInput.value.trim());
      taskInput.value = '';
    }
  });

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      loadTasks(user.uid);
    } else {
      console.log("No user is signed in.");
    }
  });

  function addTask(value) {
    const userId = firebase.auth().currentUser.uid;
    const taskId = firebase.database().ref().child('tasks').push().key;
    const taskData = {
      id: taskId,
      content: value,
      status: 'todo'
    };
    const updates = {};
    updates['/tasks/' + userId + '/' + taskId] = taskData;
    firebase.database().ref().update(updates);
    addCard(taskData);
  }

  function loadTasks(userId) {
    firebase.database().ref('/tasks/' + userId).once('value', (snapshot) => {
      const tasks = snapshot.val();
      for (const taskId in tasks) {
        addCard(tasks[taskId]);
      }
    });
  }

  function addCard(task) {
    const column = document.getElementById(task.status);
    const newCard = document.createElement("div");
    newCard.classList.add('card');
    newCard.draggable = true;
    newCard.dataset.id = task.id;
    newCard.innerHTML = `
      <div class="status ${task.status}"></div> 
      <div class="content"><p>${task.content}</p></div>
    `;
    newCard.addEventListener('dragstart', dragStart);
    newCard.addEventListener('drag', drag);
    newCard.addEventListener('dragend', dragEnd);
    column.appendChild(newCard);
  }

  const dropZones = document.querySelectorAll('.quadro-tarefas');

  dropZones.forEach(dropZone => {
    dropZone.addEventListener('dragenter', dragEnter);
    dropZone.addEventListener('dragover', dragOver);
    dropZone.addEventListener('dragleave', dragLeave);
    dropZone.addEventListener('drop', drop);
  });

  function dragStart() {
    dropZones.forEach(dropZone => dropZone.classList.add('highlight'));
    this.classList.add('dragging');
  }

  function drag() {}

  function dragEnd() {
    dropZones.forEach(dropZone => dropZone.classList.remove('highlight'));
    this.classList.remove('dragging');
    updateTaskStatus(this);
  }

  function dragEnter() {}

  function dragOver(event) {
    event.preventDefault();
    this.classList.add('over');
    const cardBeingDragged = document.querySelector('.dragging');
    this.appendChild(cardBeingDragged);
  }

  function dragLeave() {
    this.classList.remove('over');
  }

  function drop() {
    this.classList.remove('over');
  }

  function updateTaskStatus(card) {
    const userId = firebase.auth().currentUser.uid;
    const taskId = card.dataset.id;
    const newStatus = card.parentElement.id;
    firebase.database().ref(`/tasks/${userId}/${taskId}`).update({
      status: newStatus
    });
  }
});
