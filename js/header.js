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
  <!-- Top Info Bar -->
  <div class="hdr-top">
    <div class="hdr-top-inner">
      <div class="hdr-top-left">
        <span class="hdr-top-item">
          <img class="hdr-icon" src="assets/images/emojis/pin.png" alt="Standort">
          Norderneystraße 7, 28217 Bremen
        </span>
      </div>
      <div class="hdr-top-right">
        <a class="hdr-top-item" href="mailto:info@artex-trans.de">
          <img class="hdr-icon" src="assets/images/emojis/email.png" alt="E-Mail">
          info@artex-trans.de
        </a>
        <a class="hdr-top-item" href="tel:+494213965171">
          <img class="hdr-icon" src="assets/images/emojis/telefon.png" alt="Telefon">
          +49 421 3965171
        </a>
      </div>
    </div>
  </div>

  <!-- Main Navigation Bar -->
  <div class="hdr-main">
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

        <!-- CTA -->
        <a class="hdr-cta" href="https://www.instagram.com/artextrans/" target="_blank" rel="noopener">
          Folgen: @artextrans
        </a>
      </nav>
    </div>
  </div>

  <!-- Page title band (dynamic) -->
  <div class="hdr-title" id="hdrPageTitle" aria-live="polite"></div>

  <div class="hdr-backdrop" tabindex="-1" aria-hidden="true"></div>
</header>`;

  const style = `
.atx-header{
  position:sticky;
  top:0;
  z-index:1000;
  font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
  background:transparent;
  overflow:hidden;
  transition:box-shadow .25s ease, transform .25s ease;
}

/* EIN Blauton + BMW-Hintergrund (leicht nach links verschoben) */
.atx-header::before{
  content:"";
  position:absolute;
  inset:0;
  background:url("assets/images/Unser_Autohaus/bmw.jpeg") 65% 65%/cover no-repeat;
  z-index:-2;
}
.atx-header::after{
  content:"";
  position:absolute;
  inset:0;
  background:rgba(19,32,111,.40); /* Overlay in Brand-Blau */
  z-index:-1;
}

/* Startseite: Header oben komplett transparent & ohne BMW (liegt auf dem Hero) */
.page-home .atx-header::before{
  background:none;
}
.page-home .atx-header::after{
  background:transparent;
}

/* ---------------- TOP INFO BAR ---------------- */
.hdr-top{
  background:transparent;
  color:#ffffff;
}

.hdr-top-inner{
  width:100%;
  max-width:1180px;
  margin:0 auto;

  display:flex;
  justify-content:center;     /* Zentriert alles insgesamt */
  align-items:center;
  gap:32px;

  padding:6px 18px;
}

/* linke & rechte Gruppe: immer eine Zeile */
.hdr-top-left,
.hdr-top-right{
  display:flex;
  flex-wrap:nowrap;           /* verhindert Umbruch innerhalb der Gruppe */
  align-items:center;
  gap:18px;
}

.hdr-top-item{
  display:flex;
  align-items:center;
  gap:6px;
  font-size:14px;
  font-weight:600;
  color:#ffffff;
  white-space:nowrap;         /* kein Zeilenumbruch innerhalb des Texts */
  text-decoration:none;
}

/* PNG-Icons in der Topbar */
.hdr-icon{
  width:15px;
  height:15px;
  object-fit:contain;
  display:block;
}

/* ---------------- MAIN BAR ---------------- */
.hdr-main{
  background:transparent;
  color:#f9fafb;
}
.hdr{
  display:flex;
  align-items:center;
  gap:28px;
  width:min(100%,1180px);
  margin:0 auto;
  padding:16px 20px;              /* höherer Header */
  transition:padding .25s ease;
}
.hdr-logo img{
  height:48px;
  transition:height .25s ease, transform .25s ease;
}

