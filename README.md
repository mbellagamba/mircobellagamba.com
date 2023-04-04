# Mirco Bellagamba personal website

A personal website developed with [11ty](https://www.11ty.dev). The personal website is always a way to experiment frameworks and tools. 

## 🚀 Quick start

Install dependencies and start the website in watch mode.

```
npm install
npm start
```

## 🛠 Build

Build the website

```
npm run build
```

The output is in the `_site` directory.

[![Netlify Status](https://api.netlify.com/api/v1/badges/802669dd-d5f8-4d49-963d-6d57b257c2a2/deploy-status)](https://app.netlify.com/sites/eleventy-base-blog/deploys)

## 🐛 Debug

Run the [debug mode](https://www.11ty.dev/docs/debugging/) to see all the internals.

### Implementation Notes

- `_data/metadata.js` defines the site data.
- `eleventy.config.js` configures any Eleventy options.
- `content/blog/` has the blog posts but really they can live in any directory. They need only the `post` tag to be included in the blog posts [collection](https://www.11ty.dev/docs/collections/).
- Use the `eleventyNavigation` key (via the [Eleventy Navigation plugin](https://www.11ty.dev/docs/plugins/navigation/)) in your front matter to add a template to the top level site navigation. This is in use on `content/index.njk` and `content/about/index.md`.
- Content can be in _any template format_ (blog posts needn’t exclusively be markdown, for example). Configure your project’s supported templates in `eleventy.config.js` -> `templateFormats`.
- The `public` folder in your input directory will be copied to the output folder (via `addPassthroughCopy` in the `eleventy.config.js` file). This means `./public/css/*` will live at `./_site/css/*` after your build completes.
- Provides two content feeds:
	- `content/feed/feed.njk`
	- `content/feed/json.njk`
- This project uses three [Eleventy Layouts](https://www.11ty.dev/docs/layouts/):
	- `_includes/layouts/base.njk`: the top level HTML structure
	- `_includes/layouts/home.njk`: the home page template (wrapped into `base.njk`)
	- `_includes/layouts/post.njk`: the blog post template (wrapped into `base.njk`)
- `_includes/postslist.njk` is a Nunjucks include and is a reusable component used to display a list of all the posts. `content/index.njk` has an example of how to use it.
