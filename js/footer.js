// js/footer.js
(function () {
  const html = `
<footer class="site-footer" id="kontakt">
  <div class="footer-inner">
    <div class="footer-grid">
      <div class="footer-left">
        <img class="ft-logo" src="https://artex-trans.de/wp-content/uploads/2021/07/LOGO-ARTEX-TRANS-2-300x67.jpg" alt="Artex-Trans Autoagentur">
        <h3>Kontakt</h3>
        <p>Norderneystraße 7<br>28217 Bremen<br>Deutschland</p>
        <p>Tel.: <a href="tel:+494213965171">+49 (0) 421 3965171</a></p>
        <p>E-Mail: <a href="mailto:info@artex-trans.de">info@artex-trans.de</a></p>
        <p>Öffnungszeiten nach Vereinbarung.</p>
      </div>

      <div class="footer-right">
        <h3>Rückruf-Service</h3>
        <form id="atx-callback-form">
          <div class="f-row">
            <div class="f-col">
              <label for="f_name">Ihr Name</label>
              <input id="f_name" class="f-input" name="name" type="text" placeholder="Ihr Name" required>
            </div>
            <div class="f-col">
              <label for="f_phone">Ihre Telefonnummer</label>
              <input id="f_phone" class="f-input" name="phone" type="tel" placeholder="Ihre Telefonnummer" required>
            </div>
          </div>

          <div class="f-col" style="margin-top:12px">
            <label for="f_mail">Ihre E-Mail</label>
            <input id="f_mail" class="f-input" name="email" type="email" placeholder="Ihre E-Mail" required>
          </div>

          <div class="f-col" style="margin-top:12px">
            <label for="f_msg">Ihre Nachricht</label>
            <textarea id="f_msg" class="f-textarea" name="msg" placeholder="Ihre Nachricht"></textarea>
          </div>

          <div class="f-actions">
            <button type="submit" class="btn-primary">Senden</button>
            <a href="tel:+494213965171" class="btn-ghost">Kontaktiere uns</a>
          </div>
          <p class="f-note">Mit dem Absenden stimmen Sie zu, dass wir Sie zum Zweck der Kontaktaufnahme zurückrufen dürfen.</p>
          <p id="atx-form-note" style="display:none;color:#6b7280;margin-top:8px">Danke! Wir melden uns zeitnah.</p>
        </form>
      </div>
    </div>

    <div class="footer-bottom">
      <a href="/datenschutz.html">Datenschutz</a><span class="sep">·</span>
      <a href="/agb.html">AGB</a><span class="sep">·</span>
      <a href="/impressum.html">Impressum</a>
    </div>
  </div>
</footer>`;

  const style = `
.site-footer{background:#fff;border-top:1px solid #e5e7eb;margin-top:42px}
.footer-inner{width:min(100%,1180px);margin:0 auto;padding:28px 18px}
.footer-grid{display:grid;grid-template-columns:1fr 1fr;gap:28px;align-items:flex-start}
.ft-logo{height:48px;margin-bottom:14px}
.footer-left h3,.footer-right h3{color:#13206f;margin:0 0 8px 0}
.footer-left p{margin:.25rem 0;color:#61667a}
.f-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.f-col{display:flex;flex-direction:column;gap:6px}
.f-col label{font-size:.9rem;color:#0f174f;font-weight:600}
.f-input,.f-textarea{width:100%;border:1px solid #d7d9e4;border-radius:10px;padding:12px 12px;background:#fff;outline:none;transition:border-color .2s, box-shadow .2s}
.f-input:focus,.f-textarea:focus{border-color:#b7bce6;box-shadow:0 0 0 3px rgba(19,32,111,.08)}
.f-textarea{min-height:120px;resize:vertical}
.f-actions{display:flex;gap:12px;align-items:center;margin-top:10px}
.btn-primary{background:#13206f;color:#fff;border:none;border-radius:999px;padding:10px 16px;font-weight:800;cursor:pointer}
.btn-ghost{background:#fff;border:1px solid #cfd3e6;border-radius:999px;padding:10px 16px;font-weight:800;color:#0e175c;text-decoration:none}
.f-note{font-size:.88rem;color:#7a7f93;margin-top:8px;max-width:44ch}
.footer-bottom{border-top:1px solid #e5e7eb;margin-top:22px;padding-top:14px;text-align:center}
.footer-bottom a{color:#2e3361;text-decoration:none}
.footer-bottom a:hover{text-decoration:underline}
.footer-bottom .sep{display:inline-block;margin:0 10px;color:#9aa0b4}
@media(max-width:800px){.footer-grid{grid-template-columns:1fr}.f-row{grid-template-columns:1fr}}
`;

  function render() {
    if (!document.querySelector("#atx-footer-style")) {
      const s = document.createElement("style");
      s.id = "atx-footer-style";
      s.textContent = style;
      document.head.appendChild(s);
    }
    const target = document.getElementById("footer");
    if (target) {
      target.innerHTML = html;
    } else {
      document.body.insertAdjacentHTML("beforeend", html);
    }

    // simple success message (no backend wiring)
    const form = document.getElementById("atx-callback-form");
    const note = document.getElementById("atx-form-note");
    if (form && note) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        note.style.display = "block";
        form.reset();
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
