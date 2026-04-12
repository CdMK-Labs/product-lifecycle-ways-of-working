# Default working context for this site

Apply the following principles when making any updates to this product lifecycle site, unless a specific instruction overrides them.

## Purpose of the site

- This site is a practical internal guide for IT and Digital colleagues.
- It should help teams work day to day in the product lifecycle model.
- It is not a transformation communication site and should not mention Alloy unless explicitly needed.
- It should support understanding, navigation and practical action.

## Tone and writing style

- Write in clear, practical, human language.
- Sound like an experienced internal product coach, not like a consultant or framework document.
- Avoid corporate fluff, abstract theory and self-referential methodology language.
- Keep wording calm, direct and useful.
- Remove em dashes and other common signs of AI-generated copy.
- Prefer full stops, short sentences and natural phrasing.
- Avoid repetitive patterns such as "The goal is to..." or "This page is designed to...".
- Use sentence case in headings.

## UX and information hierarchy

- Action first, explanation second.
- Put navigation, key actions and practical starting points early on the page.
- Keep pages lightweight and easy to scan.
- Avoid long text before the user reaches what they need.
- Reuse familiar visual patterns across the site for consistency.
- Do not create unnecessary extra layers in navigation.
- Prefer one clear canonical destination per topic or pack.

## Content model

- Keep the lifecycle model practical and connected to real work.
- Make stage flow clear, especially entry and exit logic.
- Support both larger initiatives and smaller product evolution.
- Keep financial and governance alignment visible where relevant.
- Make it clear what belongs in the main content versus appendices or linked source tools.
- Avoid duplication between pages, packs, templates and explanations.

## Consistency rules

- Use consistent vocabulary:
  - deliverable pack
  - starter pack
  - main pack
  - appendix
  - template
- Keep role naming consistent and site-friendly.
- Keep section naming consistent across pages.
- Keep lifecycle, financial and deliverable logic coherent across the site.

## Editorial rule of thumb

- If content explains the model without helping a team do something, simplify or remove it.
- If two sections do similar jobs, merge or reduce one of them.
- Prefer minimum viable clarity over completeness.

## Content and web separation

- All page copy lives in markdown files under `content/`. HTML files are templates only.
- Do not put readable content directly in HTML files. If a page currently has inline content, it should be migrated to markdown.
- Each overview page (financial model, deliverable model, etc.) has a corresponding markdown file in `content/<model>/model/<name>.md`.
- Lifecycle stage pages load from `content/lifecycle-model/stages/<id>.md`.
- Financial process pages load from `content/financial-model/processes/<id>.md`.
- Deliverable pack pages load from `content/deliverable-model/packs/<id>.md`.
- Role pages load from `content/roles-and-responsibilities/roles/<id>.md`.
- When editing page content, edit the markdown file. When editing layout or behaviour, edit the HTML, CSS or JS.

## Navigation

- Every page uses the same burger menu pattern: a `.nav-menu-wrap` wrapper containing the `#nav-burger` button and `#site-menu` dropdown, loaded via `nav.js`.
- The site menu links to: Lifecycle Model, Financial Model, Fundamentals, Roles & Responsibilities.
- On `lifecycle-model.html` the burger is placed inside the dark green `.site-header` banner, not in a separate nav bar. The icon uses `#82CE71` to read on the dark background.
- On all other pages the burger sits in the sticky white `.stage-nav` bar with `.nav-inner` centered at `max-width: 860px`.
- Do not add back-links or up-navigation. The burger menu is the only site-level navigation.
- `lifecycle-model.html` has its own inline CSS for nav components (it does not import `main.css`). Keep the nav CSS values in sync with `main.css` when making changes.

## Block styling

- All clickable block elements (cards, tiles, linked containers) share the same visual language: `background: #fff`, `border: 1px solid #ddeedd`, `border-left: 3px solid #0D6A4B`, `border-radius: 4px`, `padding: 1rem 1.1rem`.
- Hover state: `box-shadow: 0 2px 12px rgba(2, 70, 47, 0.1)` and `border-left-color: #82CE71`. Always include `text-decoration: none` on hover to prevent the `.stage-content a:hover` underline rule from bleeding in.
- Active state: `box-shadow: none` and `border-left-color: #0D6A4B` with `text-decoration: none`.
- Focus state: `outline: 2px solid #0D6A4B` and `outline-offset: 3px`.
- Transition: `box-shadow 0.18s ease, border-left-color 0.18s ease`.
- Non-clickable informational blocks (e.g. `.financial-stage-block`) use the same border-left accent but have no hover or focus states. Do not make them look clickable.
- The `.stage-content a` inline link rules (color, font-weight, text-decoration, focus) use `:not(.deliverable-card):not(.process-card):not(.role-card)` to avoid leaking styles into block cards. When adding new card classes, add them to this exclusion list.
- `lifecycle-model.html` defines `.stage-card` and `.home-deliverable-card` inline. Keep their hover, active and focus CSS identical to the shared card definitions in `main.css`.

## CSS and JS conventions

- `main.css` is the single shared stylesheet for all pages except `lifecycle-model.html`.
- `lifecycle-model.html` is self-contained with its own inline `<style>` block. It does not import `main.css`.
- JavaScript files use IIFEs. Use `const` and `let`. No global variables.
- Content fetch paths in JS are relative to the HTML file that loads the script, not the script file itself (e.g. `../../content/...`).
- `nav.js` handles burger menu toggle, Escape key close and click-outside close. It is loaded on every page.
- Overview pages that render markdown (financial model, deliverable model) use a dedicated JS file that fetches the markdown, renders it via `marked.js`, wraps the intro block, and converts structured list items into card grids.
