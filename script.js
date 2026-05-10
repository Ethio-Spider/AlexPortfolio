// =============================
// MOBILE MENU TOGGLE
// =============================
function toggleMenu() {
  document.querySelector(".nav").classList.toggle("active");
}

// Close menu when clicking a link
document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelector(".nav").classList.remove("active");
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
// HERO TYPING EFFECT
// =============================
const subtitleText = "I am frontend developer and cisco network";
let subtitleIndex = 0;

function typeEffect() {
  const heroSpan = document.querySelector('.typing');
  const subtitleSpan = document.querySelector('.typing-subtitle');

  if (!heroSpan || !subtitleSpan) return;

  // Show name instantly without animation
  heroSpan.textContent = "Alemneh";

  // Type subtitle with animation
  if (subtitleIndex <= subtitleText.length) {
    subtitleSpan.textContent = subtitleText.slice(0, subtitleIndex);
    subtitleIndex++;
    setTimeout(typeEffect, 100);
  }
}

// start typing after page load
window.addEventListener("load", typeEffect);

// =============================
// DARK/LIGHT MODE TOGGLE
// =============================
function updateThemeButton() {
  const button = document.getElementById('mode-toggle');
  if (!button) return;

  if (document.body.classList.contains('light-mode')) {
    button.textContent = '🌞';
  } else {
    button.textContent = '🌙';
  }
}

function toggleMode() {
  document.body.classList.toggle('light-mode');
  updateThemeButton();
}

// =============================
// SCROLL TO TOP
// =============================
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

window.addEventListener('scroll', () => {
  const scrollButton = document.getElementById('scrollToTop');
  if (window.scrollY > 300) {
    scrollButton.classList.add('show');
  } else {
    scrollButton.classList.remove('show');
  }
});

// =============================
// FORM VALIDATION & EMAIL SUBMISSION
// =============================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
      const submitBtn = document.getElementById('submitBtn');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      
      // Use Formspree to submit the form
      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          showMessage('Message sent successfully! I will get back to you soon.', 'success');
          contactForm.reset();
          clearErrors();
        } else {
          showMessage('Failed to send message. Please try again.', 'error');
        }
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }).catch(error => {
        console.log('Error:', error);
        showMessage('Failed to send message. Please try again or email me directly.', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      });
    }
  });
}

function validateForm() {
  let isValid = true;
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const subject = document.getElementById('subject');
  const message = document.getElementById('message');

  // Clear previous errors
  clearErrors();

  // Name validation
  if (name.value.trim().length < 2) {
    showError('nameError', 'Name must be at least 2 characters');
    isValid = false;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    showError('emailError', 'Please enter a valid email address');
    isValid = false;
  }

  // Subject validation
  if (subject.value.trim().length < 5) {
    showError('subjectError', 'Subject must be at least 5 characters');
    isValid = false;
  }

  // Message validation
  if (message.value.trim().length < 10) {
    showError('messageError', 'Message must be at least 10 characters');
    isValid = false;
  }

  return isValid;
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

function clearErrors() {
  const errorElements = document.querySelectorAll('.error-message');
  errorElements.forEach(element => {
    element.textContent = '';
    element.style.display = 'none';
  });
}

function showMessage(message, type) {
  const messageElement = document.getElementById('formMessage');
  messageElement.textContent = message;
  messageElement.className = type;
  messageElement.style.display = 'block';

  setTimeout(() => {
    messageElement.style.display = 'none';
  }, 5000);
}

// =============================
// PROGRESS BAR ANIMATION
// =============================
function animateProgressBars() {
  const progressBars = document.querySelectorAll('.progress');
  progressBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.width = width;
    }, 500);
  });
}

// =============================
// INITIALIZE
// =============================
window.addEventListener('load', () => {
  typeEffect();
  revealOnScroll();
  animateProgressBars();
});

// Animated Counters
document.querySelectorAll('.counter').forEach(counter => {
  const updateCounter = () => {
    const target = +counter.getAttribute('data-target');
    const current = +counter.innerText;
    const increment = target / 100;

    if (current < target) {
      counter.innerText = `${Math.ceil(current + increment)}`;
      setTimeout(updateCounter, 20);
    } else {
      counter.innerText = target;
    }
  };

  updateCounter();
});

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active-filter'));
    btn.classList.add('active-filter');
  });
});

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Simple Particle Background
const canvas = document.getElementById('particles-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for(let i = 0; i < 70; i++){
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 3,
    dx: Math.random() - 0.5,
    dy: Math.random() - 0.5
  });
}

function animateParticles(){
  if (!ctx) return;
  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
    ctx.fillStyle = '#00d4ff';
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if(p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if(p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});


// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.section, .project-card, .timeline-item');

function revealOnScroll(){
  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if(elementTop < window.innerHeight - 100){
      el.classList.add('show');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Active Navigation Highlight
const sectionElements = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav(){
  let current = '';
  sectionElements.forEach(section => {
    const sectionTop = section.offsetTop - 200;
    if(pageYOffset >= sectionTop){
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if(link.getAttribute('href') === '#' + current){
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// Theme Persistence
const modeToggle = document.getElementById('mode-toggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
  document.body.classList.add('light-mode');
}

updateThemeButton();

if (modeToggle) {
  modeToggle.addEventListener('click', () => {
    toggleMode();
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

window.addEventListener('load', () => {
  typeEffect();
  revealOnScroll();
  animateProgressBars();
  updateActiveNav();
  updateThemeButton();
});

const genericContactForm = document.querySelector('form');
if (genericContactForm) {
  genericContactForm.addEventListener('submit', () => {
    const popup = document.getElementById('success-popup');
    if (popup) {
      popup.classList.add('show-popup');
      setTimeout(() => {
        popup.classList.remove('show-popup');
      }, 3000);
    }
  });
}
