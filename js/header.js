// assets/js/header.js
(function () {
  // Ensure font loaded
  function ensureHeadAsset(href, rel = "stylesheet") {
    if (![...document.querySelectorAll(`link[rel="${rel}"]`)].some(l => l.href.includes(href))) {
      const link = document.createElement("link");
      link.rel = rel;
      link.href = href;
      document.head.appendChild(link);
    }
  }
  ensureHeadAsset("fonts.googleapis.com/css2?family=Inter:wght@400;600;700");

  const html = `
<header class="atx-header">
  <div class="hdr">
    <a class="hdr-logo" href="index.html">
      <img src="https://artex-trans.de/wp-content/uploads/2021/07/LOGO-ARTEX-TRANS-2-300x67.jpg" alt="Artex-Trans Logo">
    </a>

    <nav class="hdr-nav" aria-label="Hauptnavigation">
      <a class="hdr-link" href="unser-autohaus.html">🏠 Unser Autohaus</a>
      <a class="hdr-link" href="fahrzeugbestand.html">🚗 Fahrzeugbestand</a>

      <!-- Service dropdown -->
      <div class="hdr-dd" data-dd>
        <button class="hdr-link hdr-dd-toggle" aria-haspopup="true" aria-expanded="false">
          🛠️ Service <span class="dd-caret">▾</span>
        </button>
        <div class="hdr-dd-menu" role="menu">
          <a class="hdr-dd-item" role="menuitem" href="service-inzahlungnahme.html">Inzahlungnahme</a>
          <a class="hdr-dd-item" role="menuitem" href="service-export.html">Export-Service</a>
          <a class="hdr-dd-item" role="menuitem" href="service-aufbereitung.html">KFZ-Aufbereitung</a>
        </div>
      </div>

      <a class="hdr-link" href="kontakt.html">☎️ Kontakt</a>
    </nav>

    <a class="hdr-cta" href="https://www.instagram.com/artextrans/" target="_blank" rel="noopener">
      Folgen: @artextrans
    </a>
  </div>
</header>`;

  const style = `
.atx-header {
  background:#13206f;
  color:#fff;
  position:sticky;
  top:0;
  z-index:1000;
  box-shadow:0 2px 10px rgba(0,0,0,.08);
}
.hdr {
  display:flex;
  align-items:center;
  gap:18px;
  width:min(100%,1180px);
  margin:0 auto;
  padding:12px 18px;
}
.hdr-logo img {height:44px}
.hdr-nav {
  display:flex;
  align-items:center;
  gap:18px;
  flex:1;
  margin-left:6px;
  flex-wrap:wrap;
}
.hdr-link {
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
.hdr-link:hover {background:rgba(255,255,255,.12);color:#fff;}
.hdr-cta {
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
.hdr-dd {
  position:relative;
  display:inline-flex;
  align-items:center;
  padding-top:8px;
}
.hdr-dd-toggle {
  background:transparent;
  border:none;
  cursor:pointer;
  font:inherit;
  color:inherit;
  display:inline-flex;
  align-items:center;
  gap:6px;
}
.dd-caret {
  font-size:0.75em;
  opacity:0.9;
  line-height:1;
  display:inline-block;
  transform:translateY(1px);
}
.hdr-dd-menu {
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
.hdr-dd.open .hdr-dd-menu {display:block;}
.hdr-dd-item {
  display:block;
  padding:10px 12px;
  border-radius:8px;
  text-decoration:none;
  color:#0a1770;
  font-weight:700;
  font-size:15px;
}
.hdr-dd-item:hover {background:#f1f3ff;}

/* hover behaviour */
@media (hover:hover){
  .hdr-dd:hover .hdr-dd-menu{display:block;}
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

    // dropdown JS for mobile/touch
    const dd = document.querySelector('[data-dd]');
    const toggle = dd?.querySelector('.hdr-dd-toggle');
    function closeDD(){ dd?.classList.remove('open'); toggle?.setAttribute('aria-expanded','false'); }
    function openDD(){ dd?.classList.add('open'); toggle?.setAttribute('aria-expanded','true'); }

    toggle?.addEventListener('click', e=>{
      e.stopPropagation();
      dd.classList.contains('open') ? closeDD() : openDD();
    });
    dd?.addEventListener('mouseenter', openDD);
    dd?.addEventListener('mouseleave', closeDD);
    document.addEventListener('click', e=>{
      if (!dd.contains(e.target)) closeDD();
    });
    document.addEventListener('keydown', e=>{
      if (e.key === 'Escape') closeDD();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
