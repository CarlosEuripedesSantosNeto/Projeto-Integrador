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
let initialTime;
let remainingTime;
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
  // Clear any existing intervals
  clearInterval(countdown);

  // Store initial time
  if (!initialTime) {
    initialTime = seconds;
  }

  // If timer is paused, use remaining time
  const now = Date.now();
  const then = isPaused && remainingTime ? now + remainingTime * 1000 : now + seconds * 1000;

  // Display initial time
  displayTimeLeft(isPaused && remainingTime ? remainingTime : seconds);

  // Set interval to update time every second
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    // If time is up
    if (secondsLeft <= 0) {
      clearInterval(countdown);
      // Toggle between work and rest periods
      if (!isResting) {
        isResting = true;
        timer(parseInt(breakTimeInput.value) * 60);
      } else {
        isResting = false;
        timer(parseInt(pomodoroTimeInput.value) * 60);
      }
      return;
    }

    // If not paused, update display and remaining time
    if (!isPaused) {
      displayTimeLeft(secondsLeft);
      remainingTime = secondsLeft;
    }
  }, 1000);
}

// Display time left
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  timerDisplay.textContent = display;
}

// Event listeners
startButton.addEventListener('click', () => {
  initialTime = parseInt(pomodoroTimeInput.value) * 60; // Update initial time when starting
  timer(initialTime);
});

pauseButton.addEventListener('click', () => {
  isPaused = !isPaused; // Toggle pause state
  if (isPaused) {
    clearInterval(countdown); // Clear interval when paused
    pauseButton.textContent = 'Resume'; // Change button text to "Resume"
  } else {
    // Resume countdown if not paused
    timer(remainingTime);
    pauseButton.textContent = 'Pause'; // Change button text back to "Pause"
  }
});

resetButton.addEventListener('click', () => {
  clearInterval(countdown); // Clear current timer interval
  displayTimeLeft(initialTime); // Reset display to initially chosen time
  remainingTime = null; // Reset remaining time
  pauseButton.textContent = 'Pause'; // Reset button text to "Pause"
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
