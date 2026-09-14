/**
 * Builds the website: one start page per language, the German legal pages.
 *
 *   node src/build.mjs
 *
 * No bundler, no framework: the content lives in src/content/<lang>.mjs
 * (German is the source; every other language must carry every key), the
 * legal texts in src/legal/*.html (exported from the app — see README), and
 * this file writes plain HTML next to the assets. The generated files are
 * committed, so the host needs no build step.
 *
 * Output:
 *   index.html                 German (default)
 *   ar/ en/ ru/ uk/index.html  the other four, Arabic right-to-left
 *   agb.html avv.html datenschutz-app.html   legal texts of the application
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = join(here, "..");
const LANGS = ["de", "ar", "en", "ru", "uk"];
const APP = "https://app.diwan-sa.de";
const VIDEO = { src: "diwan-pitch-de.mp4", poster: "poster.jpg" };

const content = {};
for (const l of LANGS) content[l] = (await import(`./content/${l}.mjs`)).default;

/** Every language must have every key of the German source — no silent gaps. */
function checkKeys(ref, other, path, lang) {
  if (Array.isArray(ref)) {
    if (!Array.isArray(other) || other.length !== ref.length) {
      throw new Error(`${lang}: ${path} must have ${ref.length} entries`);
    }
    ref.forEach((v, i) => checkKeys(v, other[i], `${path}[${i}]`, lang));
  } else if (ref && typeof ref === "object") {
    for (const k of Object.keys(ref)) {
      if (!(k in other)) throw new Error(`${lang}: missing ${path}.${k}`);
      checkKeys(ref[k], other[k], `${path}.${k}`, lang);
    }
  }
}
for (const l of LANGS) if (l !== "de") checkKeys(content.de, content[l], "", l);

/**
 * Flag shown next to each language in the switcher, as small inline SVGs
 * rather than emoji: emoji flags depend on the device's emoji font (Windows
 * shows letters instead, and many devices still draw Syria's old flag).
 * Arabic carries the flag of Syria (green, white, black, three red stars).
 */
const FLAG = {
  de: '<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#FFCE00"/><rect width="30" height="13.33" fill="#DD0000"/><rect width="30" height="6.67" fill="#000"/></svg>',
  ar: '<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#fff"/><rect width="30" height="6.67" fill="#007A3D"/><rect y="13.33" width="30" height="6.67" fill="#000"/><polygon points="10.00,7.40 10.58,9.20 12.47,9.20 10.94,10.31 11.53,12.10 10.00,10.99 8.47,12.10 9.06,10.31 7.53,9.20 9.42,9.20" fill="#CE1126"/><polygon points="15.00,7.40 15.58,9.20 17.47,9.20 15.94,10.31 16.53,12.10 15.00,10.99 13.47,12.10 14.06,10.31 12.53,9.20 14.42,9.20" fill="#CE1126"/><polygon points="20.00,7.40 20.58,9.20 22.47,9.20 20.94,10.31 21.53,12.10 20.00,10.99 18.47,12.10 19.06,10.31 17.53,9.20 19.42,9.20" fill="#CE1126"/></svg>',
  en: '<svg viewBox="0 0 60 30" aria-hidden="true"><rect width="60" height="30" fill="#012169"/><path d="M0 0L60 30M60 0L0 30" stroke="#fff" stroke-width="6"/><path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" stroke-width="2"/><path d="M30 0V30M0 15H60" stroke="#fff" stroke-width="10"/><path d="M30 0V30M0 15H60" stroke="#C8102E" stroke-width="6"/></svg>',
  ru: '<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#D52B1E"/><rect width="30" height="13.33" fill="#0039A6"/><rect width="30" height="6.67" fill="#fff"/></svg>',
  uk: '<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#FFD700"/><rect width="30" height="10" fill="#0057B7"/></svg>',
};

/**
 * The wordmark scales from its width: `h` is the height it gets when there is
 * room, and on narrow screens it shrinks with the container instead of being
 * cut off (the viewBox is 432×122, so width = height × 432/122). A parent
 * can set --wm-w to override the width (the nav does so on small screens).
 */
