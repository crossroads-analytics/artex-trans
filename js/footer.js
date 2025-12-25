// js/footer.js
(function () {
  const html = `
<footer class="site-footer" id="kontakt">
  <div class="footer-inner">
    <div class="footer-grid">
      <div class="footer-left">
  <img class="ft-logo" src="https://artex-trans.de/wp-content/uploads/2021/07/LOGO-ARTEX-TRANS-2-300x67.jpg" alt="Artex-Trans Autoagentur">
  <h3>Kontakt</h3>
  <p>
    Norderneystraße 7<br>
    28217 Bremen<br>
    Deutschland
  </p>
  <p>Tel.: <a href="tel:+494213965171">+49 (0) 421 3965171</a></p>
  <p>E-Mail: <a href="mailto:info@artex-trans.de">info@artex-trans.de</a></p>
  <p>
    <strong>Öffnungszeiten:</strong><br>
    Montag – Samstag: 10:00 – 18:00 Uhr<br>
    Sonntag: geschlossen
  </p>
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
      <a href="datenschutz.html">Datenschutz</a><span class="sep">·</span>
      <a href="agb.html">AGB</a><span class="sep">·</span>
      <a href="impressum.html">Impressum</a>
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
    // Styles einfügen
    if (!document.querySelector("#atx-footer-style")) {
      const s = document.createElement("style");
      s.id = "atx-footer-style";
      s.textContent = style;
      document.head.appendChild(s);
    }

    // HTML einfügen
    const target = document.getElementById("footer");
    if (target) {
      target.innerHTML = html;
    } else {
      document.body.insertAdjacentHTML("beforeend", html);
    }

    // --- Formular mit API verknüpfen ---
    const form = document.getElementById("atx-callback-form");
    const note = document.getElementById("atx-form-note");

    if (form) {
      const API_URL = "https://pnulxe8n0b.execute-api.eu-central-1.amazonaws.com/prod/sendMail";

      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector("button[type='submit']");
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = "Wird gesendet...";
        }
        if (note) {
          note.style.display = "none";
          note.style.color = "#6b7280";
          note.textContent = "Danke! Wir melden uns zeitnah.";
        }

        const fd = new FormData(form);
        const payload = {
          name:    fd.get("name")  || "",
          phone:   fd.get("phone") || "",
          email:   fd.get("email") || "",
          message: fd.get("msg")   || "",
          source:  "Footer Rückruf-Service"
        };

        try {
          const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });

          const text = await res.text(); // für Debugging
          if (!res.ok) {
            throw new Error("HTTP " + res.status + " – " + text);
          }

          console.log("Formular erfolgreich gesendet:", text);

          form.reset();
          if (note) {
            note.style.display = "block";
            note.style.color = "#16a34a"; // grün
            note.textContent = "Danke! Ihre Anfrage wurde versendet.";
          }
        } catch (err) {
          console.error("Fehler beim Senden des Formulars:", err);
          if (note) {
            note.style.display = "block";
            note.style.color = "#b91c1c"; // rot
            note.textContent = "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.";
          }
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Senden";
          }
        }
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();



// --- Quick Contact FAB (Phone + WhatsApp) with custom icons & rotate animation ---
(function () {
  if (!document.getElementById('atx-quickcontact-style')) {
    const css = `
      .qc-wrap {
        position: fixed;
        right: 18px;
        bottom: 18px;
        z-index: 1500;
        font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
      }

      /* List is non-clickable until opened (prevents accidental taps) */
      .qc-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin: 0 0 10px 0;
        padding: 0;
        list-style: none;
        align-items: flex-end;
        pointer-events: none;
      }
      .qc-wrap.open .qc-list { pointer-events: auto; }

      .qc-item {
        transform: translateY(10px);
        opacity: 0;
        transition: all 0.25s ease;
        position: relative;
      }
      .qc-wrap.open .qc-item { transform: translateY(0); opacity: 1; }

      .qc-btn, .qc-toggle {
        width: 56px; height: 56px;
        border-radius: 999px; border: none;
        cursor: pointer; display: grid; place-items: center;
        box-shadow: 0 10px 30px rgba(0,0,0,.2);
        text-decoration: none;
      }
      .qc-btn img, .qc-btn svg, .qc-toggle img, .qc-toggle svg {
        width: 28px; height: 28px; display: block;
      }

      /* Larger WhatsApp image */
      .qc-btn.qc-wa img { width: 52px; height: 52px; object-fit: contain; }

      .qc-phone { background: #25d366; color: #fff; }
      .qc-wa { background: #1ebe5d; color: #fff; }
      .qc-toggle { background: #13206f; color: #fff; position: relative; }

      /* Toggle animation: chat icon rotates; close icon crossfades in */
      .qc-toggle .qc-chat-icon {
        transition: transform .25s ease, opacity .2s ease;
        transform: rotate(0deg);
        opacity: 1;
      }
      .qc-toggle .qc-close-icon {
        position: absolute;
        width: 24px; height: 24px;
        opacity: 0;
        transition: opacity .2s ease, transform .25s ease;
        transform: rotate(-90deg);
      }
      .qc-toggle[aria-expanded="true"] .qc-chat-icon {
        transform: rotate(135deg);
        opacity: 0;
      }
      .qc-toggle[aria-expanded="true"] .qc-close-icon {
        opacity: 1;
        transform: rotate(0deg);
      }

      /* Hover label (desktop) */
      .qc-label {
        position: absolute;
        right: 66px;
        background: #ffffff;
        color: #13206f;
        border: 1px solid #e5e7eb;
        padding: 6px 10px;
        border-radius: 999px;
        font-weight: 700;
        font-size: 12px;
        box-shadow: 0 8px 20px rgba(0,0,0,.12);
        opacity: 0;
        transition: opacity .2s ease;
        pointer-events: none;
        white-space: nowrap;
      }
      .qc-wrap.open .qc-item:hover .qc-label { opacity: 1; }

      @media (max-width: 480px) {
        .qc-wrap { right: 14px; bottom: 14px; }
        .qc-btn, .qc-toggle { width: 52px; height: 52px; }
      }
    `;
    const s = document.createElement('style');
    s.id = 'atx-quickcontact-style';
    s.textContent = css;
    document.head.appendChild(s);
  }

  const wrap = document.createElement('div');
  wrap.className = 'qc-wrap';
  wrap.innerHTML = `
    <ul class="qc-list" aria-label="Schnellkontakt">
      <li class="qc-item">
        <a class="qc-btn qc-phone" href="tel:+491712759067"
           aria-label="Anrufen: +49 171 2759067" rel="nofollow">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6.6 10.8c1.4 2.7 3.9 5.1 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.3 1 .3 2 .5 3.1.5.7 0 1.3.6 1.3 1.3v3.5c0 .7-.6 1.3-1.3 1.3C9.9 21.5 2.5 14.1 2.5 4.3c0-.7.6-1.3 1.3-1.3H7c.7 0 1.3.6 1.3 1.3 0 1.1.2 2.1.5 3.1.1.4 0 .9-.3 1.2L6.6 10.8z" fill="#fff"/>
          </svg>
        </a>
        <span class="qc-label" role="presentation">Anrufen</span>
      </li>

      <li class="qc-item">
        <a class="qc-btn qc-wa"
           href="https://wa.me/491712759067?text=Hallo%20Artex-Trans%2C%20ich%20habe%20eine%20Frage."
           target="_blank" rel="noopener nofollow"
           aria-label="WhatsApp Nachricht senden">
          <img src="assets/images/footer/whatsapp.png" alt="" loading="lazy">
        </a>
        <span class="qc-label" role="presentation">WhatsApp</span>
      </li>
    </ul>

    <button class="qc-toggle" type="button"
            aria-label="Schnellkontakt öffnen" aria-expanded="false">
      <img class="qc-chat-icon" src="assets/images/footer/chat.png" alt="" />
      <svg class="qc-close-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
  `;
  document.body.appendChild(wrap);

  const toggle = wrap.querySelector('.qc-toggle');

  // open/close on toggle click
  toggle.addEventListener('click', () => {
    const open = wrap.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Schnellkontakt schließen' : 'Schnellkontakt öffnen');
  });

  // close when clicking outside
  document.addEventListener('click', (e) => {
    if (!wrap.contains(e.target) && wrap.classList.contains('open')) {
      wrap.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Schnellkontakt öffnen');
    }
  });

  // close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && wrap.classList.contains('open')) {
      wrap.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Schnellkontakt öffnen');
    }
  });
})();
