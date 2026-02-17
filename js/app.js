/**
 * Republic of Korea AI Dashboard - Premium Animations & Interactions
 * Glassmorphism UI with Smooth Animations
 */

document.addEventListener('DOMContentLoaded', function() {
  initRDChart();
  init5GChart();
  initNavigation();
  initScrollReveal();
  initParallax();
  initCounterAnimation();
  initHoverEffects();
  initHeaderScroll();
  initSmoothScroll();
});

/* ============================================
   R&D Investment Chart
   ============================================ */
function initRDChart() {
  const container = document.getElementById('rd-chart');
  if (!container) return;

  const data = [
    { country: 'Israel', value: 5.4, color: '#6B7280' },
    { country: 'South Korea', value: 4.9, color: '#C60C30' },
    { country: 'Sweden', value: 3.4, color: '#6B7280' },
    { country: 'Japan', value: 3.3, color: '#6B7280' },
    { country: 'USA', value: 3.1, color: '#6B7280' },
    { country: 'China', value: 2.4, color: '#6B7280' }
  ];

  const maxValue = Math.max(...data.map(d => d.value));

  data.forEach((item, index) => {
    const percentage = (item.value / maxValue) * 100;
    const barItem = document.createElement('div');
    barItem.className = 'bar-item';
    barItem.style.opacity = '0';
    barItem.style.transform = 'translateX(-20px)';
    barItem.style.transition = `all 500ms ease ${index * 100}ms`;
    
    barItem.innerHTML = `
      <div class="bar-label">${item.country}</div>
      <div class="bar-track">
        <div class="bar-fill" style="width: 0%; background: linear-gradient(90deg, ${item.color}, ${item.color}dd);">
          <span class="bar-value">${item.value}%</span>
        </div>
      </div>
    `;
    container.appendChild(barItem);

    // Animate bars on scroll
    setTimeout(() => {
      barItem.style.opacity = '1';
      barItem.style.transform = 'translateX(0)';
      const fill = barItem.querySelector('.bar-fill');
      setTimeout(() => {
        fill.style.width = `${percentage}%`;
      }, 100);
    }, 500 + (index * 100));
  });
}

/* ============================================
   5G Coverage Chart
   ============================================ */
function init5GChart() {
  const container = document.getElementById('5g-chart');
  if (!container) return;

  const data = [
    { country: 'South Korea', value: 85, color: '#C60C30' },
    { country: 'China', value: 60, color: '#6B7280' },
    { country: 'USA', value: 45, color: '#6B7280' },
    { country: 'Japan', value: 35, color: '#6B7280' },
    { country: 'Germany', value: 30, color: '#6B7280' }
  ];

  data.forEach((item, index) => {
    const barItem = document.createElement('div');
    barItem.className = 'bar-item';
    barItem.style.opacity = '0';
    barItem.style.transform = 'translateX(-20px)';
    barItem.style.transition = `all 500ms ease ${index * 100}ms`;
    
    barItem.innerHTML = `
      <div class="bar-label">${item.country}</div>
      <div class="bar-track">
        <div class="bar-fill" style="width: 0%; background: linear-gradient(90deg, ${item.color}, ${item.color}dd);">
          <span class="bar-value">${item.value}%</span>
        </div>
      </div>
    `;
    container.appendChild(barItem);

    // Animate bars on scroll
    setTimeout(() => {
      barItem.style.opacity = '1';
      barItem.style.transform = 'translateX(0)';
      const fill = barItem.querySelector('.bar-fill');
      setTimeout(() => {
        fill.style.width = `${item.value}%`;
      }, 100);
    }, 500 + (index * 100));
  });
}

/* ============================================
   Navigation Active State
   ============================================ */
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  const header = document.querySelector('.header');
  const headerHeight = header ? header.offsetHeight : 80;

  // Smooth scroll on nav click
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - headerHeight - 20,
          behavior: 'smooth'
        });
      }
    });
  });

  // Update active nav on scroll
  window.addEventListener('scroll', function() {
    let current = '';
    const scrollPosition = window.scrollY + headerHeight + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ============================================
   Scroll Reveal Animation
   ============================================ */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.section, .card, .stat-card, .hero-stat');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
}

/* ============================================
   Parallax Effect on Hero
   ============================================ */
function initParallax() {
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');
  
  if (!hero || !heroContent) return;

  let ticking = false;

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.4;
        
        if (scrolled < window.innerHeight) {
          heroContent.style.transform = `translateY(${rate}px)`;
          heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
        }
        
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ============================================
   Counter Animation for Statistics
   ============================================ */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.hero-stat-value, .stat-value, .card-stat:not(.years)');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        
        // Check if it's a number with special characters
        const hasSpecialChar = /^[#]/.test(text);
        const prefix = hasSpecialChar ? text.charAt(0) : '';
        const suffix = text.replace(/[0-9.#]/g, '').replace(prefix, '');
        const numericValue = parseFloat(text.replace(/[^0-9.]/g, ''));
        
        if (!isNaN(numericValue)) {
          animateCounter(el, 0, numericValue, 1500, prefix, suffix);
        }
        
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

function animateCounter(el, start, end, duration, prefix = '', suffix = '') {
  const startTime = performance.now();
  const isDecimal = end % 1 !== 0;
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (ease-out-cubic)
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = start + (end - start) * easeOut;
    
    if (isDecimal) {
      el.textContent = `${prefix}${current.toFixed(1)}${suffix}`;
    } else {
      el.textContent = `${prefix}${Math.floor(current)}${suffix}`;
    }
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      // Final value
      if (isDecimal) {
        el.textContent = `${prefix}${end.toFixed(1)}${suffix}`;
      } else {
        el.textContent = `${prefix}${end}${suffix}`;
      }
    }
  }
  
  requestAnimationFrame(update);
}

/* ============================================
   Interactive Hover Effects
   ============================================ */
function initHoverEffects() {
  // Add magnetic effect to buttons and cards
  const interactiveElements = document.querySelectorAll('.card, .hero-stat, .stat-card, .nav-link');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
      this.style.transition = 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    el.addEventListener('mouseleave', function() {
      this.style.transition = 'all 300ms ease';
    });
  });

  // Add glow effect to stat cards on hover
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.boxShadow = '';
    });
  });
}

/* ============================================
   Header Scroll Effect
   ============================================ */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

/* ============================================
   Smooth Scroll for All Anchor Links
   ============================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
        window.scrollTo({
          top: target.offsetTop - headerHeight - 20,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ============================================
   Utility Functions
   ============================================ */

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
