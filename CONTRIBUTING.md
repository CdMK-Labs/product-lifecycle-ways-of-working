# Contributing

This guide covers how to make changes to the Product Lifecycle site and get them published.

## Before you start

- All content lives in `content/`. You do not need to touch anything in `web/` for content changes.
- All web files live in `web/`. You do not need to touch anything in `content/` for layout or behaviour changes.
- Read `content/README.md` before editing content files. It explains the folder structure, how each file maps to a page, and markdown basics.
- Check `CLAUDE.md` for tone, style and editorial principles that apply to all content.

## Making a change

1. **Create a branch** off `main` with a short descriptive name, e.g. `update-discovery-stage` or `fix-role-card-link`
2. **Make your changes** — edit the relevant markdown or web files
3. **Test locally** before opening a pull request:
   ```bash
   python3 -m http.server
   ```
   Open `http://localhost:8000` and check the affected pages look correct.
4. **Open a pull request** against `main` with a clear title and a short description of what changed and why
5. **Request a review** — at least one other person should approve before merging
6. **Merge** once approved. The site updates automatically via GitHub Pages.

## Types of change

### Content changes
Edit markdown files in `content/`. These include stage pages, role pages, financial process pages, deliverable pack pages and model overview pages. No web development knowledge needed.

### Web changes
Edit files in `web/html/`, `web/css/` or `web/js/`. These affect page structure, layout and behaviour. Test thoroughly locally before opening a PR. Flag clearly in the PR description what you changed and how you tested it.

### New pages or sections
Discuss with the team before adding new HTML pages or major structural changes. These changes affect navigation and the overall information architecture.

## What not to do

- Do not push directly to `main`
- Do not edit files in `web/js/third-party/` — these are third-party libraries
- Do not duplicate content that already exists on another page — link to it instead
- Do not add content in HTML files — all readable content belongs in `content/`

## Questions

If you are unsure whether a change is in scope or how to structure it, open a GitHub issue or ask before starting work.
