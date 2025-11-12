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
    <a class="hdr-logo" href="index.html">
      <img src="https://artex-trans.de/wp-content/uploads/2021/07/LOGO-ARTEX-TRANS-2-300x67.jpg" alt="Artex-Trans Logo">
    </a>

    <nav class="hdr-nav" aria-label="Hauptnavigation">
      <a class="hdr-link" href="unser-autohaus.html">Unser Autohaus</a>
      <a class="hdr-link" href="fahrzeugbestand.html">Fahrzeugbestand</a>

      <!-- Service dropdown -->
      <div class="hdr-dd" data-dd>
        <button class="hdr-link hdr-dd-toggle" aria-haspopup="true" aria-expanded="false">
          Service <span class="dd-caret">▾</span>
        </button>
        <div class="hdr-dd-menu" role="menu">
          <a class="hdr-dd-item" role="menuitem" href="service-inzahlungnahme.html">Inzahlungnahme</a>
          <a class="hdr-dd-item" role="menuitem" href="service-export.html">Export-Service</a>
          <a class="hdr-dd-item" role="menuitem" href="service-aufbereitung.html">KFZ-Aufbereitung</a>
        </div>
      </div>

      <a class="hdr-link" href="kontakt.html">Kontakt</a>
    </nav>

    <a class="hdr-cta" href="https://www.instagram.com/artextrans/" target="_blank" rel="noopener">
      Folgen: @artextrans
    </a>
  </div>
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
  font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif; /* force Inter everywhere in header */
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

.hdr-nav{
  display:flex;
  align-items:center; /* same baseline for all items */
  gap:18px;
  flex:1;
  margin-left:6px;
  flex-wrap:wrap;
}

/* unify link & button look */
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

/* remove native button styling so it truly matches anchors */
.hdr-dd-toggle{
  background:transparent;
  border:0;
  cursor:pointer;
  appearance:none;
  -webkit-appearance:none;
  -moz-appearance:none;
  font:inherit; /* keep Inter + weight */
  padding:8px 10px; /* same as .hdr-link */
}

.dd-caret{
  font-size:.8em;
  opacity:.9;
  line-height:1;
}

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

/* Dropdown */
.hdr-dd{
  position:relative;
  display:inline-flex;
  align-items:center;
}
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

/* Keep open on hover for pointer devices */
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

    // Dropdown behavior for touch/click + close rules
    const dd = document.querySelector('[data-dd]');
    const toggle = dd?.querySelector('.hdr-dd-toggle');

    function closeDD(){ if(dd){ dd.classList.remove('open'); toggle?.setAttribute('aria-expanded','false'); } }
    function openDD(){ if(dd){ dd.classList.add('open'); toggle?.setAttribute('aria-expanded','true'); } }

    toggle?.addEventListener('click', (e)=>{
      e.stopPropagation();
      dd.classList.contains('open') ? closeDD() : openDD();
    });
    document.addEventListener('click', (e)=>{
      if (dd && !dd.contains(e.target)) closeDD();
    });
    document.addEventListener('keydown', (e)=>{
      if (e.key === 'Escape') closeDD();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
