// ================== TABS ==================
const tabs = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// ================== CLICKER ==================
const clickBtn = document.getElementById('click-btn');
const resetBtn = document.getElementById('reset-btn');
const scoreDisplay = document.getElementById('clicker-score');
const timerDisplay = document.getElementById('clicker-timer');

let clickerScore = 0;
let clickerTimeLeft = 30;
let clickerInterval = null;
let clickerActive = false;

function startClicker() {
  if (clickerActive) return;
  clickerActive = true;
  clickerScore = 0;
  clickerTimeLeft = 30;
  scoreDisplay.textContent = clickerScore;
  timerDisplay.textContent = `Время: ${clickerTimeLeft}`;

  clickerInterval = setInterval(() => {
    clickerTimeLeft--;
    timerDisplay.textContent = `Время: ${clickerTimeLeft}`;
    if (clickerTimeLeft <= 0) {
      clearInterval(clickerInterval);
      alert(`Время вышло! Ваш счёт: ${clickerScore}`);
      clickerActive = false;
    }
  }, 1000);
}

clickBtn.addEventListener('click', () => {
  if (!clickerActive) startClicker();
  if (clickerActive && clickerTimeLeft > 0) {
    clickerScore++;
    scoreDisplay.textContent = clickerScore;
    clickBtn.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(clickerInterval);
  clickerScore = 0;
  clickerTimeLeft = 30;
  scoreDisplay.textContent = clickerScore;
  timerDisplay.textContent = `Время: ${clickerTimeLeft}`;
  clickerActive = false;
  clickBtn.style.backgroundColor = '';
});

// ================== ADVENTURE ==================
const characters = ['рыцарь', 'маг', 'вор'];
const locations = ['тёмный лес', 'заброшенный замок', 'подводное царство'];
const villains = ['дракон', 'колдун', 'гоблин'];

const adventureText = document.getElementById('adventure-text');
const adventureBtn = document.getElementById('adventure-btn');

function generateAdventure() {
  const character = characters[Math.floor(Math.random() * characters.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const villain = villains[Math.floor(Math.random() * villains.length)];
  const text = `Ваш персонаж — ${character} находится в ${location} и сражается с ${villain}.`;
  adventureText.textContent = text;
  localStorage.setItem('lastAdventure', text);
}

adventureBtn.addEventListener('click', generateAdventure);

document.addEventListener('DOMContentLoaded', () => {
  const last = localStorage.getItem('lastAdventure');
  if (last) adventureText.textContent = last;
});

// ================== GUESS NUMBER ==================
const guessInput = document.getElementById('guess-input');
const guessBtn = document.getElementById('guess-btn');
const guessResult = document.getElementById('guess-result');
const guessTriesDisplay = document.getElementById('guess-tries');
const guessReset = document.getElementById('guess-reset');

let randomNumber;
let triesLeft;

function initGuessGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  triesLeft = 10;
  guessTriesDisplay.textContent = triesLeft;
  guessResult.textContent = '';
  guessInput.value = '';
  guessInput.disabled = false;
  guessBtn.disabled = false;
}

guessBtn.addEventListener('click', () => {
  const guess = parseInt(guessInput.value);
  if (Number.isNaN(guess) || guess < 1 || guess > 100) {
    guessResult.textContent = 'Введите число от 1 до 100!';
    return;
  }
  if (triesLeft <= 0) return;

  triesLeft--;
  guessTriesDisplay.textContent = triesLeft;

  if (guess === randomNumber) {
    guessResult.textContent = `Поздравляем! Вы угадали число ${randomNumber}! 🎉`;
    guessInput.disabled = true;
    guessBtn.disabled = true;
  } else if (guess < randomNumber) {
    guessResult.textContent = 'Загаданное число больше.';
  } else {
    guessResult.textContent = 'Загаданное число меньше.';
  }

  if (triesLeft === 0 && guess !== randomNumber) {
    guessResult.textContent = `Игра окончена. Вы не угадали. Загаданное число было ${randomNumber}.`;
    guessInput.disabled = true;
    guessBtn.disabled = true;
  }
});

guessReset.addEventListener('click', initGuessGame);
initGuessGame();

// ================== TYPING HERO ==================
const typingP = document.querySelector('.typing');
const roles = ['Frontend разработчик', 'UI дизайнер', 'Студент'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const current = roles[roleIndex];

  if (!isDeleting) {
    typingP.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(type, 1400);
      return;
    }
  } else {
    typingP.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(type, isDeleting ? 75 : 115);
}
document.addEventListener('DOMContentLoaded', () => type());

// ================== CONTACT FORM (FAKE SEND) ==================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formStatus.textContent = 'Отправка...';
  setTimeout(() => {
    formStatus.textContent = 'Спасибо! Сообщение отправлено.';
    contactForm.reset();
  }, 1200);
});

