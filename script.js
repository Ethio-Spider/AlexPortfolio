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
// ACTIVE NAV LINK ON SCROLL
// =============================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll('.nav-link');

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
const revealElements = document.querySelectorAll('.section, .project-card, .timeline-item');

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
const text = "Alemneh";
let index = 0;

function typeEffect() {
  const heroSpan = document.querySelector('.typing');
  if (!heroSpan) return;

  heroSpan.textContent = text.slice(0, index);
  index++;

  if (index <= text.length) {
    setTimeout(typeEffect, 150);
  }
}

// start typing after page load
window.addEventListener("load", typeEffect);

// =============================
// DARK/LIGHT MODE TOGGLE
// =============================
function toggleMode() {
  document.body.classList.toggle('light-mode');
  const button = document.getElementById('mode-toggle');
  if (document.body.classList.contains('light-mode')) {
    button.textContent = '🌞';
  } else {
    button.textContent = '🌙';
  }
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
  setupProfilePictureUpload();
});

// =============================
// PROFILE PICTURE UPLOAD
// =============================
function setupProfilePictureUpload() {
  const fileInput = document.getElementById('profilePictureInput');
  if (!fileInput) return;

  fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const imageData = event.target.result;
        // Update hero profile picture
        const heroImg = document.getElementById('heroProfileImg');
        const heroEmoji = document.getElementById('heroProfileEmoji');
        if (heroImg) {
          heroImg.src = imageData;
          heroImg.style.display = 'block';
          heroEmoji.style.display = 'none';
        }

        // Update about profile picture
        const aboutImg = document.getElementById('aboutProfileImg');
        const aboutEmoji = document.getElementById('aboutProfileEmoji');
        if (aboutImg) {
          aboutImg.src = imageData;
          aboutImg.style.display = 'block';
          aboutEmoji.style.display = 'none';
        }

        // Store image data in localStorage
        localStorage.setItem('profilePicture', imageData);
      };
      reader.readAsDataURL(file);
    }
  });

  // Load stored profile picture on page load
  const storedImage = localStorage.getItem('profilePicture');
  if (storedImage) {
    const heroImg = document.getElementById('heroProfileImg');
    const heroEmoji = document.getElementById('heroProfileEmoji');
    if (heroImg) {
      heroImg.src = storedImage;
      heroImg.style.display = 'block';
      if (heroEmoji) heroEmoji.style.display = 'none';
    }

    const aboutImg = document.getElementById('aboutProfileImg');
    const aboutEmoji = document.getElementById('aboutProfileEmoji');
    if (aboutImg) {
      aboutImg.src = storedImage;
      aboutImg.style.display = 'block';
      if (aboutEmoji) aboutEmoji.style.display = 'none';
    }
  }
}