// Toggle hamburger menu function
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Dark/Light Mode Toggle function
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  const iconName = isDark ? 'fa-sun' : 'fa-moon';
  const iconColor = isDark ? '#FFD700' : '#6a81a9';
  ['theme-icon', 'theme-icon-mobile'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.className = `fas ${iconName}`;
      el.style.color = iconColor;
    }
  });
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Check for saved theme preference
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  const themeIcon = document.getElementById('theme-icon');
  const themeIconMobile = document.getElementById('theme-icon-mobile');
  const allIcons = document.querySelectorAll('.icon');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    themeIcon.style.color = '#FFD700';

    if (themeIconMobile) {
      themeIconMobile.classList.remove('fa-moon');
      themeIconMobile.classList.add('fa-sun');
      themeIconMobile.style.color = '#FFD700';
    }

    allIcons.forEach(icon => {
      if (!icon.classList.contains('skill-icon')) {
        icon.style.filter = 'brightness(1.5) invert(0.2)';
      }
    });
  } else {
    themeIcon.style.color = '#6a81a9';
    if (themeIconMobile) {
      themeIconMobile.style.color = '#6a81a9';
    }
    allIcons.forEach(icon => {
      if (!icon.classList.contains('skill-icon')) {
        icon.style.filter = 'none';
      }
    });
  }
}

// Scroll to Top Button functionality
function scrollFunction() {
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    scrollTopBtn.classList.add("active");
  } else {
    scrollTopBtn.classList.remove("active");
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// Typing effect and blinking cursor
let typingInterval = null;
let cursorInterval = null;

function typeEffect() {
  const jobTitle = document.querySelector('.section__text__p2');
  const text = "Full Stack Developer";
  let i = 0;

  clearInterval(typingInterval);
  clearInterval(cursorInterval);
  jobTitle.innerHTML = '';

  typingInterval = setInterval(() => {
    if (i < text.length) {
      jobTitle.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typingInterval);
      setTimeout(() => {
        addBlinkingCursor(jobTitle);
      }, 300);
    }
  }, 100);

  // Prevent multiple listeners
  if (!jobTitle.dataset.listenerAttached) {
    jobTitle.addEventListener('click', () => {
      typeEffect();
    });
    jobTitle.dataset.listenerAttached = 'true';
  }
}

function addBlinkingCursor(element) {
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  cursor.textContent = '|';
  element.appendChild(cursor);

  cursorInterval = setInterval(() => {
    cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
  }, 500);
}

// Animation for elements when they scroll into view
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  const elements = document.querySelectorAll('.animate-on-scroll');
  elements.forEach(el => {
    observer.observe(el);
  });
}

// Animation for skill progress bars
function animateSkillBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillBars = entry.target.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
          setTimeout(() => {
            bar.style.width = bar.classList.contains('experienced') ? '90%' : '70%';
          }, index * 100);
        });
      }
    });
  }, { threshold: 0.5 });

  const skillCards = document.querySelectorAll('.skills-card');
  skillCards.forEach(card => {
    observer.observe(card);
  });
}

// Initialize all functions on page load
window.onload = function () {
  loadTheme();
  typeEffect();

  document.getElementById("scrollTopBtn").addEventListener("click", scrollToTop);

  window.onscroll = function () {
    scrollFunction();
  };

  initScrollAnimations();
  animateSkillBars();
};
