/* ============================================
   TIKIGAMES - SEARCH JS
   Overlay de búsqueda: abrir, cerrar, ESC
   ============================================ */

const searchOverlay  = document.querySelector('.search-overlay');
const searchOpenBtns = document.querySelectorAll('[data-search-open]');
const searchCloseBtn = document.querySelector('[data-search-close]');
const searchInput    = searchOverlay?.querySelector('.search-big');

// Abrir
searchOpenBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    searchOverlay?.classList.add('open');
    setTimeout(() => searchInput?.focus(), 100);
  });
});

// Cerrar con botón X
searchCloseBtn?.addEventListener('click', () => {
  searchOverlay?.classList.remove('open');
});

// Cerrar al click fuera del input
searchOverlay?.addEventListener('click', (e) => {
  if (e.target === searchOverlay) searchOverlay.classList.remove('open');
});

// Cerrar con ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') searchOverlay?.classList.remove('open');
});
