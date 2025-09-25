// Loader functionality
function hideLoader() {
  const loader = document.querySelector('.loader-container');
  if (loader) {
    loader.classList.add('hidden');
    // Remove loader from DOM after transition
    setTimeout(() => {
      loader.remove();
    }, 500);
  }
}

// Show loader on page start
document.addEventListener('DOMContentLoaded', () => {
  // Minimum loading time for smooth experience
  const minLoadTime = 800;
  const startTime = Date.now();
  
  // Hide loader when everything is loaded
  window.addEventListener('load', () => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, minLoadTime - elapsed);
    
    setTimeout(hideLoader, remaining);
  });
  
  // Fallback: hide loader after 3 seconds
  setTimeout(hideLoader, 3000);
});

// Theme toggle
const themeBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  if (themeIcon) themeIcon.src = "img/moon.png";
} else {
  if (themeIcon) themeIcon.src = "img/sun.png";
}

// Theme toggle event
if (themeBtn && themeIcon) {
  themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark');
    if (body.classList.contains('dark')) {
      themeIcon.src = "img/moon.png";
      localStorage.setItem('theme', 'dark');
    } else {
      themeIcon.src = "img/sun.png";
      localStorage.setItem('theme', 'light');
    }
  });
}

// Language toggle
const langBtn = document.getElementById('lang-toggle');
const langIcon = document.getElementById('lang-icon');
let currentLang = localStorage.getItem('lang') || 'en';

function setLanguage(lang) {
  document.querySelectorAll('[data-en]').forEach(el => {
    const value = el.getAttribute(`data-${lang}`);
    if (value !== null) el.textContent = value;
  });
  
  if (langIcon) {
    if (lang === 'sk') {
      langIcon.src = "img/slovakia.png";
    } else {
      langIcon.src = "img/united-kingdom.png";
    }
  }
  
  currentLang = lang;
  localStorage.setItem('lang', lang);
}

// Initialize language
setLanguage(currentLang);

// Language toggle event
if (langBtn) {
  langBtn.addEventListener('click', () => {
    const newLang = currentLang === 'en' ? 'sk' : 'en';
    setLanguage(newLang);
  });
}

// Burger menu toggle - OPRAVENÉ
const burger = document.getElementById('burger');
const navbar = document.getElementById('navbar');
const navUl = navbar ? navbar.querySelector('ul') : null;

if (burger && navUl) {
  burger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    navUl.classList.toggle('show');
    
    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      if (!navbar.contains(event.target) && !burger.contains(event.target)) {
        navUl.classList.remove('show');
      }
    }, { once: true });
  });
  
  // Close menu when clicking on menu items
  navUl.addEventListener('click', () => {
    navUl.classList.remove('show');
  });
}

// Close mobile menu on window resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && navUl) {
    navUl.classList.remove('show');
  }
});

// Footer year
function setFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// Initialize footer year
setFooterYear();

// Smooth animations on page load
document.addEventListener('DOMContentLoaded', () => {
  // Add staggered animation to sections
  const sections = document.querySelectorAll('section, .day-column');
  sections.forEach((section, index) => {
    section.style.animationDelay = `${index * 0.1}s`;
  });
});

// Add hover effects to interactive elements
document.addEventListener('DOMContentLoaded', () => {
  // Add ripple effect to buttons
  const buttons = document.querySelectorAll('button, .pdf-link');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.3)';
      ripple.style.pointerEvents = 'none';
      ripple.style.animation = 'ripple 0.6s linear';
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);