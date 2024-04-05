const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const pomodoroTimeInput = document.getElementById('pomodoro-time');
const breakTimeInput = document.getElementById('break-time');

let countdown;
let isPaused = false;
let isResting = false;

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
