# content/

This folder contains all editor-owned content for the Product Lifecycle site. Edit files here to update what appears on the site. No web development knowledge is needed.

Changes take effect immediately when the site is served — there is no build or publish step.

## Folder structure

```
content/
├── lifecycle-model/
│   ├── stages/                            One .md file per lifecycle stage
│   └── supporting-materials/
│       └── <stage-name>/
│           ├── deliverables/              Downloadable files for the stage (e.g. templates, xlsx)
│           ├── guides/                    Guide documents for the stage
│           └── best-practices/            Best practice references for the stage
│
├── deliverable-model/
│   ├── model/                             Overview markdown for the deliverable model page
│   ├── packs/                             One .md file per deliverable pack page
│   └── supporting-materials/             Starter-pack zip files for download
│
├── financial-model/
│   ├── model/                             Overview markdown for the financial model page
│   └── processes/                         One .md file per financial process page
│
└── roles-and-responsibilities/
    ├── model/                             Overview markdown for the roles and responsibilities page
    └── roles/                             One .md file per role
```

## How to edit content

### Lifecycle stage pages

Each stage has one markdown file in `lifecycle-model/stages/`. The filename matches the stage slug used in the URL (e.g. `align-and-plan.md` → `lifecycle-stage.html?s=align-and-plan`).

The section structure for each stage page is:

1. What this stage is for
2. Principles
3. Entry criteria
4. Key activities and responsibilities
5. Tools
6. Deliverables
7. Guides
8. Best practices (optional)
9. Exit criteria
10. Training
11. Common pitfalls

Keep each section practical and lightweight. The first section is the only one that uses prose.

### Roles and responsibilities overview page

The overview content lives in `roles-and-responsibilities/model/roles-and-responsibilities.md`. Edit this file to update the intro text and the role cards on `roles-and-responsibilities.html`.

### Role pages

Each role has one markdown file in `roles-and-responsibilities/roles/`. The filename matches the role slug (e.g. `head-of-it-product.md` → `role.html?r=head-of-it-product`).

### Financial model overview page

The overview content for the financial model page lives in `financial-model/model/financial-model.md`. Edit this file to update the intro text and the list of financial process cards on `financial-model.html`.

### Financial process pages

Each process has one markdown file in `financial-model/processes/`. The filename matches the process slug (e.g. `approve-investments.md` → `financial-process.html?p=approve-investments`).

### Deliverable model overview page

The overview content for the deliverable model page lives in `deliverable-model/model/deliverable-model.md`. Edit this file to update the intro text, the list of deliverable pack cards, and the deliverable matrix on `deliverable-model.html`.

### Deliverable pack pages

Each pack has one markdown file in `deliverable-model/packs/`. These are loaded by the pack page template (`web/html/deliverable-pack.html`).

### Supporting files and downloads

Place downloadable files (templates, checklists, xlsx files) in the relevant subfolder under `lifecycle-model/supporting-materials/<stage>/deliverables/`. Link to them from the stage markdown using a relative path from the HTML page that will render the content.

Starter-pack zip files live in `deliverable-model/supporting-materials/`.

## Markdown basics

All content files use markdown — a simple text format that the site converts to formatted HTML. You do not need any tools beyond a text editor.

| What you want | What to write |
|---|---|
| Heading | `## Heading text` (use `##` for main sections, `###` for subsections) |
| Bold text | `**bold text**` |
| Bullet list | Start each line with `- ` |
| Numbered list | Start each line with `1. ` |
| Link | `[link text](https://example.com)` |
| Italic text | `*italic text*` |

A few things to keep in mind:

- Leave a blank line between paragraphs, headings and lists. Without it, markdown may not render as expected.
- Do not use heading level `#` (one hash) — that level is reserved for the page title set in the HTML.
- Stick to `##` and `###` for sections within a page.

For a full reference, see the [Markdown Guide](https://www.markdownguide.org/basic-syntax/).

## What not to edit here

Do not edit files in `web/`. That folder contains the HTML page templates, CSS and JavaScript that control how the site looks and behaves. Changes there require web development knowledge and can break the site if done incorrectly.
