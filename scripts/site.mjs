// Génère les pages du site (français à la racine, anglais dans /en/) à partir d'UNE source.
//
//   src/pages/<page>.html     le modèle : structure, styles, scripts — commun aux deux langues
//   src/textes/<page>.js      les textes : une entrée = une clé = les langues côte à côte
//   src/textes/commun.js      les textes partagés par plusieurs pages (menu, pied de page…)
//
//   node scripts/site.mjs build     régénère les pages, sitemap.xml
//   node scripts/site.mjs check     vérifie tout (aucune langue oubliée, pages à jour…)
//   node scripts/site.mjs verrou    valide les changements de texte faits dans les deux langues
//
// Les pages générées (racine et en/) sont committées car GitHub Pages les sert telles quelles :
// on ne les édite JAMAIS à la main, on édite src/ puis on lance build.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { pathToFileURL, fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');
const LANGS = ['fr', 'en'];            // l'ordre = l'index dans chaque entrée
const SITE = 'https://stateri.fr';
const VERROU = path.join(SRC, 'verrou.json');
const LETTERS = /[A-Za-zÀ-ÿ]{2,}/;

const read = f => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');

// ───────── chargement ─────────
async function loadTextes() {
  const dir = path.join(SRC, 'textes');
  const all = {}, origin = {};
  for (const f of fs.readdirSync(dir).filter(n => n.endsWith('.js')).sort()) {
    const mod = await import(pathToFileURL(path.join(dir, f)).href + '?t=' + Date.now());
    for (const [k, v] of Object.entries(mod.default)) {
      if (all[k]) throw new Error(`clé en double : ${k} (${origin[k]} et ${f})`);
      all[k] = v; origin[k] = f;
    }
  }
  return { all, origin };
}
const pageNames = () => fs.readdirSync(path.join(SRC, 'pages')).filter(f => f.endsWith('.html')).sort();

// ───────── rendu ─────────
const jsonEsc = s => JSON.stringify(s).slice(1, -1);
const jsEsc = s => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
const keysIn = tpl => [...tpl.matchAll(/\{\{(?:(?:json|js):)?([^@}][^}]*)\}\}/g)].map(m => m[1]);

function pageUrl(name, lang) {
  const base = lang === 'fr' ? SITE : SITE + '/en';
  return name === 'index.html' ? base + '/' : `${base}/${name}`;
}

