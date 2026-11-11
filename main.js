/* 共通JS - Ryo Yamashiro Portfolio */

// FABのあるページだけでメニューを初期化する。
const fabBtn = document.getElementById('fab-btn');
const fabMenu = document.getElementById('fab-menu');

if (fabBtn && fabMenu) {
  const fabItems = fabMenu.querySelectorAll('.fab-item');
  const timers = new Map();
  let fabOpen = false;

  function setFabOpen(open) {
    fabOpen = open;
    fabBtn.classList.toggle('open', open);
    fabBtn.setAttribute('aria-expanded', String(open));
    fabItems.forEach((el, i) => {
      clearTimeout(timers.get(el));
      if (open) {
        timers.set(el, setTimeout(() => {
          el.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
          el.classList.remove('opacity-0', 'translate-y-4');
          timers.delete(el);
        }, i * 60));
      } else {
        el.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
        el.classList.add('opacity-0', 'translate-y-4');
        timers.delete(el);
      }
    });
  }

  fabBtn.addEventListener('click', () => setFabOpen(!fabOpen));
  fabItems.forEach(el => el.addEventListener('click', () => setFabOpen(false)));
  document.addEventListener('click', (event) => {
    if (fabOpen && !fabBtn.contains(event.target) && !fabMenu.contains(event.target)) {
      setFabOpen(false);
    }
  });
}

// スクロール演出のあるページだけで監視する。
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }
}
