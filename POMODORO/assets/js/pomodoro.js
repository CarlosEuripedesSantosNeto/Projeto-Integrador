const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const pomodoroTimeInput = document.getElementById('pomodoro-time');
const breakTimeInput = document.getElementById('break-time');
const taskDisplay = document.getElementById('task');
const checkTaskButton = document.getElementById('check-task');
const levelDisplay = document.getElementById('level');
const characterDisplay = document.getElementById('current-character');

let countdown;
let isPaused = false;
let isResting = false;
let currentLevel = 1;
let tasksCompleted = 0;
let currentCharacter = 'A';
const characters = ['A', 'B', 'C']; // Lista de personagens

const tasks = [
    "Ler 10 páginas de um livro",
    "Escrever um parágrafo sobre um tema aleatório",
    "Fazer 20 flexões",
    "Assistir a um vídeo educacional por 15 minutos",
    "Limpar uma área da casa",
    "Aprender uma nova palavra em um idioma estrangeiro"
];

function getTask() {
    const randomIndex = Math.floor(Math.random() * tasks.length);
    return tasks[randomIndex];
}

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;

  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft <= 0) {
      clearInterval(countdown);
      if (!isResting) {
        isResting = true;
        const breakTime = parseInt(breakTimeInput.value) * 60;
        timer(breakTime);
      } else {
        isResting = false;
        const pomodoroTime = parseInt(pomodoroTimeInput.value) * 60;
        timer(pomodoroTime);
      }
      return;
    }

    if (!isPaused) {
      displayTimeLeft(secondsLeft);
    }
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  timerDisplay.textContent = display;
}

startButton.addEventListener('click', () => {
  const pomodoroTime = parseInt(pomodoroTimeInput.value) * 60;
  timer(pomodoroTime);
});

pauseButton.addEventListener('click', () => {
  isPaused = !isPaused;
});

resetButton.addEventListener('click', () => {
  clearInterval(countdown);
  timerDisplay.textContent = '25:00'; // Resetting to default pomodoro time
});

checkTaskButton.addEventListener('click', () => {
    tasksCompleted++;

    if (tasksCompleted % 5 === 0) {
        currentLevel++;
        levelDisplay.innerText = currentLevel;

        // Ganha novo personagem ao passar de nível
        if (currentLevel <= characters.length) {
            currentCharacter = characters[currentLevel - 1];
            characterDisplay.innerText = currentCharacter;
        }

        alert('Parabéns! Você passou para o próximo nível.');
    }

    taskDisplay.innerText = getTask();
});
