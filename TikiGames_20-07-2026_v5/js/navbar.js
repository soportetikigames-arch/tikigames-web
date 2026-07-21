const navbar = document.querySelector('.navbar');
if (navbar) {
window.addEventListener('scroll', () => {
navbar.classList.toggle('scrolled', window.scrollY > 50);
});
}
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
if (hamburger && mobileNav) {
hamburger.addEventListener('click', () => {
mobileNav.classList.toggle('open');
});
mobileNav.querySelectorAll('a').forEach(a => {
a.addEventListener('click', () => mobileNav.classList.remove('open'));
});
}
(function setActiveNav() {
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
if (a.getAttribute('href') === page) a.classList.add('active');
});
})();