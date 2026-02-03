document.addEventListener("DOMContentLoaded", () => {

  // ===== CLICKER =====
  let score = 0;
  let time = 30;
  const cBtn = document.getElementById("cBtn");
  const resetBtn = document.getElementById("resetBtn");
  const clickScore = document.getElementById("clickScore");
  const timer = document.getElementById("timer");

  let clickInterval = setInterval(() => {
    time--;
    timer.textContent = time;
    if(time <= 0){
      clearInterval(clickInterval);
      alert("Время вышло! Ваш счет: " + score);
      cBtn.disabled = true;
    }
  }, 1000);

  cBtn.addEventListener("click", () => {
    score++;
    clickScore.textContent = score;
    cBtn.style.background = '#' + Math.floor(Math.random()*16777215).toString(16);
    localStorage.setItem('clickerScore', score);
  });

  resetBtn.addEventListener("click", () => {
    score = 0;
    clickScore.textContent = score;
    localStorage.removeItem('clickerScore');
  });

  // ===== ADVENTURE =====
  const advBtn = document.getElementById("advBtn");
  const advText = document.getElementById("adventureText");
  const advSaveBtn = document.getElementById("advSaveBtn");
  const advSaved = document.getElementById("advSaved");

  const characters = ["рыцарь","маг","вор"];
  const locations = ["тёмный лес","заброшенный замок","подводное царство"];
  const villains = ["дракон","колдун","гоблин"];

  function randomItem(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

  advBtn.addEventListener("click", () => {
    const text = `Ваш персонаж — ${randomItem(characters)} находится в ${randomItem(locations)} и сражается с ${randomItem(villains)}.`;
    advText.textContent = text;
  });

  advSaveBtn.addEventListener("click", () => {
    const li = document.createElement("li");
    li.textContent = advText.textContent;
    advSaved.appendChild(li);
    localStorage.setItem("adventures", advSaved.innerHTML);
  });

  if(localStorage.getItem("adventures")){
    advSaved.innerHTML = localStorage.getItem("adventures");
  }

  // ===== GUESS NUMBER =====
  const guessInput = document.getElementById("guessInput");
  const guessBtn = document.getElementById("guessBtn");
  const guessMessage = document.getElementById("guessMessage");
  const guessTries = document.getElementById("guessTries");
  const guessReset = document.getElementById("guessReset");

  let number = Math.floor(Math.random()*100)+1;
  let tries = 5;
  guessTries.textContent = tries;

  guessBtn.addEventListener("click", () => {
    const val = parseInt(guessInput.value);
    if(val === number){
      guessMessage.textContent = "Поздравляем! Вы угадали число!";
      guessBtn.disabled = true;
    } else if(val > number){
      guessMessage.textContent = "Загаданное число меньше";
    } else {
      guessMessage.textContent = "Загаданное число больше";
    }
    tries--;
    guessTries.textContent = tries;
    if(tries<=0){
      guessMessage.textContent += `. Игра окончена. Было число: ${number}`;
      guessBtn.disabled = true;
    }
  });

  guessReset.addEventListener("click", () => {
    number = Math.floor(Math.random()*100)+1;
    tries = 5;
    guessTries.textContent = tries;
    guessMessage.textContent = "";
    guessBtn.disabled = false;
    guessInput.value = "";
  });

  // ===== CONTACT FORM VALIDATION =====
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    alert("Форма отправлена!");
    contactForm.reset();
  });

});
