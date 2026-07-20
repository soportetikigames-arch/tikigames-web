/* ============================================
   TIKIGAMES - LANG.JS  v2
   Selector ES / EN basado en IDs de elemento.
   Más fiable que data-i18n: actualiza el texto
   exacto del nodo sin romper atributos ni hijos.
   ============================================ */

// ─── Diccionario completo ─────────────────────
const T = {
  es: {
    /* Navbar */
    'nav-inicio':    'Inicio',
    'nav-juegos':    'Juegos',
    'nav-comunidad': 'Comunidad',
    'nav-login-btn': 'Iniciar Sesión',

    /* Hero */
    'hero-h1':       'JUEGA. COMPITE. GANA.',
    'hero-h2':       'EN TIKTOK LIVE.',
    'hero-sub':      'Juegos interactivos para streamers y espectadores.',
    'hero-sub2':     'Tu comunidad decide la partida.',
    'btn-explorar':  'Explorar Juegos',
    'btn-comunidad': 'Unirse a la comunidad',
    'stat-jugadores':'Jugadores activos',
    'stat-streams':  'Streams en vivo',

    /* Featured game section */
    'sec-destacado': 'Juego Destacado',
    'sec-catalogo':  'Ver catálogo →',
    'badge-deportivo':'DEPORTIVO',
    'game-desc':     'Experiencia interactiva para TikTok Live. Tu audiencia elige países, apoya a sus favoritos y los impulsa hasta coronar al campeón. Incluye clasificación, goleadores, multiplicadores y personalización.',
    'btn-comprar':   'Comprar ahora',

    /* Community banner */
    'banner-label':  'Comunidad TikiGames',
    'banner-titulo': 'TU JUEGO.\nTU LIVE.',
    'banner-t3':     'TU COMUNIDAD.',
    'banner-desc':   'Conecta con miles de streamers y espectadores. Juega en tiempo real con tu comunidad de TikTok.',
    'banner-stat1':  'Juego disponible',
    'banner-stat2':  'Comunidad activa',
    'btn-unirse':    'Unirse ahora',

    /* Footer */
    'footer-desc':   'Juegos interactivos para streamers y espectadores de TikTok Live. Conecta tu comunidad, juega en tiempo real.',
    'footer-juegos': 'Juegos',
    'footer-empresa':'Empresa',
    'footer-soporte':'Soporte',
    'f-catalogo':    'Catálogo',
    'f-mundialito':  'Mundialito Torneo',
    'f-nosotros':    'Sobre nosotros',
    'f-contacto':    'Contacto',
    'f-ayuda':       'Centro de ayuda',
    'f-reembolsos':  'Reembolsos',
    'footer-copy':   '© 2025 TikiGames. Todos los derechos reservados.',
  },
  en: {
    /* Navbar */
    'nav-inicio':    'Home',
    'nav-juegos':    'Games',
    'nav-comunidad': 'Community',
    'nav-login-btn': 'Sign In',

    /* Hero */
    'hero-h1':       'PLAY. COMPETE. WIN.',
    'hero-h2':       'ON TIKTOK LIVE.',
    'hero-sub':      'Interactive games for streamers and viewers.',
    'hero-sub2':     'Your community decides the match.',
    'btn-explorar':  'Explore Games',
    'btn-comunidad': 'Join the community',
    'stat-jugadores':'Active players',
    'stat-streams':  'Live streams',

    /* Featured game section */
    'sec-destacado': 'Featured Game',
    'sec-catalogo':  'View catalog →',
    'badge-deportivo':'SPORTS',
    'game-desc':     'Interactive experience for TikTok Live. Your audience picks countries, backs their favorites and drives them to the championship. Includes standings, scorers, multipliers and customization.',
    'btn-comprar':   'Buy now',

    /* Community banner */
    'banner-label':  'TikiGames Community',
    'banner-titulo': 'YOUR GAME.\nYOUR LIVE.',
    'banner-t3':     'YOUR COMMUNITY.',
    'banner-desc':   'Connect with thousands of streamers and viewers. Play in real time with your TikTok community.',
    'banner-stat1':  'Game available',
    'banner-stat2':  'Active community',
    'btn-unirse':    'Join now',

    /* Footer */
    'footer-desc':   'Interactive games for TikTok Live streamers and viewers. Connect your community, play in real time.',
    'footer-juegos': 'Games',
    'footer-empresa':'Company',
    'footer-soporte':'Support',
    'f-catalogo':    'Catalog',
    'f-mundialito':  'Mundialito Tournament',
    'f-nosotros':    'About us',
    'f-contacto':    'Contact',
    'f-ayuda':       'Help center',
    'f-reembolsos':  'Refunds',
    'footer-copy':   '© 2025 TikiGames. All rights reserved.',
  }
};

// ─── Aplicar idioma ───────────────────────────
function applyLang(lang) {
  const t = T[lang] || T.es;

  Object.keys(t).forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const val = t[id];

    // Special: h1 glitch — update both textContent and data-text
    if (id === 'hero-h1') {
      el.textContent  = val;
      el.dataset.text = val;
      return;
    }
    // Special: banner-titulo has <br> — set innerHTML
    if (id === 'banner-titulo') {
      // Keep the inner span (banner-t3) but update prefix lines
      const span = el.querySelector('#banner-t3');
      const lines = val.split('\n').map(l => l.trim()).filter(Boolean);
      el.innerHTML = lines.join('<br>') + (span ? '<br><span id="banner-t3" style="color:var(--red);">' + (T[lang]['banner-t3'] || '') + '</span>' : '');
      return;
    }

    el.textContent = val;
  });

  // Update lang button states
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim() === lang.toUpperCase());
  });

  document.documentElement.lang = lang;
  try { localStorage.setItem('tg_lang', lang); } catch(e) {}
}

// ─── Public API ───────────────────────────────
function setLang(lang) { applyLang(lang); }
window.setLang = setLang;

// ─── Init ─────────────────────────────────────
(function() {
  let saved = 'es';
  try { saved = localStorage.getItem('tg_lang') || 'es'; } catch(e) {}
  // Apply after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => applyLang(saved));
  } else {
    applyLang(saved);
  }
})();
