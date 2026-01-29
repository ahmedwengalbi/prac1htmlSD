const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", e => {
  e.preventDefault();
  status.textContent = "Сообщение отправлено!";
  status.style.color = "#38bdf8";
  form.reset();
});
