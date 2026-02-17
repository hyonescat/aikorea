/**
 * Republic of Korea AI Dashboard - Interactive Charts
 */

document.addEventListener('DOMContentLoaded', function() {
  initRDChart();
  init5GChart();
  initNavigation();
  initAnimations();
});

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

  data.forEach(item => {
    const percentage = (item.value / maxValue) * 100;
    const barItem = document.createElement('div');
    barItem.className = 'bar-item';
    barItem.innerHTML = `
      <div class="bar-label">${item.country}</div>
      <div class="bar-track">
        <div class="bar-fill" style="width: ${percentage}%; background: ${item.color};">
          <span class="bar-value">${item.value}%</span>
        </div>
      </div>
    `;
    container.appendChild(barItem);
  });
}

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

  data.forEach(item => {
    const barItem = document.createElement('div');
    barItem.className = 'bar-item';
    barItem.innerHTML = `
      <div class="bar-label">${item.country}</div>
      <div class="bar-track">
        <div class="bar-fill" style="width: ${item.value}%; background: ${item.color};">
          <span class="bar-value">${item.value}%</span>
        </div>
      </div>
    `;
    container.appendChild(barItem);
  });
}

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
        window.scrollTo({
          top: targetSection.offsetTop - headerHeight - 20,
          behavior: 'smooth'
        });
      }
    });
  });

  window.addEventListener('scroll', function() {
    let current = '';
    const scrollPosition = window.scrollY + 200;
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

function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  const animatedElements = document.querySelectorAll('.section, .card, .stat-card');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}
