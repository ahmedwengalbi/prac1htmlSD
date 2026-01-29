const text = "Frontend разработчик | Студент | UI дизайнер";
let i = 0;
const typing = document.querySelector(".typing");

function type() {
  if (i < text.length) {
    typing.textContent += text.charAt(i);
    i++;
    setTimeout(type, 60);
  }
}
type();

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", e => {
  e.preventDefault();
  status.textContent = "Сообщение отправлено ✔";
  form.reset();
});