// ================== REACTION GAME (Задание 1) ==================
const reactionField = document.getElementById("reaction-field");
const reactionTarget = document.getElementById("reaction-target");
const reactionStartBtn = document.getElementById("reaction-start");
const reactionResetBtn = document.getElementById("reaction-reset");

const reactionTimeLeftEl = document.getElementById("reaction-time-left");
const reactionHitsEl = document.getElementById("reaction-hits");
const reactionAvgEl = document.getElementById("reaction-avg");
const reactionResultEl = document.getElementById("reaction-result");

let reactionGameActive = false;
let reactionTimeLeft = 30;
let reactionTimerInterval = null;
let spawnTimeout = null;

let reactionHits = 0;
let totalReactionMs = 0;
let lastSpawnAt = 0;

function randInt(min, max){ return Math.floor(Math.random() * (max - min + 1)) + min; }

function hideTarget(){ reactionTarget.style.display = "none"; }

function placeTargetRandom(){
  const fieldRect = reactionField.getBoundingClientRect();
  reactionTarget.style.display = "inline-block";
  const btnRect = reactionTarget.getBoundingClientRect();

  const maxX = Math.max(0, fieldRect.width - btnRect.width);
  const maxY = Math.max(0, fieldRect.height - btnRect.height);

  reactionTarget.style.left = `${Math.random() * maxX}px`;
  reactionTarget.style.top  = `${Math.random() * maxY}px`;
}

function updateReactionStats(){
  reactionHitsEl.textContent = reactionHits;
  reactionAvgEl.textContent = reactionHits > 0
    ? `${Math.round(totalReactionMs / reactionHits)} мс`
    : "—";
}

function scheduleSpawn(){
  if (!reactionGameActive) return;
  hideTarget();
  const delay = randInt(1000, 5000); // 1..5 сек

  clearTimeout(spawnTimeout);
  spawnTimeout = setTimeout(() => {
    if (!reactionGameActive) return;
    placeTargetRandom();
    lastSpawnAt = performance.now();
  }, delay);
}

function endReactionGame(){
  reactionGameActive = false;
  clearInterval(reactionTimerInterval);
  clearTimeout(spawnTimeout);
  hideTarget();
  updateReactionStats();

  const avgText = reactionHits > 0 ? reactionAvgEl.textContent : "—";
  reactionResultEl.textContent =
    `Игра окончена! Успешных нажатий: ${reactionHits}. Средняя реакция: ${avgText}.`;
}

function startReactionGame(){
  if (reactionGameActive) return;

  reactionResultEl.textContent = "";
  reactionGameActive = true;

  reactionTimeLeft = 30;
  reactionHits = 0;
  totalReactionMs = 0;

  reactionTimeLeftEl.textContent = reactionTimeLeft;
  updateReactionStats();

  clearInterval(reactionTimerInterval);
  reactionTimerInterval = setInterval(() => {
    reactionTimeLeft--;
    reactionTimeLeftEl.textContent = reactionTimeLeft;
    if (reactionTimeLeft <= 0) endReactionGame();
  }, 1000);

  scheduleSpawn();
}

function resetReactionGame(){
  reactionGameActive = false;
  clearInterval(reactionTimerInterval);
  clearTimeout(spawnTimeout);
  hideTarget();

  reactionTimeLeft = 30;
  reactionHits = 0;
  totalReactionMs = 0;

  reactionTimeLeftEl.textContent = reactionTimeLeft;
  updateReactionStats();
  reactionResultEl.textContent = "";
}

