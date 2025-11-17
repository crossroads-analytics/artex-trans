// assets/js/header.js
(function () {
  // Ensure Inter once
  function ensureHeadAsset(href, rel = "stylesheet") {
    if (![...document.querySelectorAll(`link[rel="${rel}"]`)].some(l => l.href.includes(href))) {
      const link = document.createElement("link");
      link.rel = rel;
      link.href = href;
      document.head.appendChild(link);
    }
  }
  ensureHeadAsset("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700");

  const html = `
<header class="atx-header">
  <div class="hdr">
    <a class="hdr-logo" href="index.html" aria-label="Startseite">
      <img src="https://artex-trans.de/wp-content/uploads/2021/07/LOGO-ARTEX-TRANS-2-300x67.jpg" alt="Artex-Trans Logo">
    </a>

    <!-- Burger for small screens -->
    <button class="hdr-burger" aria-label="Menü öffnen" aria-controls="mainNav" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>

    <nav class="hdr-nav" id="mainNav" aria-label="Hauptnavigation">
      <a class="hdr-link" href="unser_autohaus.html">Unser Autohaus</a>
      <a class="hdr-link" href="Fahrzeugbestand.html">Fahrzeugbestand</a>

      <!-- Service dropdown -->
      <div class="hdr-dd" data-dd>
        <button class="hdr-dd-toggle" aria-haspopup="true" aria-expanded="false">
          Service <span class="dd-caret">▾</span>
        </button>
        <div class="hdr-dd-menu" role="menu">
          <a class="hdr-dd-item" role="menuitem" href="service_inzahlungnahme.html">Inzahlungnahme</a>
          <a class="hdr-dd-item" role="menuitem" href="service_export.html">Export-Service</a>
          <a class="hdr-dd-item" role="menuitem" href="service_aufbereitung.html">KFZ-Aufbereitung</a>
        </div>
      </div>

      <a class="hdr-link" href="Kontakt.html">Kontakt</a>
      <a class="hdr-link" href="terminbuchung.html">Terminbuchung</a>


      <!-- CTA stays right on desktop, moves into panel on mobile -->
      <a class="hdr-cta" href="https://www.instagram.com/artextrans/" target="_blank" rel="noopener">
        Folgen: @artextrans
      </a>
    </nav>
  </div>
  <div class="hdr-backdrop" tabindex="-1" aria-hidden="true"></div>
</header>`;

  const style = `
.atx-header{
  background:#13206f;
  color:#fff;
  position:sticky;
  top:0;
  z-index:1000;
  box-shadow:0 2px 10px rgba(0,0,0,.08);
  border:none;
  font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
}
.hdr{
  display:flex;
  align-items:center;
  gap:18px;
  width:min(100%,1180px);
  margin:0 auto;
  padding:12px 18px;
}
.hdr-logo img{height:44px}

/* Desktop nav */
.hdr-nav{
  display:flex;
  align-items:center;
  gap:18px;
  flex:1;
  margin-left:6px;
  flex-wrap:wrap;
}
.hdr-link,
.hdr-dd-toggle{
  display:inline-flex;
  align-items:center;
  gap:8px;
  color:#e9ecff;
  font-weight:700;
  font-size:15px;
  line-height:1;
  padding:8px 10px;
  border-radius:10px;
  text-decoration:none;
  white-space:nowrap;
}
.hdr-link:hover,
.hdr-dd-toggle:hover{ background:rgba(255,255,255,.12); color:#fff; }
.hdr-dd-toggle{
  background:transparent;border:0;cursor:pointer;appearance:none;font:inherit;
}

.dd-caret{font-size:.8em;opacity:.9;line-height:1;}

.hdr-cta{
  margin-left:auto;
  background:#fff;
  color:#0a1770;
  font-weight:800;
  padding:10px 14px;
  border-radius:999px;
  box-shadow:0 4px 12px rgba(0,0,0,.05);
  display:inline-flex;
  align-items:center;
  gap:8px;
  text-decoration:none;
}

/* Dropdown (desktop) */
.hdr-dd{position:relative;display:inline-flex;align-items:center}
.hdr-dd-menu{
  position:absolute;
  top:100%;
  left:0;
  background:#ffffff;
  color:#0a1770;
  border:1px solid #e5e7eb;
  border-radius:12px;
  box-shadow:0 10px 30px rgba(0,0,0,.18);
  min-width:220px;
  padding:8px;
  display:none;
  z-index:1001;
}
.hdr-dd.open .hdr-dd-menu{display:block}
.hdr-dd-item{
  display:block;
  padding:10px 12px;
  border-radius:8px;
  text-decoration:none;
  color:#0a1770;
  font-weight:700;
  font-size:15px;
}
.hdr-dd-item:hover{background:#f1f3ff}

/* Burger (hidden on desktop) */
.hdr-burger{
  display:none;
  margin-left:auto;
  width:42px;height:38px;
  border-radius:10px;
  background:transparent;
  border:2px solid rgba(255,255,255,.35);
  align-items:center;justify-content:center;
  gap:4px;flex-direction:column;cursor:pointer;color:#fff;
}
.hdr-burger span{
  width:22px;height:2px;background:#fff;display:block;border-radius:2px;transition:transform .2s ease, opacity .2s ease;
}

/* Mobile layout */
@media (max-width: 920px){
  .hdr{gap:12px}
  .hdr-cta{display:none}
  .hdr-burger{display:inline-flex}

  .hdr-nav{
    position:fixed;
    top:var(--hdrH,72px);
    right:0;
    bottom:0;
    width:min(86vw,380px);
    background:#fff;
    color:#0a1770;
    border-left:1px solid #e5e7eb;
    box-shadow:-10px 0 24px rgba(0,0,0,.15);
    padding:14px;
    display:flex;
    flex-direction:column;
    gap:8px;
    transform:translateX(100%);
    transition:transform .25s ease;
    z-index:1002;
  }
  .hdr-link{
    color:#0a1770;
    font-size:16px;
    font-weight:800;
    padding:12px 10px;
    border-radius:10px;
  }
  .hdr-link:hover{background:#f1f3ff}
  .hdr-dd{flex-direction:column;align-items:stretch}
  .hdr-dd-toggle{
    justify-content:space-between;width:100%;color:#0a1770;background:#f8f9ff;border-radius:10px;
  }
  .hdr-dd-menu{
    position:static;display:none;background:#fff;border:1px solid #e5e7eb;border-radius:10px;margin-top:8px;
  }
  .hdr-dd.open .hdr-dd-menu{display:block}

  .hdr-nav .hdr-cta{
    display:inline-flex;margin-top:auto;align-self:stretch;justify-content:center;background:#0a1770;color:#fff;
  }

  .hdr-backdrop{
    position:fixed;inset:0;background:rgba(0,0,0,.35);
    opacity:0;pointer-events:none;transition:opacity .25s ease;z-index:1001;
  }
  .menu-open .hdr-nav{transform:translateX(0)}
  .menu-open .hdr-backdrop{opacity:1;pointer-events:auto}

  .menu-open .hdr-burger span:nth-child(1){transform:translateY(6px) rotate(45deg)}
  .menu-open .hdr-burger span:nth-child(2){opacity:0}
  .menu-open .hdr-burger span:nth-child(3){transform:translateY(-6px) rotate(-45deg)}
}

/* Keep hover open on pointer devices */
@media (hover:hover){
  .hdr-dd:hover .hdr-dd-menu{display:block}
}
`;

  function render() {
    if (!document.querySelector("#atx-header-style")) {
      const s = document.createElement("style");
      s.id = "atx-header-style";
      s.textContent = style;
      document.head.appendChild(s);
    }

    const target = document.getElementById("header");
    if (target) {
      target.innerHTML = html;
    } else {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = html;
      document.body.prepend(wrapper.firstElementChild);
    }

    const root = document.documentElement;
    const headerEl = document.querySelector(".atx-header");
    const burger = document.querySelector(".hdr-burger");
    const backdrop = document.querySelector(".hdr-backdrop");
    const nav = document.getElementById("mainNav");

    // For correct mobile panel top offset
    function setHdrH() {
      const h = headerEl?.offsetHeight || 72;
      root.style.setProperty("--hdrH", h + "px");
    }
    setHdrH();
    window.addEventListener("resize", setHdrH);

    // Dropdown behavior
    const dd = document.querySelector('[data-dd]');
    const toggle = dd?.querySelector('.hdr-dd-toggle');

    function closeDD(){ if(dd){ dd.classList.remove('open'); toggle?.setAttribute('aria-expanded','false'); } }
    function openDD(){ if(dd){ dd.classList.add('open'); toggle?.setAttribute('aria-expanded','true'); } }

    // On desktop, hover CSS handles it; on mobile, toggle on click
    toggle?.addEventListener('click', (e)=>{
      if (window.matchMedia("(max-width: 920px)").matches) {
        e.preventDefault(); e.stopPropagation();
        dd.classList.toggle('open');
        toggle?.setAttribute('aria-expanded', dd.classList.contains('open') ? 'true' : 'false');
      }
    });

    // Burger open/close
    function openMenu(){
      document.body.classList.add('menu-open');
      burger?.setAttribute('aria-expanded','true');
      document.documentElement.style.overflow = 'hidden';
    }
    function closeMenu(){
      document.body.classList.remove('menu-open');
      burger?.setAttribute('aria-expanded','false');
      document.documentElement.style.overflow = '';
      closeDD();
    }
    burger?.addEventListener('click', ()=>{
      document.body.classList.contains('menu-open') ? closeMenu() : openMenu();
    });
    backdrop?.addEventListener('click', closeMenu);

    // Close mobile menu when navigating (except tapping Service toggle)
    nav?.addEventListener('click', (e)=>{
      if (window.matchMedia("(max-width: 920px)").matches) {
        const a = e.target.closest('a');
        if (a && !a.closest('.hdr-dd')) closeMenu();
      }
    });

    // Global close rules
    document.addEventListener('keydown', (e)=>{ if (e.key === 'Escape') { closeMenu(); closeDD(); }});
    document.addEventListener('click', (e)=>{
      // desktop outside-click close for dropdown
      if (!window.matchMedia("(max-width: 920px)").matches) {
        if (dd && !dd.contains(e.target)) closeDD();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
