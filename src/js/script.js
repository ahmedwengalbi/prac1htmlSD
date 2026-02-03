// ===== CLICKER GAME =====
let score = 0;
let time = 30;
let interval;
let clickerStarted = false;

const clickBtn = document.getElementById("click-btn");
const resetBtn = document.getElementById("reset-btn");
const scoreEl = document.getElementById("clicker-score");
const timerEl = document.getElementById("clicker-timer");

function startClicker() {
  clearInterval(interval);
  time = 30;
  score = 0;
  scoreEl.textContent = score;
  timerEl.textContent = `Время: ${time}`;
  interval = setInterval(() => {
    time--;
    timerEl.textContent = `Время: ${time}`;
    if(time <= 0){
      clearInterval(interval);
      clickerStarted = false;
      alert(`Время вышло! Ваш счёт: ${score}`);
    }
  }, 1000);
}

clickBtn.addEventListener("click", () => {
  if(!clickerStarted){
    startClicker();
    clickerStarted = true;
  }
  score++;
  scoreEl.textContent = score;
});

resetBtn.addEventListener("click", () => {
  clearInterval(interval);
  time = 30;
  score = 0;
  clickerStarted = false;
  scoreEl.textContent = score;
  timerEl.textContent = `Время: ${time}`;
});

// ===== ADVENTURE GAME =====
const adventureBtn = document.getElementById("adventure-btn");
const adventureText = document.getElementById("adventure-text");

const characters = ["рыцарь", "маг", "вор"];
const locations = ["тёмный лес", "заброшенный замок", "подводное царство"];
const villains = ["дракон", "колдун", "гоблин"];

adventureBtn.addEventListener("click", () => {
  const char = characters[Math.floor(Math.random() * characters.length)];
  const loc = locations[Math.floor(Math.random() * locations.length)];
  const vill = villains[Math.floor(Math.random() * villains.length)];
  const text = `Ваш персонаж — ${char} находится в ${loc} и сражается с ${vill}.`;
  adventureText.textContent = text;
  localStorage.setItem("lastAdventure", text);
});

// ===== GUESS NUMBER GAME =====
const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");
const guessResult = document.getElementById("guess-result");
const guessAttempts = document.getElementById("guess-attempts");

let secretNumber = Math.floor(Math.random() * 100) + 1;
let attemptsLeft = 10;

guessBtn.addEventListener("click", () => {
  const guess = parseInt(guessInput.value);
  if(!guess || guess < 1 || guess > 100){
    guessResult.textContent = "Введите число от 1 до 100!";
    return;
  }

  attemptsLeft--;
  if(guess === secretNumber){
    guessResult.textContent = `Верно! Это число ${secretNumber}`;
    attemptsLeft = 0;
  } else if(guess > secretNumber){
    guessResult.textContent = "Меньше!";
  } else {
    guessResult.textContent = "Больше!";
  }

  guessAttempts.textContent = `Осталось попыток: ${attemptsLeft}`;

  if(attemptsLeft <= 0 && guess !== secretNumber){
    guessResult.textContent = `Игра окончена! Число было ${secretNumber}`;
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attemptsLeft = 10;
  }
});