reactionStartBtn.addEventListener("click", startReactionGame);
reactionResetBtn.addEventListener("click", resetReactionGame);

reactionTarget.addEventListener("click", () => {
  if (!reactionGameActive) return;

  const rt = performance.now() - lastSpawnAt;
  reactionHits++;
  totalReactionMs += rt;

  updateReactionStats();
  scheduleSpawn();
});

// ================== TIC TAC TOE (Задание 2) ==================
const tttBoardEl = document.getElementById("ttt-board");
const tttTurnEl = document.getElementById("ttt-turn");
const tttStatusEl = document.getElementById("ttt-status");
const tttRestartBtn = document.getElementById("ttt-restart");
const tttResetScoreBtn = document.getElementById("ttt-reset-score");
const tttVsBot = document.getElementById("ttt-vs-bot");
const tttXWinsEl = document.getElementById("ttt-x-wins");
const tttOWinsEl = document.getElementById("ttt-o-wins");

let tttBoard = Array(9).fill(null);
let tttTurn = "X";
let tttGameOver = false;

let tttXWins = 0;
let tttOWins = 0;

const winLines = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function tttRender(){
  tttBoardEl.innerHTML = "";
  tttTurnEl.textContent = tttTurn;
  tttXWinsEl.textContent = tttXWins;
  tttOWinsEl.textContent = tttOWins;

  tttBoard.forEach((v, i) => {
    const btn = document.createElement("button");
    btn.className = "ttt-cell";
    btn.textContent = v ? v : "";
    btn.disabled = tttGameOver || v !== null;
    btn.addEventListener("click", () => tttMove(i));
    tttBoardEl.appendChild(btn);
  });
}

function tttCheckWinner(){
  for (const [a,b,c] of winLines){
    if (tttBoard[a] && tttBoard[a] === tttBoard[b] && tttBoard[a] === tttBoard[c]) {
      return tttBoard[a];
    }
  }
  return null;
}

function tttIsDraw(){ return tttBoard.every(cell => cell !== null); }

function tttFinish(winner){
  tttGameOver = true;
  if (winner === "X") tttXWins++;
  if (winner === "O") tttOWins++;

  tttStatusEl.textContent = winner ? `Победитель: ${winner} 🎉` : "Ничья 🤝";
  tttRender();
}

function tttMove(index){
  if (tttGameOver) return;
  if (tttBoard[index] !== null) return;

  tttBoard[index] = tttTurn;

  const winner = tttCheckWinner();
  if (winner) return tttFinish(winner);
  if (tttIsDraw()) return tttFinish(null);

  tttTurn = (tttTurn === "X") ? "O" : "X";
  tttStatusEl.textContent = "";
  tttRender();

  if (tttVsBot.checked && tttTurn === "O" && !tttGameOver){
    setTimeout(tttBotMove, 250);
  }
}

function tttBotMove(){
  if (tttGameOver || tttTurn !== "O") return;

  const empty = [];
  for (let i = 0; i < 9; i++) if (tttBoard[i] === null) empty.push(i);
  if (empty.length === 0) return;

  const pick = empty[Math.floor(Math.random() * empty.length)];
  tttMove(pick);
}

function tttRestart(){
  tttBoard = Array(9).fill(null);
  tttTurn = "X";
  tttGameOver = false;
  tttStatusEl.textContent = "";
  tttRender();
}

function tttResetScore(){
  tttXWins = 0;
  tttOWins = 0;
  tttRender();
}

tttRestartBtn.addEventListener("click", tttRestart);
tttResetScoreBtn.addEventListener("click", tttResetScore);
tttVsBot.addEventListener("change", () => tttRestart());
tttRender();

// ================== MAZE (Задание 3) ==================
const mazeGridEl = document.getElementById("maze-grid");
const mazeTimeEl = document.getElementById("maze-time");
const mazeStatusEl = document.getElementById("maze-status");
const mazeRestartBtn = document.getElementById("maze-restart");

// 0 — путь, 1 — стена, S — старт, E — выход
const mazeMap = [
  "111111111111",
  "1S0000000001",
  "101111011110",
  "100001000001",
  "111101111101",
  "100001000001",
  "101111011101",
  "100000010001",
  "101111010111",
  "1000000000E1",
  "111111111111",
];

