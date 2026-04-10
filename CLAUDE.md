# CLAUDE.md — Statera Web Pages

Guidance for AI assistants working on this repository.

## Project Overview

**Stateri** is a personal finance PWA (Progressive Web App) that stores all data on the user's own Google Drive — no backend servers. This repository contains the **marketing and documentation website** (`stateri.fr`), a static site built with pure HTML and CSS (no frameworks, no build system).

- **Live site**: https://stateri.fr
- **Hosting**: GitHub Pages (automatic, via `CNAME` file)
- **Language**: French (`lang="fr"` on all pages)
- **No dependencies**: No Node.js, no package.json, no build step

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

There is no `src/` directory — every page is a self-contained HTML file with embedded `<style>` tags.

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
- **No build step**: Files are served as-is; what you commit is what ships
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
7. Add the new page to `sitemap.xml`
8. Link from `index.html` feature cards if appropriate

---

## Key Constraints

- **No build tools** — do not introduce npm, bundlers, or preprocessors
- **No external CSS frameworks** — no Tailwind, Bootstrap, etc.
- **No JavaScript** (currently) — the site is purely HTML+CSS; avoid adding JS unless asked
- **No shared CSS file** — each page is self-contained; duplicate base styles are intentional
- **All images in root** — do not create subdirectories for assets
- **French content only** — all visible text must be in French
