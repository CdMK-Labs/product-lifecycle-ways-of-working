# Product Lifecycle — Ways of Working

Internal reference site for IT and Digital colleagues. Covers the full product lifecycle model: what each stage is for, how to enter and exit it, key activities, roles, tools and deliverables.

## Repo structure

```
/
├── index.html          Compatibility wrapper — redirects to web/html/lifecycle-model.html
│                       Keep this file. Existing shared links point here.
│
├── content/            Editor-owned content files (markdown, downloads, assets)
│                       Edit here to update what appears on the site.
│
├── web/                Web implementation (HTML, CSS, JavaScript, fonts)
│                       Edit here only when changing site structure or behaviour.
│
└── README.md           This file
```

## Who edits what

| Role | Folder | What to edit |
|---|---|---|
| Content editor | `content/` | Stage pages, role descriptions, financial processes, deliverable pack content, supporting files |
| Web developer | `web/` | Page templates, stylesheets, JavaScript, fonts, SVG diagram |

See `content/README.md` and `web/README.md` for detailed guidance.

## Running the site locally

The site is a static site with no build step. Serve it from the repo root:

```bash
python3 -m http.server
```

Then open `http://localhost:8000`. The root `index.html` will redirect to the real front page.
