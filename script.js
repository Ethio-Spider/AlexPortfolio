// =============================
// MOBILE MENU TOGGLE
// =============================
function toggleMenu() {
  document.getElementById("nav").classList.toggle("active");
}

// Close menu when clicking a link
document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("nav").classList.remove("active");
  });
});


// =============================
// SMOOTH SCROLL (enhanced control)
// =============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});


// =============================
// ACTIVE NAV LINK ON SCROLL
// =============================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active-link");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active-link");
    }
  });
});


// =============================
// SCROLL REVEAL ANIMATION
// =============================
const revealElements = document.querySelectorAll(".section, .project-card, .card");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);


// =============================
// HERO TYPING EFFECT
// =============================
const text = "Frontend Developer";
let index = 0;

function typeEffect() {
  const heroSpan = document.querySelector(".hero span");

  if (!heroSpan) return;

  heroSpan.textContent = text.slice(0, index);
  index++;

  if (index <= text.length) {
    setTimeout(typeEffect, 120);
  }
}

// start typing after page load
window.addEventListener("load", typeEffect);