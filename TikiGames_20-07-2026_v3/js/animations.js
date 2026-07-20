/* ============================================
   TIKIGAMES - ANIMATIONS JS
   Partículas, Scroll Reveal, Contadores,
   Typed text, Scroll horizontal
   ============================================ */

// ─── Particles Canvas ──────────────────────────
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = Array.from({ length: 60 }, () => ({
    x:     Math.random() * canvas.width,
    y:     Math.random() * canvas.height,
    r:     Math.random() * 2 + 0.5,
    dx:    (Math.random() - 0.5) * 0.4,
    dy:    (Math.random() - 0.5) * 0.4,
    color: Math.random() > 0.5 ? '#ff0050' : '#00f0ff',
    alpha: Math.random() * 0.5 + 0.2,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, '0');
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });

    // Líneas entre partículas cercanas
    particles.forEach((a, i) => {
      particles.slice(i + 1).forEach(b => {
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(0,240,255,${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(draw);
  }
  draw();
}
initParticles();

// ─── Scroll Reveal ─────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── Counter animation ──────────────────────────
function animateCounter(el) {
  const target   = parseInt(el.dataset.target);
  const suffix   = el.dataset.suffix || '';
  const duration = 1800;
  const step     = target / (duration / 16);
  let current    = 0;

  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current).toLocaleString() + suffix;
    if (current >= target) clearInterval(timer);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.stats-strip').forEach(el => counterObserver.observe(el));

// ─── Typed text effect ──────────────────────────
function initTyped(el) {
  if (!el) return;
  const words = el.dataset.typed.split('|');
  let wi = 0, ci = 0, deleting = false;

  function type() {
    const word = words[wi];
    el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
    let delay = deleting ? 60 : 100;
    if (!deleting && ci > word.length)  { delay = 1800; deleting = true; }
    else if (deleting && ci < 0)        { deleting = false; wi = (wi + 1) % words.length; ci = 0; delay = 300; }
    setTimeout(type, delay);
  }
  type();
}
initTyped(document.querySelector('[data-typed]'));

// ─── Horizontal scroll nav ──────────────────────
document.querySelectorAll('[data-scroll-container]').forEach(container => {
  const id      = container.dataset.scrollContainer;
  const prevBtn = document.querySelector(`[data-scroll-prev="${id}"]`);
  const nextBtn = document.querySelector(`[data-scroll-next="${id}"]`);
  const el      = document.getElementById(id);
  const amount  = 300;

  prevBtn?.addEventListener('click', () => el.scrollBy({ left: -amount, behavior: 'smooth' }));
  nextBtn?.addEventListener('click', () => el.scrollBy({ left:  amount, behavior: 'smooth' }));
});