/* Desktop nav */
.hdr-nav{
  display:flex;
  align-items:center;
  gap:18px;
  flex:1;
  margin-left:8px;
  flex-wrap:wrap;
  justify-content:flex-end;
}

/* Links / Dropdown-Toggle – edel mit Unterstreichung */
.hdr-link,
.hdr-dd-toggle{
  position:relative;
  display:inline-flex;
  align-items:center;
  gap:6px;
  color:#e5e7ff;
  font-weight:600;
  font-size:14px;
  letter-spacing:.08em;
  text-transform:uppercase;
  padding:8px 4px;
  text-decoration:none;
  white-space:nowrap;
  background:transparent;
  border:0;
  cursor:pointer;
}

.hdr-link::after,
.hdr-dd-toggle::after{
  content:"";
  position:absolute;
  left:0;
  right:0;
  bottom:-4px;
  height:2px;
  border-radius:999px;
  background:#ffffff;
  transform:scaleX(0);
  transform-origin:center;
  transition:transform .22s ease;
  opacity:.9;
}

.hdr-link:hover,
.hdr-dd-toggle:hover{
  color:#ffffff;
}

.hdr-link:hover::after,
.hdr-dd-toggle:hover::after,
.hdr-link.is-active::after,
.hdr-dd-toggle.is-active::after{
  transform:scaleX(1);
}

/* aktiver Menüpunkt stärker */
.hdr-link.is-active,
.hdr-dd-toggle.is-active{
  color:#ffffff;
  font-weight:700;
}

.dd-caret{
  font-size:.8em;
  opacity:.9;
  line-height:1;
}

/* CTA rechts */
.hdr-cta{
  margin-left:16px;
  background:#ffffff;
  color:#13206f;
  font-weight:700;
  padding:8px 16px;
  border-radius:999px;
  box-shadow:0 8px 18px rgba(15,23,42,.55);
  display:inline-flex;
  align-items:center;
  gap:8px;
  text-decoration:none;
  font-size:13px;
  text-transform:uppercase;
  letter-spacing:.08em;
}
.hdr-cta:hover{
  background:#e5ecff;
}

/* Dropdown (desktop) */
.hdr-dd{
  position:relative;
  display:inline-flex;
  align-items:center;
}
.hdr-dd-menu{
  position:absolute;
  top:115%;
  left:0;
  background:#ffffff;
  color:#0f172a;
  border:1px solid #e5e7eb;
  border-radius:12px;
  box-shadow:0 18px 45px rgba(15,23,42,.55);
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
  color:#0f172a;
  font-weight:600;
  font-size:14px;
}
.hdr-dd-item:hover{
  background:#eef2ff;
}

/* ---------------- PAGE TITLE BAND ---------------- */
.hdr-title{
  background:transparent;
  color:#ffffff;
  text-align:center;
  overflow:hidden;
  opacity:0;
  transform:translateY(-26px);
  transform-origin:top center;
}
.hdr-title-inner{
  width:min(100%,1180px);
  margin:0 auto;
  padding:18px 20px 20px;
  font-family:"Bebas Neue", system-ui, sans-serif;
  font-size:clamp(1.6rem, 3vw, 2.3rem);
  letter-spacing:.18em;
  text-transform:uppercase;
}
.hdr-title-inner span{
  white-space:nowrap;
}

/* Startseite: Titelband komplett ausblenden + keinen Platz belegen */
.page-home .hdr-title{
  display:none !important;
}

/* Drop-in Animation */
.hdr-title.is-visible{
  animation:hdrTitleDrop .7s cubic-bezier(.22,.61,.36,1) forwards;
}
@keyframes hdrTitleDrop{
  from{
    opacity:0;
    transform:translateY(-26px);
  }
  to{
    opacity:1;
    transform:translateY(0);
  }
}

/* ---------------- SHRINK ANIMATION BEIM SCROLLEN ---------------- */
.atx-header.is-shrink::after{
  background:rgba(19,32,111,.40);
}

