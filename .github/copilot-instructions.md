# Copilot Instructions — mircobellagamba.com

Personal website built with [Eleventy 3.x](https://www.11ty.dev/) (ESM, `"type": "module"`), deployed to Netlify.

---

## Commands

| Task                        | Command              |
| --------------------------- | -------------------- |
| Dev server (localhost:8080) | `npm start`          |
| Production build            | `npm run build`      |
| Debug build                 | `npm run debug`      |
| Check broken links          | `npm run test:links` |

Build output always goes to `_site/`.

---

## Project structure

```
eleventy.config.js   # Central Eleventy config — plugins, filters, shortcodes
_11ty/               # Custom Eleventy plugins
  drafts.js          # Draft exclusion logic (reads BUILD_DRAFTS env var)
  images.js          # Image optimisation shortcode (eleventy-img)
_data/               # Global data available to all templates
  metadata.js        # Site title, URL, author, social links
  csp.js             # Content Security Policy (currently reserved/empty)
_includes/           # Nunjucks partials and layouts
  layouts/
    base.njk         # Root HTML shell; injects CSS/JS bundles
    post.njk         # Blog post layout (extends base.njk)
content/             # All source content (Markdown + Nunjucks pages)
  blog/              # Blog posts (.md files)
    blog.11tydata.js # Directory data: auto-applies layout + "posts" tag
  about.11tydata.js  # Work experiences, education, certifications data
  projects.11tydata.js # Portfolio companies + projects data
public/              # Static assets copied verbatim to _site/
_site/               # Build output (git-ignored, Netlify deploy target)
```

---

## Content model

### Blog posts (`content/blog/*.md`)

```yaml
---
title: "Post title" # required
date: 2024-01-15 # required — YYYY-MM-DD
description: "..." # required — used in <meta> and OG tags
tags: # required — adds to named collections
  - javascript
  - react
draft: true # optional — omit for published posts
---
```

- `layout: layouts/post.njk` and the `posts` collection tag are **auto-injected** by `blog.11tydata.js`; do not add them manually.
- Valid tags map to pages under `/tags/<tag>/`. Adding a new tag automatically creates its listing page via `content/tags.njk`.

### Draft workflow

- `draft: true` in frontmatter marks a post as a draft.
- **Dev server** (`npm start`) automatically sets `BUILD_DRAFTS=true` → drafts are visible locally.
- **Production build** (`npm run build`) never sets `BUILD_DRAFTS` → drafts are excluded from `_site/` and all collections.

---

## Image shortcode

In Nunjucks templates and Markdown files (pre-processed as Nunjucks):

```njk
{% image "./relative/path/to/image.jpg", "Alt text", widths, sizes %}
```

- **Path is relative to the input file's directory**, not the workspace root.
- Generates AVIF + WebP + original format variants automatically.
- Outputs to `_site/img/` with hashed filenames.
- Default attributes: `loading="lazy"`, `decoding="async"`.

---

## Templates & includes

- All layouts live in `_includes/layouts/` and use `.njk` extension.
- `base.njk` must contain the `{% getBundle "css" %}` / `{% getBundle "js" %}` calls; all bundle CSS/JS is injected there.
- Page-specific CSS uses the `{%- css %}…{% endcss %}` block in any template; it is collected and injected via `base.njk` at build time.
- Markdown (`.md`) and HTML (`.html`) are **pre-processed as Nunjucks** — Nunjucks template syntax inside content is parsed and can cause errors if malformed.

---

## Filters (available in all templates)

| Filter                   | Description                                      |
| ------------------------ | ------------------------------------------------ |
| `readableDate`           | JS Date → human-readable string                  |
| `htmlDateString`         | JS Date → `YYYY-MM-DD`                           |
| `toDate`                 | date string → JS Date                            |
| `head(array, n)`         | first/last n items                               |
| `min(...numbers)`        | smallest number                                  |
| `getAllTags(collection)` | unique tags from a collection                    |
| `filterTagList(tags)`    | removes meta-tags: `all`, `nav`, `post`, `posts` |
| `bust(url)`              | appends `?v=<timestamp>` cache-buster            |

---

## Navigation

Pages add themselves to the nav via frontmatter:

```yaml
eleventyNavigation:
  key: About
  order: 2
```

Rendered in `base.njk` using `eleventyNavigation` filter from `@11ty/eleventy-navigation`.

---

## Pitfalls & conventions

- **Tag filtering**: `filterTagList` removes `["all", "nav", "post", "posts"]` to prevent meta-tags appearing in the tag cloud. Do not remove these exclusions.
- **Passthrough copy**: Static assets must be explicitly listed in `eleventyConfig.addPassthroughCopy()` inside `eleventy.config.js`. Files not listed are not copied to `_site/`.
- **ESM**: The project uses `"type": "module"`. All JS config/plugin files must use `import`/`export` syntax, not `require()`.
- **No test suite**: Only link-checking (`npm run test:links`) exists. No unit/integration tests are configured.
- **Computed data**: `eleventyComputed` runs late in the data cascade. Use it for dynamic values (e.g., derived permalinks, draft exclusion) rather than static data.

---

## Deployment

- **Platform**: Netlify — build command `npm run build`, publish dir `_site/`.
- Drafts are never deployed (no `BUILD_DRAFTS` in Netlify environment).
- Optional Lighthouse CI plugin is available in `netlify.toml` but commented out.
