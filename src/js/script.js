// ===== КЛИКЕР =====
let score=0, time=30, timer=null;
const record = localStorage.getItem("record") || 0;
document.getElementById("record").textContent = record;

document.getElementById("clickBtn").onclick = () => {
  if (!timer) {
    timer = setInterval(() => {
      time--;
      document.getElementById("time").textContent = time;
      if (time === 0) {
        clearInterval(timer);
        document.getElementById("clickerMsg").textContent =
          "Игра окончена! Очки: " + score;
        if (score > record) localStorage.setItem("record", score);
      }
    },1000);
  }
  score++;
  document.getElementById("score").textContent = score;
};

document.getElementById("resetClicker").onclick = () => location.reload();

// ===== ПРИКЛЮЧЕНИЕ =====
const heroes=["рыцарь","маг","вор"];
const places=["тёмном лесу","замке","подводном царстве"];
const villains=["драконом","колдуном","гоблином"];

document.getElementById("genStory").onclick = () => {
  const story = `Ваш персонаж — ${heroes[Math.random()*3|0]}
  находится в ${places[Math.random()*3|0]} и сражается с
  ${villains[Math.random()*3|0]}.`;
  document.getElementById("story").textContent = story;
  localStorage.setItem("story", story);
};

// ===== УГАДАЙ ЧИСЛО =====
let number = Math.floor(Math.random()*100)+1;
let tries = 10;

document.getElementById("guessBtn").onclick = () => {
  const val = parseInt(document.getElementById("guessInput").value);
  if (!val) return;
  tries--;
  document.getElementById("tries").textContent = tries;

  if (val === number)
    document.getElementById("guessMsg").textContent = "Угадал!";
  else
    document.getElementById("guessMsg").textContent =
      val > number ? "Меньше" : "Больше";

  if (tries === 0)
    document.getElementById("guessMsg").textContent =
      "Проиграл! Было: " + number;
};

document.getElementById("restartGuess").onclick = () => location.reload();