const rows = mazeMap.length;
const cols = mazeMap[0].length;

let mazePlayer = { r: 0, c: 0 };
let mazeExit = { r: 0, c: 0 };

let mazeStarted = false;
let mazeFinished = false;
let mazeStartAt = 0;
let mazeRAF = 0;

function parseMaze(){
  for (let r = 0; r < rows; r++){
    for (let c = 0; c < cols; c++){
      const ch = mazeMap[r][c];
      if (ch === "S") mazePlayer = { r, c };
      if (ch === "E") mazeExit = { r, c };
    }
  }
}

function mazeCellType(r, c){
  const ch = mazeMap[r][c];
  if (ch === "1") return "wall";
  if (ch === "E") return "exit";
  return "path";
}

function renderMaze(){
  mazeGridEl.style.gridTemplateColumns = `repeat(${cols}, var(--cell))`;
  mazeGridEl.innerHTML = "";

  for (let r = 0; r < rows; r++){
    for (let c = 0; c < cols; c++){
      const cell = document.createElement("div");
      cell.className = "maze-cell";

      const type = mazeCellType(r, c);
      if (type === "wall") cell.classList.add("wall");
      if (type === "exit") cell.classList.add("exit");

      if (r === mazePlayer.r && c === mazePlayer.c) cell.classList.add("player");

      mazeGridEl.appendChild(cell);
    }
  }
}

function mazeStartTimer(){
  mazeStarted = true;
  mazeFinished = false;
  mazeStatusEl.textContent = "";
  mazeStartAt = performance.now();

  cancelAnimationFrame(mazeRAF);
  const tick = () => {
    if (!mazeStarted || mazeFinished) return;
    const sec = (performance.now() - mazeStartAt) / 1000;
    mazeTimeEl.textContent = sec.toFixed(1);
    mazeRAF = requestAnimationFrame(tick);
  };
  tick();
}

function mazeWin(){
  mazeFinished = true;
  mazeStarted = false;
  cancelAnimationFrame(mazeRAF);
  mazeStatusEl.textContent = `Победа! Время: ${mazeTimeEl.textContent} сек 🎉`;
}

function canMoveTo(r, c){
  if (r < 0 || c < 0 || r >= rows || c >= cols) return false;
  return mazeMap[r][c] !== "1";
}

function tryMove(dr, dc){
  if (mazeFinished) return;

  if (!mazeStarted) mazeStartTimer();

  const nr = mazePlayer.r + dr;
  const nc = mazePlayer.c + dc;

  if (!canMoveTo(nr, nc)) return;

  mazePlayer = { r: nr, c: nc };
  renderMaze();

  if (nr === mazeExit.r && nc === mazeExit.c) {
    mazeWin();
  }
}

function mazeRestart(){
  cancelAnimationFrame(mazeRAF);
  mazeStarted = false;
  mazeFinished = false;
  mazeTimeEl.textContent = "0.0";
  mazeStatusEl.textContent = "";

  parseMaze();
  renderMaze();
}

document.addEventListener("keydown", (e) => {
  // чтобы стрелки не скроллили страницу, когда лабиринт открыт
  const mazeTabActive = document.getElementById("maze").classList.contains("active");
  if (!mazeTabActive) return;

  if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) e.preventDefault();

  if (e.key === "ArrowUp") tryMove(-1, 0);
  if (e.key === "ArrowDown") tryMove(1, 0);
  if (e.key === "ArrowLeft") tryMove(0, -1);
  if (e.key === "ArrowRight") tryMove(0, 1);
});

mazeRestartBtn.addEventListener("click", mazeRestart);

parseMaze();
renderMaze();

/* =====================================================
   ================= RPG TASK MANAGER ==================
   ===================================================== */

