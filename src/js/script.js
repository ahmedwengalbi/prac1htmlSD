// ===== Typing effect =====
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
typing.textContent = "";
type();

// ===== Scroll animations =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll("section, .card").forEach(el => {
  el.classList.add("hidden");
  observer.observe(el);
});

// ===== Skill bars animation =====
document.querySelectorAll(".bar div").forEach(bar => {
  const width = bar.style.width;
  bar.style.width = "0";
  setTimeout(() => bar.style.width = width, 800);
});

// ===== Active nav =====
const sections = document.querySelectorAll("section");
const links = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    const top = sec.offsetTop - 150;
    if (pageYOffset >= top) current = sec.id;
  });

  links.forEach(a => {
    a.classList.remove("active");
    if (a.getAttribute("href") === `#${current}`) {
      a.classList.add("active");
    }
  });
});