const WORDMARK = (h) =>
  `<svg viewBox="200 88 432 122" style="width:var(--wm-w,${Math.round((h * 432) / 122)}px);max-width:100%;height:auto;display:block;margin:0 auto" aria-hidden="true"><text x="540" y="200" text-anchor="end" font-size="135" style="font-family:Sacramento,cursive" fill="#C9A227">Diwan</text><g transform="translate(468.2,51.6)"><g transform="rotate(42 76.8 128.4)"><g transform="scale(0.3)"><path d="M256 92 C334 92 372 148 372 214 C372 300 302 362 256 428 C210 362 140 300 140 214 C140 148 178 92 256 92 Z" fill="#C9A227"/><circle cx="256" cy="240" r="23" fill="#0F1526"/><path d="M256 263 V404" stroke="#0F1526" stroke-width="13" stroke-linecap="round"/></g></g></g></svg>`;

const pathFor = (l) => (l === "de" ? "/" : `/${l}/`);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/**
 * Language switcher: a native <details> dropdown — flag + short code closed,
 * flag + full name per language open. Works without JavaScript; the small
 * script at the end of the page only closes it on an outside click or Escape.
 */
function langSwitcher(current, t) {
  return `<details class="lang">
        <summary aria-label="${esc(t.nav.language)}: ${esc(content[current].name)}"><span class="flag">${FLAG[current]}</span><span class="code">${current.toUpperCase()}</span><span class="caret" aria-hidden="true"></span></summary>
        <ul role="list" aria-label="${esc(t.nav.language)}">${LANGS.map(
          (l) =>
            `<li><a href="${pathFor(l)}" lang="${l}" hreflang="${l}"${l === current ? ' class="on" aria-current="page"' : ""}><span class="flag">${FLAG[l]}</span>${content[l].name}</a></li>`,
        ).join("")}</ul>
      </details>`;
}

