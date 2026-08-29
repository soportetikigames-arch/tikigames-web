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
/* ─── Videos de la comunidad: play central + repetir al finalizar ─── */
(function () {
  var ICON_PLAY   = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
  var ICON_REPLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>';

  function init() {
    document.querySelectorAll('.tk-video-box').forEach(function (box) {
      var video   = box.querySelector('video');
      var overlay = box.querySelector('.tk-video-overlay');
      if (!video || !overlay) return;
      var icon  = overlay.querySelector('.tk-video-icon');
      var label = overlay.querySelector('.tk-video-label');

      function mostrar(modoReplay) {
        icon.innerHTML = modoReplay ? ICON_REPLAY : ICON_PLAY;
        overlay.classList.toggle('is-replay', !!modoReplay);
        overlay.setAttribute('aria-label', modoReplay ? 'Ver de nuevo' : 'Reproducir video');
        if (label) label.hidden = !modoReplay;
        overlay.hidden = false;
      }

      overlay.addEventListener('click', function () {
        if (video.ended) video.currentTime = 0;
        var r = video.play();
        if (r && r.catch) r.catch(function () {});
      });

      video.addEventListener('play',  function () { overlay.hidden = true; });
      video.addEventListener('pause', function () { if (!video.ended) mostrar(false); });
      video.addEventListener('ended', function () { mostrar(true); });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
