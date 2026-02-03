// Typing effect
const text = "Frontend разработчик | UI дизайнер | Студент";
let i = 0;
const typing = document.querySelector(".typing");

function type() {
  if(i < text.length){
    typing.textContent += text.charAt(i);
    i++;
    setTimeout(type, 60);
  }
}
type();

// Contact form
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
form.addEventListener("submit", e => {
  e.preventDefault();
  status.textContent = "Сообщение отправлено ✔";
  form.reset();
});

// Tabs
const tabs = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    tabContents.forEach(c => c.classList.remove("active"));
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

// ===== CLICKER GAME =====
let score = 0;
let time = 30;
let interval;

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
      alert(`Время вышло! Ваш счёт: ${score}`);
    }
  }, 1000);
}

clickBtn.addEventListener("click", () => {
  score++;
  scoreEl.textContent = score;
});
resetBtn.addEventListener("click", () => {
  score = 0;
  scoreEl.textContent = score;
});

// ===== ADVENTURE GAME =====
const characters = ["рыцарь", "маг", "вор"];
const locations = ["тёмный лес", "заброшенный замок", "подводное царство"];
const villains = ["дракон", "колдун", "гоблин"];
const adventureBtn = document.getElementById("adventure-btn");
const adventureText = document.getElementById("adventure-text");

adventureBtn.addEventListener("click", () => {
  const char = characters[Math.floor(Math.random()*characters.length)];
  const loc = locations[Math.floor(Math.random()*locations.length)];
  const vil = villains[Math.floor(Math.random()*villains.length)];
  adventureText.textContent = `Ваш персонаж — ${char}, находится в ${loc} и сражается с ${vil}.`;
});

// ===== GUESS NUMBER GAME =====
let target = Math.floor(Math.random()*100)+1;
let tries = 10;

const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");
const guessResult = document.getElementById("guess-result");
const guessTries = document.getElementById("guess-tries");
const guessReset = document.getElementById("guess-reset");

guessBtn.addEventListener("click", () => {
  const val = parseInt(guessInput.value);
  if(!val || val < 1 || val > 100) return;
  tries--;
  guessTries.textContent = tries;
  if(val === target){
    guessResult.textContent = `Поздравляем! Вы угадали число ${target}`;
  } else if(val < target){
    guessResult.textContent = "Загаданное число больше";
  } else {
    guessResult.textContent = "Загаданное число меньше";
  }
  if(tries <= 0 && val !== target){
    guessResult.textContent = `Игра окончена! Число было ${target}`;
  }
});

guessReset.addEventListener("click", () => {
  target = Math.floor(Math.random()*100)+1;
  tries = 10;
  guessTries.textContent = tries;
  guessResult.textContent = "";
  guessInput.value = "";
});
