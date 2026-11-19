# CLAUDE.md — Statera Web Pages

Guidance for AI assistants working on this repository.

## Project Overview

**Stateri** is a personal finance PWA (Progressive Web App) that stores all data on the user's own Google Drive — no backend servers. This repository contains the **marketing and documentation website** (`stateri.fr`), a static site built with pure HTML and CSS (no frameworks, no build system).

- **Live site**: https://stateri.fr
- **Hosting**: GitHub Pages (automatic, via `CNAME` file)
- **Languages**: French (root) and English (`/en/`), generated from ONE source (see the next section)
- **No dependencies**: no package.json, no npm. A small Node script (`scripts/site.mjs`, Node only, zero packages) generates the pages; the generated HTML is committed and served as-is

---

## ⚠️ Les langues sont LIÉES : une source, deux langues (depuis le 19/11/2026)

**Les pages à la racine (français) et dans `en/` (anglais) sont GÉNÉRÉES. On ne les édite JAMAIS à la main.**

- `src/pages/<page>.html` : le modèle (structure, styles, scripts), commun aux deux langues. Aucun texte visible en dur : seulement des marqueurs `{{clé}}`.
- `src/textes/<page>.js` (et `commun.js` pour ce que plusieurs pages partagent) : **une entrée = une clé = les langues côte à côte** : `"clé": ["français", "English"]`. Le français est la référence (index 0).
- Marqueurs : `{{clé}}` (HTML ou attribut), `{{json:clé}}` (dans le JSON-LD), `{{js:clé}}` (dans une chaîne JavaScript '…'), `{{@lang}}`, `{{@locale}}`.
- `node scripts/site.mjs build` régénère toutes les pages (racine + `en/`) et `sitemap.xml` ; `node scripts/site.mjs check` vérifie tout (un hook git `.githooks/pre-commit` le lance avant chaque commit ; après un clone : `git config core.hooksPath .githooks`).

Pour modifier un texte : **un seul fichier, les deux langues sous les yeux**, puis `build`, puis `node scripts/site.mjs verrou` pour valider. Pour changer la mise en page : le modèle, une fois, et les deux langues suivent. Un nouveau texte naît dans les DEUX langues ou le travail n'est pas fini.

Ce que `check` refuse : une langue vide ou oubliée ; un texte modifié dans une seule langue (`src/verrou.json`) ; des balises HTML, des liens (`href`) ou des {paramètres} qui diffèrent d'une langue à l'autre ; un texte écrit en dur dans un modèle ; une clé inutilisée ; une page générée pas à jour.

