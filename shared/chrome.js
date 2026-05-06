// Shared nav/footer HTML fragments, injected via JS so we don't duplicate across pages.
(function () {
  // Zusätzliche Styles für Nav-Telefon-Link und Footer-Adress-Stil
  const STYLES = `
    .nav-phone {
      display: inline-flex; align-items: center;
      padding: 8px 14px;
      border: 1px solid var(--line-strong);
      font-size: 12px; letter-spacing: 0.08em;
      color: var(--ink); text-decoration: none;
      transition: all .3s var(--ease);
      white-space: nowrap;
    }
    .nav-phone:hover { background: var(--accent); color: var(--bg); border-color: var(--accent); }
    .nav-phone-num { font-family: var(--sans); font-weight: 500; }
    @media (max-width: 900px) {
      .nav-phone { display: none; }
    }
  `;
  const styleTag = document.createElement('style');
  styleTag.textContent = STYLES;
  document.head.appendChild(styleTag);

  const NAV = `
  <nav class="nav">
    <a href="index.html" class="brand">
      <img src="assets/mak-logo-transparent.png" alt="MAK Garten- und Landschaftsbau" class="brand-logo">
    </a>
    <div class="nav-links">
      <a class="nav-link" href="index.html">Start</a>
      <a class="nav-link" href="leistungen.html">Leistungen</a>
      <a class="nav-link" href="galerie.html">Galerie</a>
      <a class="nav-link" href="ueber-uns.html">Über uns</a>
      <a class="nav-link" href="kontakt.html">Kontakt</a>
    </div>
    <div class="nav-right">
      <a href="tel:+4917631486929" class="nav-phone" aria-label="Anrufen">
        <span class="nav-phone-num">+49 176 314&nbsp;869&nbsp;29</span>
      </a>
      <button class="nav-toggle" aria-label="Menü" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>`;

  const FOOTER = `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="footer-logo"><img src="assets/mak-logo-transparent.png" alt="MAK"></div>
          <p>Garten- und Landschaftsbau aus Winnenden. Meisterbetrieb. Festpreis vor Baubeginn.</p>
        </div>
        <div>
          <h4>Navigation</h4>
          <ul>
            <li><a href="index.html">Start</a></li>
            <li><a href="leistungen.html">Leistungen</a></li>
            <li><a href="galerie.html">Galerie</a></li>
            <li><a href="ueber-uns.html">Über uns</a></li>
            <li><a href="kontakt.html">Kontakt</a></li>
          </ul>
        </div>
        <div>
          <h4>Kontakt</h4>
          <ul>
            <li>MAK Garten- und Landschaftsbau</li>
            <li>Mehmet Karagözlu</li>
            <li>Körnle 63</li>
            <li>71364 Winnenden</li>
            <li><a href="tel:+4917631486929">+49 176 314 869 29</a></li>
            <li><a href="mailto:info@mak-gartenbau.de">info@mak-gartenbau.de</a></li>
          </ul>
        </div>
        <div>
          <h4>Öffnungszeiten</h4>
          <ul>
            <li>Mo – Fr · 07:00 – 18:00</li>
            <li>Samstag · n. Vereinbarung</li>
            <li>Sonntag · geschlossen</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 MAK Garten- und Landschaftsbau · Mehmet Karagözlu</span>
        <span>
          <a href="impressum.html">Impressum</a>
          &nbsp;·&nbsp;
          <a href="datenschutz.html">Datenschutz</a>
        </span>
      </div>
    </div>
  </footer>`;

  window.MAK_NAV = NAV;
  window.MAK_FOOTER = FOOTER;

  function inject() {
    const navSlot = document.getElementById('nav-slot');
    if (navSlot) navSlot.outerHTML = NAV;
    const footSlot = document.getElementById('footer-slot');
    if (footSlot) footSlot.outerHTML = FOOTER;
  }
  function wireMenu() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    const btn = nav.querySelector('.nav-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('menu-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.querySelectorAll('.nav-links .nav-link').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('menu-open');
        btn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { inject(); wireMenu(); });
  } else {
    inject();
    wireMenu();
  }
})();
