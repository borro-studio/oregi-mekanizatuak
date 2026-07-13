document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.querySelector('.site-nav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      siteNav.classList.toggle('mobile-open');
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
            const content = char === ' ' ? '&nbsp;' : char;
            const html = `<span class="letter" style="animation-delay:${delay.toFixed(2)}s">${content}</span>`;
            delay += step;
            return html;
          })
          .join('');
        return `<span class="hero-line">${letters}</span>`;
      })
      .join('<br />');
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