function render(name, lang, textes) {
  const li = LANGS.indexOf(lang);
  let out = read(path.join(SRC, 'pages', name));
  out = out.replace(/\{\{(json:|js:)?([^@}][^}]*)\}\}/g, (m, mod, key) => {
    const e = textes[key];
    if (!e) throw new Error(`${name} : clé inconnue « ${key} »`);
    const v = e[li];
    if (v === undefined || v === '') throw new Error(`${name} : « ${key} » n'a pas de texte ${lang}`);
    return mod === 'json:' ? jsonEsc(v) : mod === 'js:' ? jsEsc(v) : v;
  });
  out = out.replace(/\{\{@lang\}\}/g, lang).replace(/\{\{@locale\}\}/g, lang === 'fr' ? 'fr-FR' : 'en-GB');

  const other = lang === 'fr' ? 'en' : 'fr';

  if (lang !== 'fr') {
    out = out.replace(/<html lang="fr"/, `<html lang="${lang}"`);
    // liens vers les pages du site : même dossier (/en/), sauf l'accueil et les URL absolues
    out = out.replace(/(href|src)="\/"/g, `$1="/${lang}/"`);
    out = out.replace(/href="\/#/g, `href="/${lang}/#`);
    out = out.replace(/(href|src)="(?!https?:|mailto:|tel:|data:|#|\/|\{)([^"]+)"/g, (m, attr, val) => {
      return /\.html(#.*)?$/.test(val) ? m : `${attr}="/${val}"`;      // images, csv… : à la racine
    });
    out = out.replace(/https:\/\/stateri\.fr\/(?!en\/)((?:[A-Za-z0-9_-]+\.html)?(?:#[^"'\s<]*)?)(?=["'\s<])/g, `${SITE}/${lang}/$1`);
  }

  // <link rel="alternate" hreflang> + sélecteur de langue
  const alt = [
    `<link rel="alternate" hreflang="fr" href="${pageUrl(name, 'fr')}" />`,
    `<link rel="alternate" hreflang="en" href="${pageUrl(name, 'en')}" />`,
    `<link rel="alternate" hreflang="x-default" href="${pageUrl(name, 'fr')}" />`,
  ].join('\n  ');
  out = out.replace(/(<link rel="canonical"[^>]*>)/, `$1\n  ${alt}`);

  const switchHref = lang === 'fr' ? (name === 'index.html' ? '/en/' : `/en/${name}`) : (name === 'index.html' ? '/' : `/${name}`);
  const switchLabel = lang === 'fr' ? 'EN' : 'FR';
  const switchTitle = lang === 'fr' ? 'English version' : 'Version française';
  const link = `<a class="lang-switch" href="${switchHref}" hreflang="${other}" lang="${other}" title="${switchTitle}">${switchLabel}</a>`;
  out = out.replace(/<\/nav>/, `  ${link}\n</nav>`);
  out = out.replace(/<\/style>/, `    .lang-switch { margin-left: 1rem; padding: 0.2rem 0.55rem; border: 1px solid currentColor; border-radius: 3px; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.06em; text-decoration: none; color: inherit; opacity: 0.75; align-self: center; }\n    .lang-switch:hover { opacity: 1; }\n  </style>`);
  return out;
}

const outPath = (name, lang) => lang === 'fr' ? path.join(ROOT, name) : path.join(ROOT, 'en', name);

// ───────── sitemap ─────────
function sitemap(lastmods) {
  const old = read(path.join(ROOT, 'sitemap.xml'));
  // métadonnées conservées depuis le sitemap actuel (priorité, fréquence) ; une entrée par page et par langue
  const meta = {};
  for (const m of old.matchAll(/<url>\s*<loc>https:\/\/stateri\.fr\/(?:en\/)?([^<]*)<\/loc>([\s\S]*?)<\/url>/g)) {
    const k = m[1] || 'index.html';
    if (meta[k]) continue;
    meta[k] = { lastmod: /<lastmod>([^<]*)/.exec(m[2])?.[1], changefreq: /<changefreq>([^<]*)/.exec(m[2])?.[1] || 'monthly', priority: /<priority>([^<]*)/.exec(m[2])?.[1] || '0.7' };
  }
  const items = [];
  for (const name of pageNames()) {
    const m = meta[name] || { changefreq: 'monthly', priority: '0.7' };
    const lastmod = lastmods[name] || m.lastmod || new Date().toISOString().slice(0, 10);
    const xl = LANGS.map(l => `    <xhtml:link rel="alternate" hreflang="${l}" href="${pageUrl(name, l)}" />`).join('\n')
      + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl(name, 'fr')}" />`;
    for (const lang of LANGS) {
      items.push(`  <url>\n    <loc>${pageUrl(name, lang)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${m.changefreq}</changefreq>\n    <priority>${m.priority}</priority>\n${xl}\n  </url>`);
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n\n${items.join('\n\n')}\n\n</urlset>\n`;
}

// ───────── garde-fous ─────────
const hash = s => crypto.createHash('sha1').update(s).digest('hex').slice(0, 10);
const sig = (all) => Object.fromEntries(Object.entries(all).map(([k, v]) => [k, v.map(hash)]));
const hrefs = s => [...s.matchAll(/href="([^"]*)"/g)].map(m => m[1]).join('|');
const tags = s => [...s.matchAll(/<\/?([a-zA-Z0-9]+)/g)].map(m => m[0].toLowerCase()).join('');
const params = s => [...s.matchAll(/\{[a-zA-Z0-9_]+\}/g)].map(m => m[0]).sort().join('');

// texte écrit en dur dans un modèle (hors balises {{…}})
function hardcoded(tpl) {
  const s = tpl.replace(/<!--[\s\S]*?-->/g, '').replace(/<(script|style|svg)\b[\s\S]*?<\/\1>/gi, '')
    .replace(/\{\{[^}]*\}\}/g, '').replace(/<[^>]+>/g, '\u0001');
  return s.split('\u0001').map(x => x.trim()).filter(x => LETTERS.test(x) && !/^&[a-z]+;$/.test(x));
}

async function check({ quiet } = {}) {
  const { all, origin } = await loadTextes();
  const errs = [];
  const used = new Set();
  const lastmods = {};
  for (const name of pageNames()) {
    const tpl = read(path.join(SRC, 'pages', name));
    for (const k of keysIn(tpl)) { used.add(k); if (!all[k]) errs.push(`${name} : clé inconnue « ${k} »`); }
    for (const h of hardcoded(tpl)) errs.push(`${name} : texte en dur dans le modèle : « ${h.slice(0, 60)} » (il va dans src/textes/)`);
  }
  for (const [k, v] of Object.entries(all)) {
    if (!used.has(k)) errs.push(`clé inutilisée « ${k} » (${origin[k]}) : à supprimer, les deux langues partent ensemble`);
    if (!Array.isArray(v) || v.length !== LANGS.length) { errs.push(`« ${k} » : il faut exactement ${LANGS.length} textes (${LANGS.join(', ')})`); continue; }
    v.forEach((t, i) => { if (typeof t !== 'string' || !t.trim()) errs.push(`« ${k} » : le texte ${LANGS[i]} est vide`); });
    if (v.every(t => typeof t === 'string' && t.trim())) {
      if (params(v[0]) !== params(v[1])) errs.push(`« ${k} » : {paramètres} différents entre ${LANGS.join(' et ')}`);
      if (tags(v[0]) !== tags(v[1])) errs.push(`« ${k} » : les balises HTML ne correspondent pas entre ${LANGS.join(' et ')}`);
      if (hrefs(v[0]) !== hrefs(v[1])) errs.push(`« ${k} » : les liens (href) ne correspondent pas entre ${LANGS.join(' et ')}`);
    }
  }
  // verrou : un texte modifié dans une seule langue
  const now = sig(all);
  const lock = fs.existsSync(VERROU) ? JSON.parse(read(VERROU)) : null;
  if (lock) {
    for (const [k, h] of Object.entries(now)) {
      const o = lock[k];
      if (!o) { errs.push(`« ${k} » : nouvelle clé, lancer « node scripts/site.mjs verrou » pour la valider`); continue; }
      const changed = h.map((x, i) => x !== o[i]);
      if (changed.some(Boolean) && !changed.every(Boolean)) {
        errs.push(`« ${k} » : ${LANGS.filter((_, i) => changed[i]).join(', ')} modifié seul — relire l'autre langue, puis « verrou »`);
      } else if (changed.every(Boolean)) errs.push(`« ${k} » : modifié dans les deux langues, lancer « node scripts/site.mjs verrou » pour valider`);
    }
    for (const k of Object.keys(lock)) if (!now[k]) errs.push(`« ${k} » : supprimée, lancer « node scripts/site.mjs verrou » pour valider`);
  } else errs.push('src/verrou.json absent : lancer « node scripts/site.mjs verrou »');

  // pages générées à jour
  if (!errs.length) {
    for (const name of pageNames()) for (const lang of LANGS) {
      const p = outPath(name, lang);
      let html; try { html = render(name, lang, all); } catch (e) { errs.push(e.message); continue; }
      if (!fs.existsSync(p) || read(p) !== html) errs.push(`${path.relative(ROOT, p)} n'est pas à jour : lancer « node scripts/site.mjs build » (ne jamais éditer une page générée à la main)`);
    }
  }
  if (!quiet) console.log(errs.length ? errs.map(e => '✗ ' + e).join('\n') + `\n\n${errs.length} problème(s)` : `✓ ${pageNames().length} pages × ${LANGS.length} langues, ${Object.keys(all).length} textes : tout est cohérent`);
  return errs;
}

