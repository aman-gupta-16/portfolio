function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Dark/Light Mode Toggle
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById('theme-icon');
  
  // Toggle dark mode class on body
  body.classList.toggle('dark-mode');
  
  // Update icon based on current theme
  if (body.classList.contains('dark-mode')) {
    themeIcon.src = './assets/sun.png';
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.src = './assets/moon.png';
    localStorage.setItem('theme', 'light');
  }
}

// Check for saved theme preference
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  const themeIcon = document.getElementById('theme-icon');
  
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.src = './assets/sun.png';
  } else {
    themeIcon.src = './assets/moon.png';
  }
}

// Scroll to Top Button
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

// Add typing effect to the job title
function typeEffect() {
  const jobTitle = document.querySelector('.section__text__p2');
  const text = jobTitle.textContent;
  jobTitle.textContent = '';
  
  let i = 0;
  const typing = setInterval(() => {
    if (i < text.length) {
      jobTitle.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typing);
    }
  }, 100);
}

// Animation for skills
function animateSkills() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.5 });
  
  const skillArticles = document.querySelectorAll('article');
  skillArticles.forEach(article => {
    observer.observe(article);
  });
}

// Add scroll animations
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  const elements = document.querySelectorAll('.section__pic-container, .details-container, .color-container');
  elements.forEach(el => {
    observer.observe(el);
  });
}

// Initialize all functions on page load
window.onload = function() {
  loadTheme();
  typeEffect();
  
  // Add scroll to top button
  const scrollTopButton = document.createElement('div');
  scrollTopButton.id = 'scrollTopBtn';
  scrollTopButton.className = 'scroll-top';
  scrollTopButton.innerHTML = '&#8679;';
  scrollTopButton.onclick = scrollToTop;
  document.body.appendChild(scrollTopButton);
  
  // Add event listener for scroll
  window.onscroll = function() {
    scrollFunction();
  };
  
  // Initialize animations
  animateSkills();
  initScrollAnimations();
};