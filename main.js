/* =============================================
   共通JS - Ryo Yamashiro Portfolio
============================================= */

// ── FAB メニュー ──
const fabBtn   = document.getElementById('fab-btn');
const fabItems = document.querySelectorAll('.fab-item');
let fabOpen = false;

function toggleFab() {
  fabOpen = !fabOpen;
  fabBtn.classList.toggle('open', fabOpen);
  fabBtn.setAttribute('aria-expanded', fabOpen);
  fabItems.forEach((el, i) => {
    if (fabOpen) {
      setTimeout(() => {
        el.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
        el.classList.remove('opacity-0', 'translate-y-4');
      }, i * 60);
    } else {
      el.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
      el.classList.add('opacity-0', 'translate-y-4');
    }
  });
}

function closeFab() {
  if (!fabOpen) return;
  toggleFab();
}

// 外タップで閉じる
document.addEventListener('click', (e) => {
  if (fabOpen && !e.target.closest('#fab-btn') && !e.target.closest('#fab-menu')) {
    closeFab();
  }
});