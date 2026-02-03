// typing
const text="Frontend разработчик | Студент | UI дизайнер";
let i=0;const t=document.querySelector(".typing");
(function type(){if(i<text.length){t.textContent+=text[i++];setTimeout(type,60)}})();

// CLICKER
let cs=0,ct=30,tm=null;
const r=localStorage.getItem("rec")||0;
cRecord.textContent=r;

cBtn.onclick=()=>{
 if(!tm)tm=setInterval(()=>{
  ct--;cTime.textContent=ct;
  if(ct===0){clearInterval(tm);cMsg.textContent="Игра окончена: "+cs;
   if(cs>r)localStorage.setItem("rec",cs)}
 },1000);
 cs++;cScore.textContent=cs;
};
cReset.onclick=()=>location.reload();

// ADVENTURE
const h=["рыцарь","маг","вор"],p=["лесу","замке","царстве"],v=["драконом","гоблином","колдуном"];
storyBtn.onclick=()=>{
 const s=`Ваш персонаж — ${h[Math.random()*3|0]} находится в ${p[Math.random()*3|0]} и сражается с ${v[Math.random()*3|0]}.`;
 story.textContent=s;localStorage.setItem("story",s);
};
story.textContent=localStorage.getItem("story")||"";

// GUESS
let num=Math.floor(Math.random()*100)+1,tr=10;
guessBtn.onclick=()=>{
 const val=parseInt(guessInput.value);if(!val)return;
 tr--;tries.textContent=tr;
 if(val===num)guessMsg.textContent="Угадал!";
 else guessMsg.textContent=val>num?"Меньше":"Больше";
 if(tr===0)guessMsg.textContent="Проиграл. Было: "+num;
};
guessReset.onclick=()=>location.reload();

// FORM
contactForm.onsubmit=e=>{
 e.preventDefault();
 formStatus.textContent="Отправлено ✔";
 contactForm.reset();
};