async function build() {
  const { all } = await loadTextes();
  const lastmods = {};
  for (const name of pageNames()) for (const lang of LANGS) {
    const html = render(name, lang, all);
    fs.mkdirSync(path.dirname(outPath(name, lang)), { recursive: true });
    fs.writeFileSync(outPath(name, lang), html);
  }
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap(lastmods));
  console.log(`✓ ${pageNames().length * LANGS.length} pages générées + sitemap.xml`);
}

async function verrou() {
  const { all } = await loadTextes();
  const now = sig(all);
  const lock = fs.existsSync(VERROU) ? JSON.parse(read(VERROU)) : {};
  const accepte = process.argv.filter(a => a.startsWith('--accepte=')).map(a => a.slice(10));
  const refus = [];
  for (const [k, h] of Object.entries(now)) {
    const o = lock[k];
    if (!o) continue;
    const changed = h.map((x, i) => x !== o[i]);
    if (changed.some(Boolean) && !changed.every(Boolean) && !accepte.includes(k)) refus.push(k);
  }
  if (refus.length) { console.log('✗ modifiés dans une seule langue (relire l\'autre, ou --accepte=clé pour une coquille) :\n  ' + refus.join('\n  ')); process.exit(1); }
  fs.writeFileSync(VERROU, JSON.stringify(now, null, 1) + '\n');
  console.log(`✓ verrou à jour (${Object.keys(now).length} textes)`);
}

const cmd = process.argv[2];
if (cmd === 'build') await build();
else if (cmd === 'check') { const e = await check(); process.exit(e.length ? 1 : 0); }
else if (cmd === 'verrou') await verrou();
else { console.log('usage : node scripts/site.mjs build | check | verrou'); process.exit(2); }
