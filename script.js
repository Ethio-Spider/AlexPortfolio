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
// HERO TYPING EFFECT WITH LOOP
// =============================
const subtitleTexts = [
  "I am a frontend developer",
  "I am a Cisco network specialist",
  "I am a full-stack developer",
  "I am a problem solver"
];

let currentTextIndex = 0;
let subtitleIndex = 0;
let isDeleting = false;
let typingSpeed = 50;
let deletingSpeed = 30;
let delayBeforeDelete = 2000; // Wait 2 seconds before deleting

function typeEffect() {
  const heroSpan = document.querySelector('.typing');
  const subtitleSpan = document.querySelector('.typing-subtitle');

  if (!heroSpan || !subtitleSpan) return;

  // Show name instantly without animation
  heroSpan.textContent = "Alemneh";

  const currentText = subtitleTexts[currentTextIndex];

  if (!isDeleting) {
    // Typing mode
    if (subtitleIndex <= currentText.length) {
      subtitleSpan.textContent = currentText.slice(0, subtitleIndex);
      subtitleIndex++;
      setTimeout(typeEffect, typingSpeed);
    } else {
      // Text is complete, wait before deleting
      isDeleting = true;
      setTimeout(typeEffect, delayBeforeDelete);
    }
  } else {
    // Deleting mode
    if (subtitleIndex > 0) {
      subtitleIndex--;
      subtitleSpan.textContent = currentText.slice(0, subtitleIndex);
      setTimeout(typeEffect, deletingSpeed);
    } else {
      // Move to next text
      isDeleting = false;
      currentTextIndex = (currentTextIndex + 1) % subtitleTexts.length;
      subtitleIndex = 0;
      setTimeout(typeEffect, 500); // Delay before typing next text
    }
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
// EMAILJS INITIALIZATION
// =============================
// Initialize EmailJS with your Public Key






// Initialize EmailJS
(function () {
  emailjs.init("7f3JrIxsvQbrTXPN6");
})();

// =============================
// FORM VALIDATION & EMAIL SUBMISSION
// =============================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const submitBtn = document.getElementById("submitBtn");
    const originalText = submitBtn.textContent;

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    // Get form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // =============================
    // SEND EMAIL TO YOU
    // =============================

    emailjs.send("service_8vm5ajt", "template_iz32hlo", {
      to_email: "amognehegnalemneh@gmail.com",
      from_name: name,
      from_email: email,
      subject: subject,
      message: message
    })

    .then(function (response) {

      console.log("Admin email sent!", response.status);

      // =============================
      // AUTO REPLY TO VISITOR
      // =============================

      return emailjs.send(
        "service_8vm5ajt",
        "template_oyy9nof",
        {
          to_name:name,
          email: email,
          from_name: "Alex Portfolio",
          from_email: "amognehegnalemneh@gmail.com",
          subject: "Thank you for contacting me!",
          message:
            "Hello " +
            name +
            ", thank you for reaching out through my portfolio website. I received your message and I will get back to you soon."
        }
      );
    })

    .then(function (response) {

      console.log("Auto reply sent!", response.status);

      showMessage(
        "Message sent successfully! Please check your email for confirmation.",
        "success"
      );

      contactForm.reset();
      clearErrors();

      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    })

    .catch(function (error) {

      
      console.error("FAILED...", error);

      showMessage(
        "Failed to send message. Please try again later.",
        "error"
      );

      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    });
  });
}


//
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
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }
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
  if (messageElement) {
    messageElement.textContent = message;
    messageElement.className = type;
    messageElement.style.display = 'block';

    setTimeout(() => {
      messageElement.style.display = 'none';
    }, 5000);
  }
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
// ANIMATED COUNTERS
// =============================
function initCounters() {
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
}

// =============================
// PROJECT FILTERING
// =============================
function initProjectFiltering() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active-filter'));
      btn.classList.add('active-filter');
      
      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        if (filter === 'all') {
          card.style.display = 'block';
        } else {
          // Add data-filter attribute to project cards if needed
          card.style.display = card.getAttribute('data-filter') === filter ? 'block' : 'none';
        }
      });
    });
  });
}

// =============================
// CUSTOM CURSOR
// =============================
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  if (!cursor) return;

  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
}

// =============================
// PARTICLE BACKGROUND ANIMATION
// =============================
function initParticles() {
  const canvas = document.getElementById('particles-bg');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

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
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 212, 255, 0.5)';
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
}

// =============================
// SCROLL REVEAL ANIMATION
// =============================
function initScrollReveal() {
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
}

// =============================
// ACTIVE NAVIGATION HIGHLIGHT
// =============================
function initActiveNav() {
  const sectionElements = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav(){
    let current = '';
    sectionElements.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      if(window.pageYOffset >= sectionTop){
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
}

// =============================
// THEME PERSISTENCE
// =============================
function initThemePersistence() {
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
}

// =============================
// INTERSECTION OBSERVER FOR COUNTERS
// =============================
function initCounterObserver() {
  const countersSection = document.getElementById('counters');
  if (!countersSection) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        initCounters();
        entry.target.classList.add('counted');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(countersSection);
}

// =============================
// INITIALIZE ALL FUNCTIONS
// =============================
window.addEventListener('load', () => {
  typeEffect();
  initScrollReveal();
  animateProgressBars();
  initActiveNav();
  updateThemeButton();
  initCounters();
  initProjectFiltering();
  initCustomCursor();
  initParticles();
  initThemePersistence();
  initCounterObserver();
});

// Initialize on DOM ready as well
document.addEventListener('DOMContentLoaded', () => {
  // Additional initialization if needed
  console.log('Portfolio loaded successfully!');
});