(function(){

// ================= STORAGE =================
const RPGStorage = {
  save(key, value){
    localStorage.setItem(key, JSON.stringify(value));
  },
  load(key, def){
    return JSON.parse(localStorage.getItem(key)) || def;
  },
  clear(){
    localStorage.removeItem("rpg_character");
    localStorage.removeItem("rpg_tasks");
  }
};

// ================= CHARACTER =================
class Character {
  constructor(){
    const saved = RPGStorage.load("rpg_character", null);

    if(saved){
      this.name = saved.name;
      this.level = saved.level;
      this.xp = saved.xp;
      this.totalXp = saved.totalXp;
    } else {
      this.name = prompt("Введите имя персонажа:", "Герой") || "Герой";
      this.level = 1;
      this.xp = 0;
      this.totalXp = 0;
      this.save();
    }
  }

  xpToNext(){
    return this.level * 100;
  }

  addExperience(amount){
    this.xp += amount;
    this.totalXp += amount;

    while(this.xp >= this.xpToNext()){
      this.xp -= this.xpToNext();
      this.levelUp();
    }

    this.save();
  }

  levelUp(){
    this.level++;
    alert("LEVEL UP! 🎉");
  }

  save(){
    RPGStorage.save("rpg_character", {
      name: this.name,
      level: this.level,
      xp: this.xp,
      totalXp: this.totalXp
    });
  }
}

// ================= TASK =================
class Task {
  constructor(title, description, difficulty){
    this.id = Date.now();
    this.title = title;
    this.description = description;
    this.xp = difficulty;
    this.done = false;
    this.createdAt = new Date().toLocaleString();
    this.completedAt = null;
  }
}

// ================= TASK MANAGER =================
class TaskManager {
  constructor(character){
    this.character = character;
    this.tasks = RPGStorage.load("rpg_tasks", []);
  }

  addTask(task){
    this.tasks.push(task);
    this.save();
  }

  removeTask(id){
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.save();
  }

  completeTask(id){
    const task = this.tasks.find(t => t.id === id);
    if(!task) return;

    if(!task.done){
      task.done = true;
      task.completedAt = new Date().toLocaleString();
      this.character.addExperience(task.xp);
    } else {
      task.done = false;
      task.completedAt = null;
    }

    this.save();
  }

  save(){
    RPGStorage.save("rpg_tasks", this.tasks);
  }
}

// ================= UI =================
document.addEventListener("DOMContentLoaded", () => {

  if(!document.getElementById("charName")) return;

  const character = new Character();
  const manager = new TaskManager(character);

  const $ = id => document.getElementById(id);

  function render(){
    $("charName").textContent = character.name;
    $("charLevel").textContent = character.level;
    $("charXp").textContent = character.xp;
    $("charXpNeed").textContent = character.xpToNext();
    $("statXp").textContent = character.totalXp;

    const doneCount = manager.tasks.filter(t => t.done).length;
    $("statDone").textContent = doneCount;

    const percent = (character.xp / character.xpToNext()) * 100;
    $("xpFill").style.width = percent + "%";

    const list = $("taskList");
    list.innerHTML = "";

    manager.tasks.forEach(task => {
      const li = document.createElement("li");

      li.innerHTML = `
        <label>
          <input type="checkbox" ${task.done ? "checked":""}>
          <strong>${task.title}</strong> (+${task.xp} XP)
          ${task.description ? "<br><small>"+task.description+"</small>" : ""}
        </label>
        <button>❌</button>
      `;

      li.querySelector("input").addEventListener("change", () => {
        manager.completeTask(task.id);
        render();
      });

      li.querySelector("button").addEventListener("click", () => {
        manager.removeTask(task.id);
        render();
      });

      if(task.done){
        li.style.opacity = "0.6";
        li.style.textDecoration = "line-through";
      }

      list.appendChild(li);
    });
  }

  $("addTaskBtn").addEventListener("click", () => {
    const title = $("taskTitle").value.trim();
    const desc = $("taskDesc").value.trim();
    const diff = parseInt($("taskDifficulty").value);

    if(!title) return;

    const task = new Task(title, desc, diff);
    manager.addTask(task);

    $("taskTitle").value = "";
    $("taskDesc").value = "";

    render();
  });

  $("resetAll").addEventListener("click", () => {
    if(confirm("Сбросить весь прогресс?")){
      RPGStorage.clear();
      location.reload();
    }
  });

  render();
});

})();

