# Content

This folder contains all editor-owned content for the Product Lifecycle site.

## Structure

- `lifecycle-stages/markdown/` — One markdown file per lifecycle stage. Edit these to update stage page content.
- `lifecycle-stages/supporting-materials/<stage>/` — Supporting files for each stage, organised into deliverables, guides and best-practices subfolders.
- `deliverable-model/packs/` — Markdown source files for each deliverable pack page.
- `deliverable-model/model/` — Source content for the deliverable model overview.
- `financial-model/processes/` — Markdown source files for each financial process page.
- `financial-model/model/` — Source content for the financial model overview.
- `roles-and-responsibilities/descriptions/` — One markdown file per role description.

## How to edit

Edit files in this folder directly. The web implementation in `web/` reads from these paths and will pick up changes automatically.

Do not edit files in `web/` unless you are making changes to the site implementation (HTML, CSS, JavaScript).