Ajouter une page : créer `src/pages/x.html` (à partir d'un modèle récent) et `src/textes/x.js`, puis `build`. L'anglais vit dans `/en/` ; chaque page déclare `hreflang` fr/en/x-default et porte un sélecteur de langue dans sa navigation (ajoutés par le script). Les images restent à la racine (les pages anglaises y pointent en absolu). Les captures d'écran montrent encore l'application en français.

---

## Repository Structure

```
Statera-web-pages/
├── index.html           # Landing page — app overview, feature cards
├── installer.html       # PWA installation guide (Android & iOS)
├── statistiques.html    # Statistics & budgeting features
├── transactions.html    # Import/export (CSV, Crédit Mutuel, Revolut)
├── patrimoine.html      # Net worth tracking & investment portfolio
├── devises.html         # Multi-currency features (CHF/EUR)
├── partage.html         # Shared accounts & expense splitting
├── sitemap.xml          # SEO sitemap
├── CNAME                # GitHub Pages domain: stateri.fr
├── template-import.csv  # Sample CSV import format
├── googleb2d3303c660be0c6.html  # Google Search Console verification
└── *.png                # Screenshot assets (40+ images)
```

The files at the root (and in `en/`) are **generated** from `src/pages/` + `src/textes/` (see the section above). Every generated page is still a self-contained HTML file with embedded `<style>` tags, and the structure below describes what is served.

### Page Purposes

| File | Purpose |
|---|---|
| `index.html` | Main landing page with hero, feature grid, and links to sub-pages |
| `installer.html` | Step-by-step PWA install guide for Android and iOS |
| `statistiques.html` | Charts, category breakdowns, budget history, 30-day view |
| `transactions.html` | Bank import (Crédit Mutuel, Revolut), custom CSV import, export |
| `patrimoine.html` | Total net worth view, asset breakdown, XIRR investment performance |
| `devises.html` | CHF/EUR conversion, exchange rate history, multi-currency accounts |
| `partage.html` | Shared expense tracking, per-person contribution ratios |

---

## Design System

All styles live inside `<style>` blocks in each HTML file. There is no shared CSS file — each page redefines the same base tokens.

### CSS Custom Properties (Design Tokens)

```css
:root {
  /* Text */
  --ink:   #0f1117;    /* Primary text, dark backgrounds */
  --ink-2: #4a4e5a;    /* Secondary / body text */
  --ink-3: #9499a5;    /* Tertiary / disabled / captions */

  /* Backgrounds */
  --surface:   #f7f6f2;  /* Main page background (warm cream) */
  --surface-2: #eeecea;  /* Alternate section background */
  --surface-3: #e3e1dc;  /* Deeper alternate / separators */

  /* Accent (green — primary brand color) */
  --accent:       #1a6b4a;
  --accent-light: #e1f5ee;
  --accent-mid:   #5dcaa5;

  /* Gold (secondary accent) */
  --gold:       #bf8a2e;
  --gold-light: #faeeda;

  /* Utilities */
  --border: rgba(15,17,23,0.10);
  --r: 12px;  /* Standard border-radius */

  /* Typography */
  --font-display: 'DM Serif Display', Georgia, serif;
  --font-body:    'DM Sans', system-ui, sans-serif;
}
```

`transactions.html` adds extra brand tokens:
```css
--cm-blue: #003f8a; --cm-light: #e8f0fb;          /* Crédit Mutuel */
--revolut-purple: #5c11d4; --revolut-light: #ede8fd; /* Revolut */
```

### Typography

- **Display / headings**: `DM Serif Display` (Google Fonts) — used via `font-family: var(--font-display)`
- **Body / UI text**: `DM Sans` (Google Fonts) — used via `font-family: var(--font-body)`
- Both fonts are loaded from Google Fonts CDN with `preconnect` hints in every `<head>`
- Heading sizes use `clamp()` for fluid scaling, e.g. `clamp(1.8rem, 3vw, 2.6rem)`

---

## HTML Patterns & Component Classes

Every page uses a consistent set of semantic class names. Always reuse these rather than inventing new ones.

### Navigation

```html
<nav>
  <a class="nav-logo" href="/">Stateri <span>·</span></a>
  <!-- Landing page uses .nav-links + .nav-cta -->
  <!-- Sub-pages use .nav-back link instead -->
</nav>
```

- `nav-logo` — brand link
- `nav-links` + `nav-links a` — horizontal link list (index.html only)
- `nav-cta` — pill CTA button in nav
- `nav-back` — "← Back" link used on sub-pages

### Section Structure

```html
<section>
  <div class="section-inner">
    <p class="section-tag">LABEL</p>
    <h2 class="section-title">Title text</h2>
    <p class="section-subtitle"><!-- or .section-desc -->Description.</p>
    <!-- content -->
  </div>
</section>
```

- `.section-inner` — max-width 1100px, auto margins
- `.section-tag` — uppercase label in accent green
- `.section-title` — display font heading
- `.section-subtitle` / `.section-desc` — body text below title

Sub-pages use `.content-section` instead of bare `<section>`, and add `.alt` for cream background alternation:
```html
<section class="content-section alt">
```

### Feature Cards

```html
<div class="features-grid">  <!-- 3-column grid -->
  <div class="feature-card">
    <div class="feature-icon fi-green">🏦</div>
    <h3>Title</h3>
    <p>Description text</p>
    <a href="page.html">En savoir plus →</a>
  </div>
</div>
```

- `.fi-green` — green icon background
- `.fi-gold` — gold icon background
- `.fi-slate` — neutral icon background

### Two-Column Layouts

```html
<div class="two-col">
  <div class="text-col">...</div>
  <div class="img-col"><div class="app-img"><img src="..." /></div></div>
</div>
```

Modifiers: `.two-col.reverse` (swap order), `.two-col.wide-img` (wider image column)

On `index.html`, the equivalent is `.screenshot-section` / `.screenshot-section.reverse` / `.screenshot-section.featured`.

### Images

```html
<!-- Standard screenshot -->
<div class="screenshot-img"><img src="name.png" alt="Description" /></div>

<!-- Featured/hero screenshot -->
<div class="screenshot-img featured"><img src="name.png" alt="Description" /></div>

<!-- App screenshot (sub-pages) -->
<div class="app-img"><img src="name.png" alt="Description" /></div>
```

All images live flat in the repository root (no subdirectory).

### Info Boxes

```html
<div class="info-box green">
  <strong>Title</strong>
  <p>Content text.</p>
</div>
```

Color variants: `.green`, `.gold`, `.blue`, `.purple`

### Buttons

```html
<a href="..." class="btn-primary">Primary action</a>
<a href="..." class="btn-secondary">Secondary action</a>
```

### Feature List (bullet alternative)

```html
<ul class="feature-list">
  <li>Item text</li>
</ul>
```

Uses a CSS `::before` circle bullet in accent green.

### Jump Links (sub-pages)

```html
<div class="jump-links">
  <a class="jump-link" href="#section-id">Section Name</a>
</div>
```

### Page Hero (sub-pages)

```html
<div class="page-hero">
  <div class="hero-eyebrow">LABEL</div>
  <h1>Title <em>italic accent</em></h1>
  <p>Description paragraph.</p>
</div>
```

---

## Responsive Design

Breakpoints used consistently across all pages:

| Breakpoint | Behavior |
|---|---|
| `max-width: 900px` | Two-column layouts stack to single column; nav collapses |
| `max-width: 500px` | Further tightening: font sizes, padding reductions |

Always add matching `@media` blocks when introducing new multi-column layouts.

---

## Content Conventions

- **Language**: All user-facing text is in French
- **Brand name**: Use **Stateri** (the app). The repo/domain was previously "Statera" — keep "Stateri" in all new content
- **Italic emphasis in headings**: Key phrases in `<h1>`/`<h2>` use `<em>` which renders in `--accent` green and italic via `DM Serif Display`
- **`→` arrow**: Used in links ("En savoir plus →", "Voir les fonctionnalités →")
- **Emoji icons**: Used inside `.feature-icon` divs as decorative glyphs

---

## Image Assets

Screenshots are PNG files stored flat in the repository root. Naming conventions:

| Prefix | Page |
|---|---|
| `screenshot*.png` | General / index |
| `stats-*.png` | statistiques.html |
| `invest-*.png` | patrimoine.html (investments tab) |
| `patrimoine-*.png` | patrimoine.html |
| `devises-*.png` | devises.html |
| `partage-*.png` | partage.html |
| `install-*.png`, `ecran-android.png` | installer.html |
| `cm-*.png` | transactions.html (Crédit Mutuel) |
| `csv-format.png`, `import-export-ui.png` | transactions.html |

Always use descriptive `alt` attributes in French.

---

## CSV Import Format

The `template-import.csv` documents the custom import format:

```
date,montant,kind,linked_expense_id,categorie,banque,type_compte,note,personne
```

- `kind` values: `income`, `expense`, `reimbursement`
- `linked_expense_id`: references another row's ID for reimbursements
- `personne`: person name for shared expenses (blank = solo)

---

## Git Workflow

### Branches

- `main` — production branch, auto-deployed to GitHub Pages
- Feature branches follow the pattern `claude/<description>-<id>` for AI-generated branches

### Commit Style

Follow the existing mixed style seen in the repo:

- **Conventional commits** for meaningful changes:
  - `fix(page): description`
  - `Add page-name.html with N sections`
  - `Refonte section X : description`
- **"Add files via upload"** for bulk image additions (legacy, avoid in new commits)

Keep commit messages concise and in English or French (the repo uses both).

### Pushing

Always push to the designated feature branch:
```bash
git push -u origin <branch-name>
```

---

## Deployment

- **Automatic**: Any push to `main` triggers GitHub Pages to redeploy
- **Domain**: `stateri.fr` (configured in `CNAME` file — do not modify)
- **Generated files are committed**: run `node scripts/site.mjs build` before committing; GitHub Pages serves the files as-is
- **Sitemap**: Update `sitemap.xml` when adding new pages (use `<lastmod>` with today's date)

---

## Adding a New Page

When creating a new feature/documentation page:

1. Copy the structure from an existing sub-page (e.g. `statistiques.html`)
2. Update `<title>` and `<meta name="description">`
3. Redefine the full `:root` CSS variables block (no shared stylesheet)
4. Use `nav-back` instead of `nav-links` in the nav
5. Start with `.page-hero`, then use `.content-section` / `.content-section.alt` alternating sections
6. Add a `<jump-links>` block if there are multiple sections
7. `sitemap.xml` is generated by `build` (both languages)
8. Link from `index.html` feature cards if appropriate

---

## Key Constraints

- **No npm, no bundlers, no preprocessors** — the only tooling is `scripts/site.mjs` (plain Node, no packages)
- **No external CSS frameworks** — no Tailwind, Bootstrap, etc.
- **No JavaScript** (currently) — the site is purely HTML+CSS; avoid adding JS unless asked
- **No shared CSS file** — each page is self-contained; duplicate base styles are intentional
- **All images in root** — do not create subdirectories for assets
- **Texts in both languages** — every visible text lives in `src/textes/` in French AND English, never hard-coded in a page

---

## Identité visuelle (depuis le 18/11/2026)

Le site reprend l'identité de l'application (« Financial Garden » : `docs/identite-visuelle/` du dépôt `budget-pwa`) : **papier crème, vert forêt, cuivre**, titres en **Cormorant Garamond**, texte en **Source Sans 3**, motif de **brin de feuilles** devant les étiquettes de section, cartes numérotées (01, 02…) à la place des pictogrammes. Chaque page porte un bloc `<style id="identite">` en dernier dans le `<head>` : il redéfinit les jetons de couleur et de police.

Règles :
- **Aucun emoji** dans le site : ils donnent un air de site généré. Les flèches typographiques (← →, ✓) restent permises. Les icônes de cartes sont remplacées par des numéros (compteurs CSS), les étiquettes par le brin de feuilles.
- Ne pas réintroduire DM Sans, DM Serif Display, Sora ni Inter.
- Une nouvelle page part d'une page existante récente (par exemple `guide.html`) pour hériter du bloc d'identité ; le logo de l'en-tête est `logo-header-64.png`.
- Pas de dégradés, pas d'ombres lourdes, coins peu arrondis (4 px).