function head(t, lang, canonicalPath, extra = "") {
  const alternates = LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="https://diwan-sa.de${pathFor(l)}"/>`).join("\n");
  return `<!doctype html>
<html lang="${lang}" dir="${t.dir}">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${esc(t.meta.title)}</title>
<meta name="description" content="${esc(t.meta.description)}"/>
<meta property="og:title" content="${esc(t.meta.ogTitle)}"/>
<meta property="og:description" content="${esc(t.meta.ogDescription)}"/>
<meta property="og:type" content="website"/>
<meta property="og:locale" content="${lang}"/>
<link rel="canonical" href="https://diwan-sa.de${canonicalPath}"/>
${alternates}
<link rel="alternate" hreflang="x-default" href="https://diwan-sa.de/"/>
<link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
<link rel="stylesheet" href="/site.css"/>
${extra}</head>`;
}

const cards = (items, extraClass = "") =>
  `<div class="cards${extraClass}">${items
    .map(
      (c) =>
        `<div class="card reveal">${c.business ? `<span class="badge">${esc(c.badgeLabel)}</span>` : ""}<div class="big">${c.icon}</div><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p></div>`,
    )
    .join("\n")}</div>`;

function startPage(lang) {
  const t = content[lang];
  const p = pathFor(lang);
  const nav = `
<nav>
  <div class="container nav-inner">
    <a href="${p}" aria-label="Diwan">${WORDMARK(40)}</a>
    <div class="nav-links">
      <a href="#problem">${esc(t.nav.problem)}</a>
      <a href="#funktionen">${esc(t.nav.features)}</a>
      <a href="#video">${esc(t.nav.video)}</a>
      <a href="#sicherheit">${esc(t.nav.security)}</a>
      <a href="#preis">${esc(t.nav.price)}</a>
      ${langSwitcher(lang, t)}
      <a class="btn small" href="${APP}" rel="noopener">${esc(t.nav.open)}</a>
    </div>
  </div>
</nav>`;

  const hero = `
<header class="hero">
  <div class="container">
    <div class="wordmark">${WORDMARK(150)}</div>
    <h1>${t.hero.h1}</h1>
    <p class="sub">${esc(t.hero.sub)}</p>
    <div class="cta">
      <a class="btn" href="${APP}" rel="noopener">${esc(t.hero.ctaStart)}</a>
      <a class="btn ghost" href="#video">${esc(t.hero.ctaVideo)}</a>
    </div>
    <div><span class="chip">${esc(t.hero.chip)}</span></div>
  </div>
</header>`;

  const problem = `
<section id="problem">
  <div class="container">
    <p class="kicker reveal">${esc(t.problem.kicker)}</p>
    <h2 class="reveal">${t.problem.h2}</h2>
    <p class="lead reveal">${esc(t.problem.lead)}</p>
    ${cards(t.problem.cards)}
  </div>
</section>`;

  const who = `
<section class="trust" id="zielgruppe">
  <div class="container">
    <p class="kicker reveal">${esc(t.who.kicker)}</p>
    <h2 class="reveal">${t.who.h2}</h2>
    <p class="lead reveal">${esc(t.who.lead)}</p>
    ${cards(t.who.cards)}
    <p class="langs reveal"><span>${esc(t.who.langsLabel)}</span> ${LANGS.map((l) => `<a href="${pathFor(l)}" lang="${l}" class="chip small">${content[l].name}</a>`).join(" ")}</p>
  </div>
</section>`;

  const video = `
<section id="video">
  <div class="container">
    <p class="kicker reveal">${esc(t.video.kicker)}</p>
    <h2 class="reveal">${t.video.h2}</h2>
    <p class="lead reveal">${esc(t.video.lead)}</p>
    <div class="video-wrap reveal">
      <video controls preload="metadata" poster="/${VIDEO.poster}">
        <source src="/${VIDEO.src}" type="video/mp4"/>
      </video>
    </div>
    <p class="video-note reveal">${esc(t.video.note)}</p>
  </div>
</section>`;

  const features = `
<section id="funktionen">
  <div class="container">
    <p class="kicker reveal">${esc(t.features.kicker)}</p>
    <h2 class="reveal">${t.features.h2}</h2>
    <p class="lead reveal">${esc(t.features.lead)}</p>
${t.features.items
  .map(
    (f, i) => `
    <div class="feature${i % 2 ? " flip" : ""} reveal">
      <div>
        <p class="num">${esc(f.num)}</p>
        <h3>${f.h3}</h3>
        <p>${esc(f.text)}</p>
        ${f.bullets ? `<ul>${f.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}
      </div>
      <div class="media"><video autoplay muted loop playsinline preload="metadata" src="/${f.video}"></video></div>
    </div>`,
  )
  .join("\n")}
  </div>
</section>`;

  const more = `
<section class="trust" id="cockpit">
  <div class="container">
    <p class="kicker reveal">${esc(t.more.kicker)}</p>
    <h2 class="reveal">${t.more.h2}</h2>
    ${cards(t.more.cards.map((c) => ({ ...c, badgeLabel: t.more.businessBadge })))}
  </div>
</section>`;

  const security = `
<section id="sicherheit">
  <div class="container">
    <p class="kicker reveal">${esc(t.security.kicker)}</p>
    <h2 class="reveal">${t.security.h2}</h2>
    ${cards(t.security.cards)}
    <p class="lead reveal" style="margin-top:28px">${t.security.links}</p>
  </div>
</section>`;

  const pricing = `
<section class="trust" id="preis">
  <div class="container" style="text-align:center">
    <p class="kicker reveal">${esc(t.pricing.kicker)}</p>
    <h2 class="reveal">${t.pricing.h2}</h2>
    <p class="lead reveal" style="margin:0 auto">${esc(t.pricing.lead)}</p>
    <div class="plans">
${t.pricing.plans
  .map(
    (pl) => `      <div class="plan${pl.highlight ? " highlight" : ""} reveal">
        <h3>${esc(pl.name)}</h3>
        <div class="amount">${esc(pl.price)}<small> ${esc(pl.per)}</small></div>
        <ul>${pl.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
      </div>`,
  )
  .join("\n")}
    </div>
    <p class="price-note reveal">${esc(t.pricing.note)}</p>
    <div style="margin-top:26px" class="reveal"><a class="btn" href="${APP}" rel="noopener">${esc(t.pricing.cta)}</a></div>
  </div>
</section>`;

  const company = `
<section id="unternehmen">
  <div class="container">
    <p class="kicker reveal">${esc(t.company.kicker)}</p>
    <h2 class="reveal">${t.company.h2}</h2>
    <p class="lead reveal">${esc(t.company.text)}</p>
    <p class="lead reveal" style="margin-top:16px">${esc(t.company.contact)} <a href="mailto:Info@Diwan-sa.de">Info@Diwan-sa.de</a></p>
  </div>
</section>`;

  const footer = `
<footer>
  <div class="container foot">
    <div>© <span id="y"></span> Swift Assets UG (haftungsbeschränkt) · Diwan</div>
    <div class="links">
      <a href="/impressum.html" hreflang="de">${esc(t.footer.impressum)}</a>
      <a href="/datenschutz.html" hreflang="de">${esc(t.footer.datenschutz)}</a>
      <a href="/agb.html" hreflang="de">${esc(t.footer.agb)}</a>
      <a href="/avv.html" hreflang="de">${esc(t.footer.avv)}</a>
      <a href="/ki-hinweis.html" hreflang="de">${esc(t.footer.ki)}</a>
      <a href="mailto:Info@Diwan-sa.de">${esc(t.footer.contact)}</a>
    </div>
  </div>
  <div class="container legal-note">${esc(t.footer.legalNote)}</div>
</footer>

<script>
document.getElementById("y").textContent = new Date().getFullYear();
const io = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); } }), { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
const lang = document.querySelector("details.lang");
document.addEventListener("click", e => { if (lang.open && !lang.contains(e.target)) lang.open = false; });
document.addEventListener("keydown", e => { if (e.key === "Escape") lang.open = false; });
</script>
</body>
</html>
`;

  return head(t, lang, p) + "\n<body>" + nav + hero + problem + who + video + features + more + security + pricing + company + footer;
}

/** A German legal page in the site's shell, around a fragment exported from the app. */
function legalPage({ file, title, fragment, intro }) {
  const body = readFileSync(join(here, "legal", fragment), "utf8");
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${esc(title)} — Diwan</title>
<meta name="robots" content="noindex"/>
<link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
<link rel="stylesheet" href="/site.css"/>
</head>
<body>
<div class="legal">
  <a class="backlink" href="/">← Zurück zur Startseite</a>
  <h1>${esc(title)}</h1>
  ${intro ? `<div class="note">${intro}</div>` : ""}
${body}
  <p class="legal-links"><a href="/impressum.html">Impressum</a> · <a href="/datenschutz.html">Datenschutz (Website)</a> · <a href="/datenschutz-app.html">Datenschutz (Anwendung)</a> · <a href="/agb.html">AGB</a> · <a href="/avv.html">AVV</a> · <a href="/ki-hinweis.html">KI-Hinweis</a></p>
</div>
</body>
</html>
`;
}

const APP_NOTE = (path) =>
  `Dieser Text gilt für die Anwendung Diwan (app.diwan-sa.de) und ist dort unter <a href="${APP}${path}">app.diwan-sa.de${path}</a> in der jeweils gültigen Fassung abrufbar. Diese Seite zeigt denselben Text zur Einsicht ohne Konto.`;

for (const l of LANGS) {
  const dir = l === "de" ? ROOT : join(ROOT, l);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), startPage(l));
  console.log(`${pathFor(l)}index.html`);
}
for (const p of [
  { file: "agb.html", title: "Allgemeine Geschäftsbedingungen (AGB)", fragment: "agb.html", intro: APP_NOTE("/agb") },
  { file: "avv.html", title: "Auftragsverarbeitungsvertrag (AVV)", fragment: "avv.html", intro: APP_NOTE("/avv") },
  { file: "datenschutz-app.html", title: "Datenschutzerklärung der Anwendung", fragment: "datenschutz.html", intro: APP_NOTE("/datenschutz") + ` Für diese Website gilt die <a href="/datenschutz.html">Datenschutzerklärung der Website</a>.` },
]) {
  writeFileSync(join(ROOT, p.file), legalPage(p));
  console.log(`/${p.file}`);
}
