# web/

This folder contains the web implementation of the Product Lifecycle site: HTML page templates, CSS stylesheets, JavaScript and font assets.

Edit files here only when changing site structure, layout or behaviour. Content (text, markdown, downloads) lives in `content/` and should be edited there instead.

## Folder structure

```
web/
├── html/                   HTML page templates
├── css/                    Stylesheets
├── js/                     JavaScript files
├── fonts/                  Arla brand font files
└── *.svg                   SVG assets (lifecycle diagram)
```

## HTML pages (`web/html/`)

Each HTML file is a page template. Most pages load their content dynamically from markdown files in `content/` via JavaScript.

| File | Purpose | Content source |
|---|---|---|
| `lifecycle-model.html` | Front page with lifecycle diagram and navigation | Inline HTML |
| `lifecycle-stage.html` | Individual stage pages | `content/lifecycle-stages/markdown/<id>.md` |
| `financial-model.html` | Financial model overview | `content/financial-model/model/financial-model.md` |
| `financial-process.html` | Individual financial process pages | `content/financial-model/processes/<id>.md` |
| `roles-and-responsibilities.html` | Roles overview page | Inline HTML |
| `role.html` | Individual role pages | `content/roles-and-responsibilities/descriptions/<id>.md` |
| `fundamentals.html` | Fundamentals page | Inline HTML |
| `deliverable-model.html` | Deliverable model overview | `content/deliverable-model/model/deliverable-model.md` |
| `pack.html` | Individual deliverable pack pages | `content/deliverable-model/packs/<id>.md` |
| `deliverable-pack.html` | Legacy redirect for `?d=` links | — |

Pages use URL parameters for routing: `?s=` for stages, `?p=` for processes and packs, `?r=` for roles.

## JavaScript (`web/js/`)

| File | Purpose |
|---|---|
| `stage.js` | Loads and renders lifecycle stage content; handles stage navigation |
| `role.js` | Loads and renders role content; handles role navigation |
| `deliverable-model.js` | Loads and renders the deliverable model overview page |
| `financial-model.js` | Loads and renders the financial model overview page |
| `financial-process.js` | Loads and renders financial process content |
| `pack.js` | Loads and renders deliverable pack content; injects download CTA |
| `deliverable.js` | Redirects legacy `?d=` links to `pack.html?p=` |
| `nav.js` | Burger menu toggle and keyboard/click-outside close behaviour |
| `marked.min.js` | Third-party markdown parser (do not edit) |

Content fetch paths in JS files are relative to the HTML page that loads the script, not the script file itself.

## CSS (`web/css/`)

| File | Purpose |
|---|---|
| `stage.css` | Main stylesheet for all content pages |
| `fonts.css` | `@font-face` declarations for the Arla font family |

The `--stage-color` CSS custom property is set per-page by JavaScript and drives the accent colour.

## Path conventions

All paths in JS and HTML files are relative. The depth relationships are:

- `web/html/*.html` → content: `../../content/`
- `web/html/*.html` → CSS: `../css/`
- `web/html/*.html` → JS: `../js/`
- `web/css/fonts.css` → fonts: `../fonts/`

If you add a new HTML page, follow the same relative path pattern.

## Root index.html

`index.html` at the repo root is a thin compatibility wrapper that redirects to `web/html/lifecycle-model.html`. It exists only to keep existing shared links working. Do not move or rename it.
