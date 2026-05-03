// Shared JS for MAK Garten und Landschaftsbau
(function () {
  // Nav-dependent init runs AFTER chrome.js injects the nav (on DOMContentLoaded).
  function initNav() {
    const nav = document.querySelector('.nav');
    if (nav) {
      const onScroll = () => {
        if (window.scrollY > 30) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
    // Mark active link
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach((a) => {
      const href = a.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
    });
    // Apply saved lang now that nav is in DOM
    applyLang(localStorage.getItem('mak-lang') || 'de');
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // Language toggle (display only; swaps [data-de] / [data-en])
  const LANG_KEY = 'mak-lang';
  function applyLang(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-de]').forEach((el) => {
      // Support inline <br/> in data attrs by allowing simple HTML
      const val = el.getAttribute(lang === 'en' ? 'data-en' : 'data-de');
      if (val == null) return;
      if (val.includes('<br')) el.innerHTML = val;
      else if (el.children.length === 0) el.textContent = val;
      else el.setAttribute('data-lang-text', val);
    });
    document.querySelectorAll('.lang-toggle button').forEach((b) => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
    localStorage.setItem(LANG_KEY, lang);
  }
  // Event delegation — works even if nav is injected later
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.lang-toggle button');
    if (btn) applyLang(btn.dataset.lang);
  });

  // Parallax on [data-parallax]
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length) {
    const onPar = () => {
      parallaxEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        const speed = parseFloat(el.dataset.parallax) || 0.2;
        const offset = (r.top + r.height / 2 - window.innerHeight / 2) * speed;
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
    };
    window.addEventListener('scroll', onPar, { passive: true });
    onPar();
  }

  // ============ TWEAKS ============
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "palette": "forest",
    "heroMotion": "kenburns",
    "animAmount": "medium"
  }/*EDITMODE-END*/;

  const state = Object.assign({}, TWEAK_DEFAULTS, JSON.parse(localStorage.getItem('mak-tweaks') || '{}'));

  function applyState() {
    document.body.setAttribute('data-palette', state.palette);
    document.body.setAttribute('data-anim', state.animAmount);
    const heroBg = document.querySelector('.hero-bg.ken-burns, .hero-bg.parallax-hero');
    if (heroBg) {
      heroBg.classList.remove('ken-burns', 'parallax-hero');
      if (state.heroMotion === 'kenburns') heroBg.classList.add('ken-burns');
      if (state.heroMotion === 'parallax') heroBg.classList.add('parallax-hero');
    }
    localStorage.setItem('mak-tweaks', JSON.stringify(state));
  }
  applyState();

  // Tweaks panel injection
  const tweaksHTML = `
    <div class="tweaks-panel" id="tweaksPanel">
      <h5>Tweaks</h5>
      <div class="tweak-row">
        <label>Palette</label>
        <div class="choices" data-key="palette">
          <button data-val="forest">Forest</button>
          <button data-val="sage">Sage</button>
          <button data-val="earth">Earth</button>
        </div>
      </div>
      <div class="tweak-row">
        <label>Hero Motion</label>
        <div class="choices" data-key="heroMotion">
          <button data-val="kenburns">Ken Burns</button>
          <button data-val="parallax">Parallax</button>
          <button data-val="static">Static</button>
        </div>
      </div>
      <div class="tweak-row">
        <label>Animation</label>
        <div class="choices" data-key="animAmount">
          <button data-val="subtle">Subtle</button>
          <button data-val="medium">Medium</button>
          <button data-val="bold">Bold</button>
        </div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', tweaksHTML);

  const panel = document.getElementById('tweaksPanel');
  panel.querySelectorAll('.choices').forEach((row) => {
    const key = row.dataset.key;
    row.querySelectorAll('button').forEach((b) => {
      b.classList.toggle('active', state[key] === b.dataset.val);
      b.addEventListener('click', () => {
        state[key] = b.dataset.val;
        row.querySelectorAll('button').forEach((bb) => bb.classList.toggle('active', bb === b));
        applyState();
        try {
          window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: state[key] } }, '*');
        } catch (e) {}
      });
    });
  });

  window.addEventListener('message', (ev) => {
    if (!ev.data) return;
    if (ev.data.type === '__activate_edit_mode') panel.classList.add('active');
    if (ev.data.type === '__deactivate_edit_mode') panel.classList.remove('active');
  });
  try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (e) {}
})();
