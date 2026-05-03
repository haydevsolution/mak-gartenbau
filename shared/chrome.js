// Shared nav/footer HTML fragments, injected via JS so we don't duplicate across pages.
(function () {
  const NAV = `
  <nav class="nav">
    <a href="index.html" class="brand">
      <img src="assets/mak-logo-transparent.png" alt="MAK" class="brand-logo">
    </a>
    <div class="nav-links">
      <a class="nav-link" href="index.html" data-de="Start" data-en="Home">Start</a>
      <a class="nav-link" href="leistungen.html" data-de="Leistungen" data-en="Services">Leistungen</a>
      <a class="nav-link" href="galerie.html" data-de="Galerie" data-en="Gallery">Galerie</a>
      <a class="nav-link" href="ueber-uns.html" data-de="Über uns" data-en="About">Über uns</a>
      <a class="nav-link" href="kontakt.html" data-de="Kontakt" data-en="Contact">Kontakt</a>
    </div>
    <div class="nav-right">
      <div class="lang-toggle">
        <button data-lang="de">DE</button>
        <span class="sep">/</span>
        <button data-lang="en">EN</button>
      </div>
      <button class="nav-toggle" aria-label="Menu" aria-expanded="false">
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
          <p data-de="Gärten, die wachsen, reifen und bleiben. Aus Winnenden, seit 1987."
             data-en="Gardens that grow, mature and endure. From Winnenden, since 1987.">
            Gärten, die wachsen, reifen und bleiben. Aus Winnenden, seit 1987.
          </p>
        </div>
        <div>
          <h4 data-de="Navigation" data-en="Navigation">Navigation</h4>
          <ul>
            <li><a href="index.html" data-de="Start" data-en="Home">Start</a></li>
            <li><a href="leistungen.html" data-de="Leistungen" data-en="Services">Leistungen</a></li>
            <li><a href="galerie.html" data-de="Galerie" data-en="Gallery">Galerie</a></li>
            <li><a href="ueber-uns.html" data-de="Über uns" data-en="About">Über uns</a></li>
            <li><a href="kontakt.html" data-de="Kontakt" data-en="Contact">Kontakt</a></li>
          </ul>
        </div>
        <div>
          <h4 data-de="Kontakt" data-en="Contact">Kontakt</h4>
          <ul>
            <li>Mehmet Karagözlu</li>
            <li>Winnenden · 60 km Umkreis</li>
            <li><a href="tel:+4917631486929">+49 176 314 869 29</a></li>
            <li><a href="mailto:info@mak-gartenbau.de">info@mak-gartenbau.de</a></li>
          </ul>
        </div>
        <div>
          <h4 data-de="Öffnungszeiten" data-en="Hours">Öffnungszeiten</h4>
          <ul>
            <li><span data-de="Mo – Fr" data-en="Mon – Fri">Mo – Fr</span> · 07:00 – 18:00</li>
            <li><span data-de="Samstag" data-en="Saturday">Samstag</span> · <span data-de="n. Vereinbarung" data-en="by appointment">n. Vereinbarung</span></li>
            <li><span data-de="Sonntag" data-en="Sunday">Sonntag</span> · <span data-de="geschlossen" data-en="closed">geschlossen</span></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 MAK Garten und Landschaftsbau · Mehmet Karagözlu</span>
        <span>
          <a href="#" data-de="Impressum" data-en="Imprint">Impressum</a>
          &nbsp;·&nbsp;
          <a href="#" data-de="Datenschutz" data-en="Privacy">Datenschutz</a>
        </span>
      </div>
    </div>
  </footer>`;

  window.MAK_NAV = NAV;
  window.MAK_FOOTER = FOOTER;

  // Auto-inject if markers exist
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
    // Close menu when a link is clicked
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