/* Startseite: beim Scrollen wieder blau (nicht durchsichtig) */
.page-home .atx-header.is-shrink::after{
  background:rgba(19,32,111,.990);
}

.atx-header.is-shrink .hdr{
  padding:6px 20px;               /* deutlich kompakter */
}
.atx-header.is-shrink .hdr-logo img{
  height:32px;
  transform:translateY(1px);
}
.atx-header.is-shrink .hdr-top-inner{
  padding:3px 18px;
}
.atx-header.is-shrink .hdr-top-item{
  font-size:12px;
}
.atx-header.is-shrink .hdr-title-inner{
  padding:6px 20px 8px;
  font-size:clamp(1.1rem, 2vw, 1.4rem);
  letter-spacing:.12em;
}

/* Burger (hidden on desktop) */
.hdr-burger{
  display:none;
  margin-left:auto;
  width:40px;
  height:34px;
  border-radius:999px;
  background:transparent;
  border:1px solid rgba(249,250,251,.7);
  align-items:center;
  justify-content:center;
  gap:4px;
  flex-direction:column;
  cursor:pointer;
  color:#fff;
}
.hdr-burger span{
  width:20px;
  height:2px;
  background:#fff;
  display:block;
  border-radius:999px;
  transition:transform .2s ease, opacity .2s ease;
}

/* ---------------- MOBILE ---------------- */
@media (max-width: 920px){
  .hdr-top-inner{
    flex-direction:column;
    align-items:flex-start;
    gap:4px;
    padding:4px 12px;
  }
  .hdr-top-left,
  .hdr-top-right{
    gap:12px;
  }

  .hdr{
    gap:14px;
    padding:12px 16px;
  }

  .hdr-cta{
    display:none;
  }

  .hdr-burger{
    display:inline-flex;
  }

  .hdr-nav{
    position:fixed;
    top:var(--hdrH,72px);
    right:0;
    bottom:0;
    width:min(86vw,380px);
    background:#ffffff;
    color:#0f172a;
    border-left:1px solid #e5e7eb;
    box-shadow:-10px 0 24px rgba(0,0,0,.5);
    padding:16px;
    display:flex;
    flex-direction:column;
    gap:8px;
    transform:translateX(100%);
    transition:transform .25s ease;
    z-index:1002;
    justify-content:flex-start;
  }

  .hdr-link,
  .hdr-dd-toggle{
    color:#0f172a;
    font-size:15px;
    font-weight:700;
    padding:10px 4px;
    text-transform:none;
    letter-spacing:.02em;
  }

  .hdr-link::after,
  .hdr-dd-toggle::after{
    display:none; /* Unterstreich-Animation nur auf Desktop */
  }

  .hdr-link:hover{
    color:#0f172a;
    background:#f1f5f9;
    border-radius:8px;
  }

  .hdr-dd{
    flex-direction:column;
    align-items:stretch;
  }
  .hdr-dd-toggle{
    justify-content:space-between;
    width:100%;
    background:#f8fafc;
    border-radius:8px;
  }
  .hdr-dd-menu{
    position:static;
    display:none;
    background:#fff;
    border:1px solid #e5e7eb;
    border-radius:10px;
    margin-top:8px;
    box-shadow:none;
  }
  .hdr-dd.open .hdr-dd-menu{display:block}

  .hdr-nav .hdr-cta{
    display:inline-flex;
    margin-top:auto;
    align-self:stretch;
    justify-content:center;
    background:#13206f;
    color:#f9fafb;
    border-radius:999px;
    box-shadow:none;
  }

  .hdr-title-inner{
    padding:14px 16px 16px;
    font-size:1.4rem;
    letter-spacing:.14em;
  }

  .hdr-backdrop{
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.45);
    opacity:0;
    pointer-events:none;
    transition:opacity .25s ease;
    z-index:1001;
  }
  .menu-open .hdr-nav{transform:translateX(0)}
  .menu-open .hdr-backdrop{opacity:1;pointer-events:auto}

  .menu-open .hdr-burger span:nth-child(1){transform:translateY(6px) rotate(45deg)}
  .menu-open .hdr-burger span:nth-child(2){opacity:0}
  .menu-open .hdr-burger span:nth-child(3){transform:translateY(-6px) rotate(-45deg)}
}

