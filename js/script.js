document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle — full-screen panel with staggered link reveal
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.querySelector('.site-nav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const opening = !siteNav.classList.contains('mobile-open');
      if (opening) {
        siteNav.classList.add('mobile-open');
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => siteNav.classList.add('nav-panel-visible'));
        });
      } else {
        siteNav.classList.remove('mobile-open', 'nav-panel-visible');
        document.body.style.overflow = '';
      }
    });
    siteNav.querySelectorAll('.nav-links a').forEach((link) => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('mobile-open', 'nav-panel-visible');
        document.body.style.overflow = '';
      });
    });
  }

  // Accordion (materials list)
  document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.accordion-item').forEach((el) => el.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Sectores tabs
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // Hero title letter-by-letter animation
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const lines = heroTitle.innerHTML.split(/<br\s*\/?>/i);
    let delay = 0;
    const step = 0.035;
    heroTitle.innerHTML = lines
      .map((line) => {
        const letters = line
          .split('')
          .map((char) => {
            if (char === ' ') {
              delay += step;
              return ' ';
            }
            const html = `<span class="letter" style="animation-delay:${delay.toFixed(2)}s">${char}</span>`;
            delay += step;
            return html;
          })
          .join('');
        return `<span class="hero-line">${letters}</span>`;
      })
      .join('');
  }

  // Hero video logo sync — hero text fades with the intro/outro logo in the background loop
  const heroVideo = document.querySelector('.hero-bg');
  const heroContent = document.querySelector('.hero-content');
  if (heroVideo && heroContent) {
    const visibleWindows = [[0, 4.9], [39.0, 45.3]];
    const isVisible = (t) => visibleWindows.some(([a, b]) => t >= a && t <= b);
    heroVideo.addEventListener('timeupdate', () => {
      heroContent.classList.toggle('hero-hidden', !isVisible(heroVideo.currentTime));
    });
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal, .reveal-group');
  if (revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
  }
});
