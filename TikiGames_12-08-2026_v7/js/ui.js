function openModal(id) {
document.getElementById(id)?.classList.add('open');
document.body.style.overflow = 'hidden';
}
function closeModal(id) {
document.getElementById(id)?.classList.remove('open');
document.body.style.overflow = '';
}
window.openModal = openModal;
window.closeModal = closeModal;
document.querySelectorAll('.modal-overlay').forEach(overlay => {
overlay.addEventListener('click', (e) => {
if (e.target === overlay) closeModal(overlay.id);
});
});
function showToast(title, msg = '') {
let toast = document.querySelector('.toast');
if (!toast) {
toast = document.createElement('div');
toast.className = 'toast';
document.body.appendChild(toast);
}
toast.innerHTML = `
<div class="toast-text">
<div class="toast-title">${title}</div>
${msg ? `<div class="toast-msg">${msg}</div>` : ''}
</div>
`;
setTimeout(() => toast.classList.add('show'), 10);
setTimeout(() => toast.classList.remove('show'), 3500);
}
window.showToast = showToast;
document.querySelectorAll('[data-favorite]').forEach(btn => {
btn.addEventListener('click', (e) => {
e.stopPropagation();
btn.classList.toggle('active');
const isActive = btn.classList.contains('active');
showToast(
isActive ? 'Agregado a favoritos' : 'Eliminado de favoritos',
''
);
});
});
function toggleFaq(btn) {
const body = btn.nextElementSibling;
const arrow = btn.querySelector('.faq-arrow');
const open = body.style.maxHeight && body.style.maxHeight !== '0px';
document.querySelectorAll('.faq-body').forEach(b => b.style.maxHeight = '0');
document.querySelectorAll('.faq-arrow').forEach(a => a.style.transform = 'rotate(0deg)');
if (!open) {
body.style.maxHeight = body.scrollHeight + 'px';
if (arrow) arrow.style.transform = 'rotate(180deg)';
}
}
window.toggleFaq = toggleFaq;