/**
 * Republic of Korea AI Dashboard - Glassmorphism Edition
 * Enhanced animations and interactions
 */

document.addEventListener('DOMContentLoaded', function() {
  initRDChart();
  init5GChart();
  initNavigation();
  initScrollAnimations();
  initCounterAnimations();
  initParallaxEffect();
  initGlowEffects();
});

// R&D Investment Chart with animation
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
    barItem.innerHTML = `
      <div class="bar-label">${item.country}</div>
      <div class="bar-track">
        <div class="bar-fill" style="width: 0%; background: ${item.color}; box-shadow: 0 0 20px ${item.color}40;">
          <span class="bar-value">${item.value}%</span>
        </div>
      </div>
    `;
    container.appendChild(barItem);
    
    // Animate in
    setTimeout(() => {
      barItem.style.transition = 'all 0.6s ease';
      barItem.style.opacity = '1';
      barItem.style.transform = 'translateX(0)';
      const fill = barItem.querySelector('.bar-fill');
      setTimeout(() => {
        fill.style.width = percentage + '%';
      }, 100);
    }, index * 100);
  });
}

// 5G Coverage Chart with animation
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
    barItem.innerHTML = `
      <div class="bar-label">${item.country}</div>
      <div class="bar-track">
        <div class="bar-fill" style="width: 0%; background: ${item.color}; box-shadow: 0 0 20px ${item.color}40;">
          <span class="bar-value">${item.value}%</span>
        </div>
      </div>
    `;
    container.appendChild(barItem);
    
    setTimeout(() => {
      barItem.style.transition = 'opacity 0.6s ease';
      barItem.style.opacity = '1';
      const fill = barItem.querySelector('.bar-fill');
      setTimeout(() => {
        fill.style.width = item.value + '%';
      }, 100);
    }, index * 100);
  });
}

// Navigation with smooth scroll and active state
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 30;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Active section highlighting with IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

// Scroll reveal animations
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        // Add glow effect on reveal
        if (entry.target.classList.contains('hero-stat') || 
            entry.target.classList.contains('stat-card')) {
          entry.target.style.boxShadow = '0 0 40px rgba(0, 212, 255, 0.2)';
          setTimeout(() => {
            entry.target.style.boxShadow = '';
          }, 1000);
        }
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.section, .card, .stat-card, .hero-stat, .chart-container');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });
}

// Counter animations for statistics
function initCounterAnimations() {
  const counters = document.querySelectorAll('.stat-value, .hero-stat-value, .card-stat');
  
  const observerOptions = {
    root: null,
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        animateCounter(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
  const text = element.textContent;
  const numericMatch = text.match(/[\d.]+/);
  
  if (!numericMatch) return;
  
  const numericValue = parseFloat(numericMatch[0]);
  const prefix = text.substring(0, text.indexOf(numericMatch[0]));
  const suffix = text.substring(text.indexOf(numericMatch[0]) + numericMatch[0].length);
  
  let current = 0;
  const increment = numericValue / 60;
  const duration = 2000;
  const stepTime = duration / 60;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= numericValue) {
      current = numericValue;
      clearInterval(timer);
    }
    
    const decimals = numericValue % 1 !== 0 ? 1 : 0;
    element.textContent = prefix + current.toFixed(decimals) + suffix;
  }, stepTime);
}

// Parallax effect for hero section
function initParallaxEffect() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = hero.querySelector('::before');
    if (parallax) {
      parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });
}

// Glow effects on mouse move
function initGlowEffects() {
  const cards = document.querySelectorAll('.card, .hero-stat');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// Smooth reveal for timeline items
function initTimelineAnimations() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }, index * 100);
      }
    });
  }, { threshold: 0.2 });

  timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'all 0.6s ease';
    observer.observe(item);
  });
}

// Export for global access
window.KoreaDashboard = {
  initRDChart,
  init5GChart,
  animateCounter
};
