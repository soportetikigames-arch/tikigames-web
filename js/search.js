const searchOverlay = document.querySelector('.search-overlay');
const searchOpenBtns = document.querySelectorAll('[data-search-open]');
const searchCloseBtn = document.querySelector('[data-search-close]');
const searchInput = searchOverlay?.querySelector('.search-big');
searchOpenBtns.forEach(btn => {
btn.addEventListener('click', () => {
searchOverlay?.classList.add('open');
setTimeout(() => searchInput?.focus(), 100);
});
});
searchCloseBtn?.addEventListener('click', () => {
searchOverlay?.classList.remove('open');
});
searchOverlay?.addEventListener('click', (e) => {
if (e.target === searchOverlay) searchOverlay.classList.remove('open');
});
document.addEventListener('keydown', (e) => {
if (e.key === 'Escape') searchOverlay?.classList.remove('open');
});