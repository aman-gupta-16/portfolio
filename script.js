// Toggle hamburger menu function
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Dark/Light Mode Toggle function
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById('theme-icon');
  const themeIconMobile = document.getElementById('theme-icon-mobile');
  const allIcons = document.querySelectorAll('.icon');
  
  // Toggle dark mode class on body
  body.classList.toggle('dark-mode');
  
  // Update icon based on current theme
  if (body.classList.contains('dark-mode')) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    themeIcon.style.color = '#FFD700'; // Gold color for sun icon
    
    // Also update mobile theme icon
    if (themeIconMobile) {
      themeIconMobile.classList.remove('fa-moon');
      themeIconMobile.classList.add('fa-sun');
      themeIconMobile.style.color = '#FFD700'; // Gold color for sun icon
    }
    
    // Apply filter to all icons with class "icon" for dark mode
    allIcons.forEach(icon => {
      if (!icon.classList.contains('skill-icon')) { // Don't apply to skill icons
        icon.style.filter = 'brightness(1.5) invert(0.2)';
      }
    });
    
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    themeIcon.style.color = '#6a81a9'; // Blue-ish color for moon icon
    
    // Also update mobile theme icon
    if (themeIconMobile) {
      themeIconMobile.classList.remove('fa-sun');
      themeIconMobile.classList.add('fa-moon');
      themeIconMobile.style.color = '#6a81a9'; // Blue-ish color for moon icon
    }
    
    // Reset filter for all icons with class "icon" for light mode
    allIcons.forEach(icon => {
      if (!icon.classList.contains('skill-icon')) { // Don't apply to skill icons
        icon.style.filter = 'none';
      }
    });
    
    localStorage.setItem('theme', 'light');
  }
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
    themeIcon.style.color = '#FFD700'; // Gold color for sun icon
    
    // Also update mobile theme icon
    if (themeIconMobile) {
      themeIconMobile.classList.remove('fa-moon');
      themeIconMobile.classList.add('fa-sun');
      themeIconMobile.style.color = '#FFD700'; // Gold color for sun icon
    }
    
    // Apply filter to all icons with class "icon" for dark mode
    allIcons.forEach(icon => {
      if (!icon.classList.contains('skill-icon')) { // Don't apply to skill icons
        icon.style.filter = 'brightness(1.5) invert(0.2)';
      }
    });
  } else {
    // Ensure moon icon has correct color on first load
    themeIcon.style.color = '#6a81a9'; // Blue-ish color for moon icon
    
    if (themeIconMobile) {
      themeIconMobile.style.color = '#6a81a9'; // Blue-ish color for moon icon
    }
    
    // Reset filter for all icons with class "icon" for light mode
    allIcons.forEach(icon => {
      if (!icon.classList.contains('skill-icon')) { // Don't apply to skill icons
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

// Add typing effect to the job title
function typeEffect() {
  const jobTitle = document.querySelector('.section__text__p2');
  const text = "Full Stack Developer"; // The text to type
  jobTitle.textContent = '';
  
  let i = 0;
  const typing = setInterval(() => {
    if (i < text.length) {
      jobTitle.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typing);
      // After typing completes, add a blinking cursor effect
      setTimeout(() => {
        addBlinkingCursor(jobTitle);
      }, 1000);
    }
  }, 100);
}

// Add blinking cursor effect after typing completes
function addBlinkingCursor(element) {
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  cursor.textContent = '|';
  element.appendChild(cursor);
  
  setInterval(() => {
    cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
  }, 500);
  
  // Add event to restart typing effect when clicked
  element.addEventListener('click', () => {
    element.textContent = '';
    typeEffect();
  });
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
window.onload = function() {
  loadTheme();
  typeEffect();
  
  // Set up click event for scroll to top button
  document.getElementById("scrollTopBtn").addEventListener("click", scrollToTop);
  
  // Add event listener for scroll
  window.onscroll = function() {
    scrollFunction();
  };
  
  // Initialize animations
  initScrollAnimations();
  animateSkillBars();
};