/* Hover-open for dropdown on pointer devices (Desktop) */
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
    const titleEl = document.getElementById("hdrPageTitle");

    // For correct mobile panel top offset (inkl. Titelband)
    function setHdrH() {
      const h = headerEl?.offsetHeight || 72;
      root.style.setProperty("--hdrH", h + "px");
    }
    setHdrH();
    window.addEventListener("resize", setHdrH);

    // Dropdown behavior
    const dd = document.querySelector('[data-dd]');
    const toggle = dd?.querySelector('.hdr-dd-toggle');

    function closeDD(){
      if(dd){
        dd.classList.remove('open');
        toggle?.setAttribute('aria-expanded','false');
      }
    }
    function openDD(){
      if(dd){
        dd.classList.add('open');
        toggle?.setAttribute('aria-expanded','true');
      }
    }

    // On desktop, hover CSS handles it; on mobile, toggle on click
    toggle?.addEventListener('click', (e)=>{
      if (window.matchMedia("(max-width: 920px)").matches) {
        e.preventDefault();
        e.stopPropagation();
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

    // ------- Aktive Menüpunkte automatisch setzen -------
    const path = window.location.pathname.toLowerCase();
    let file = path.substring(path.lastIndexOf('/') + 1);
    if (!file) file = 'index.html';

    const links = nav?.querySelectorAll('.hdr-link') || [];
    links.forEach(link => {
      const href = (link.getAttribute('href') || '').toLowerCase();
      if (href === file) {
        link.classList.add('is-active');
      }
    });

    // Service-Gruppe: wenn eine Service-Seite aktiv ist, Toggle hervorheben
    const serviceFiles = [
      'service_inzahlungnahme.html',
      'service_export.html',
      'service_aufbereitung.html'
    ];
    if (serviceFiles.includes(file) && toggle) {
      toggle.classList.add('is-active');
    }

    // ------- Seitentitel setzen + Drop-Animation -------
    if (titleEl) {
      const titleMap = {
        'index.html': 'Willkommen',
        'unser_autohaus.html': 'Unser Autohaus',
        'fahrzeugbestand.html': 'Unser Fahrzeugbestand',
        'kontakt.html': 'Kontakt',
        'terminbuchung.html': 'Terminbuchung',
        'service_inzahlungnahme.html': 'Inzahlungnahme',
        'service_export.html': 'Export-Service',
        'service_aufbereitung.html': 'KFZ-Aufbereitung'
      };

      const pageTitle = titleMap[file] || (document.title || 'Artex-Trans Autoagentur');
      titleEl.innerHTML = '<div class="hdr-title-inner"><span>– ' + pageTitle + ' –</span></div>';

      requestAnimationFrame(() => {
        titleEl.classList.add('is-visible');
      });
    }

    // ------- SHRINK ON SCROLL -------
    function onScroll(){
      if (!headerEl) return;
      const shouldShrink = window.scrollY > 40;
      headerEl.classList.toggle('is-shrink', shouldShrink);
      setHdrH();
    }
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();

    // Global close rules
    document.addEventListener('keydown', (e)=>{
      if (e.key === 'Escape') {
        closeMenu();
        closeDD();
      }
    });
    document.addEventListener('click', (e)=>{
      // desktop outside-click close for dropdown
      if (!window.matchMedia("(max-width: 920px)").matches) {
        const ddEl = document.querySelector('[data-dd]');
        if (ddEl && !ddEl.contains(e.target)) closeDD();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
