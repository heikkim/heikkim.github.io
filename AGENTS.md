# StrongPoint Consulting web page project

This is a Jekyll static website project using Bootstrap, JQuery and select Google fonts. SASS/SCSS is widely used.
The site is published through Github.

Page is served through https://strongpointconsulting.fi

## Your role

A professional web developer with an eye for what good looks like both visually and in code.

## Project structure

Basic Jekyll site structure without particular quirks. As the site is running on GitHub pages, you need to be aware of the GitHub pages environment's limitations.

## Articles (blog posts)

The articles are a Jekyll **collection**, not posts. This matters, because a Jekyll post takes its date from the file name and puts it into the URL, which makes a piece of writing look old just by looking at its address.

```
_articles/<lang>/<category>/<slug>.md      e.g. _articles/fi/leadership/johtajana-...md
```

- `lang` is `fi` or `en`, `category` is the category slug (`leadership`, `ai-strategy`).
- The public URL has no date: `/articles/<category>/<slug>/` and `/en/articles/<category>/<slug>/`.
- The collection is exposed to Liquid as `site.articles`, not `site.posts`.

**Front matter keys:**
- `date` - the publish date, ISO 8601 with an offset, e.g. `2026-11-12T09:00:00+02:00`. YAML turns this into a real timestamp, so `| date:` and `| date_to_xmlschema` work on it. This is the date that is shown and sorted on. Jekyll holds an article back when the date is in the future, so an article goes live on the day it is dated.
- `last_modified_at` - same format. Fill it in, otherwise the sitemap falls back to the build time and the lastmod date changes on every build.
- `lang_vers` - the **full URL** of the article in the other language, e.g. `/en/articles/leadership/as-a-leader-.../`. The language chooser and the "read in other language" link read this key.
- `published` - Jekyll builds only the articles with `published: true`. An article with `published: false` is a draft and does not exist on the site at all.
- `visible` - `true` shows the article in the listing and in the carousel.
- `sitemap` - `true` lists the article in `sitemap.xml`.
- `highlighted` - `true` puts the article on the homepage carousel.

**Drafts** are ordinary articles with `published: false` and they live in `_articles/` next to the finished ones, so that everything is in one place.

- Jekyll does not build an article with `published: false`, so a draft is nowhere on the site: not in the listing, not in the carousel, not in the sitemap, and its own address gives a 404.
- A draft that is built is marked with a yellow **DRAFT!** badge in the listing, in the carousel and on the article page.
- To see the drafts locally, run `jekyll serve --unpublished`. Note that `--drafts` only renders the `_drafts` folder, which this site does not use.
- A draft that is dated in the future also needs `--future`, because Jekyll holds future dated articles back. `jekyll serve --unpublished --future` shows everything.
- `visible` and `highlighted` decide where a draft shows up in the listing and in the carousel once it is built.

**Writing a new article:**
1. Add the file under `_articles/<lang>/<category>/<slug>.md`, no date in the file name.
2. Fill in `date`, `last_modified_at`, `lang_vers` and the flags.
3. If it is a new category, add the folder, an entry in the `defaults` in `_config.yml`, the visible name in `_data/sitetext.yml` and a page of its own.

**Category pages:** every category has a page of its own at `/articles/<category>/` and `/en/articles/<category>/`, where the articles of that one category can be skimmed through. The page is the Insights listing, filtered to one category.

- The page file is `articles/<category>/index.md` and `en/articles/<category>/index.md`. The file is thin: the headline, the description and the listing all come from the include.
- The categories live in `categories` in the sitetext, one entry per category with a `slug`, a `label` and a `desc`. The label is the name of the category and the desc is the text under the headline on the page. Every language needs its own entry.
- The listing is the same one as on the Insights page, `_includes/posts-list.html`, with the `category` parameter. The name of the category on the article page links to the page of the category.
- The Insights page itself, `/articles/`, is the same include without a category and without a tag, and it lists every article of the language.
- `./check-posts.sh` reports a category that has no page of its own or no description in every language.

**Tag pages:** the same machinery serves the tags. A tag page gives the `tag` parameter instead of the `category` one, and the tags live in `tags` in the sitetext in the same shape as the categories: a `slug`, a `label` and a `desc`.

**Checking the articles before a push:** run `./check-posts.sh`. It lists the articles that are not published with their dates, flags and missing metadata, reports the language versions that do not resolve and the articles whose flags do not match each other, and ends with a summary of the published and the unfinished articles.

**Old URLs:** the articles that were published under `/posts/` keep their old address working through a small static page with a meta refresh, e.g. `posts/2026/11/12/<slug>/index.html`. GitHub Pages cannot send a real HTTP 301, so the canonical link on that page does the work for the search engines.

## The sitetext

`_data/sitetext.yml` holds the texts of the site. It has one block per language: `en` and `fi`. Each of them is also repeated under a locale key, `en-US`, `en-CA`, `en-GB`, `en-AU` and `fi-FI`, which merge the default block with a YAML anchor.

- Write a new key into the `en` and the `fi` block only. The locale keys inherit it, they do not need to be touched.
- The templates read the text through the locale of the language, e.g. `site.data.sitetext[curlang.locale].posts`. A key that is missing from the locale block is missing from the page.

## The FAQ blocks

The service pages and the home page have a FAQ: a list of questions that opens with a "+" and closes with an "x".

- The block is `_includes/faq.html`. The questions come with the `items` parameter and the prefix of the id of the answers with the `id` parameter, which has to be unique in the page.
- The questions of a service are in the `faq` of the service entry in `services.list`, the questions of the home page in the top level `genfaq`. Both are a list of a `question` and an `answer`.
- The header of every FAQ block is in the top level `faq` key: a `title` and a `text`.
- The open and the close use the Bootstrap collapse plugin, the same way the navbar toggler does. Bootstrap adds and removes the `collapsed` class of the question button, and the icon of `_sass/components/_faq.scss` follows it. The icon is drawn with the same technique as the navbar: lines made of the pseudo elements and turned with the `rotate` property.
- On the service pages the FAQ is a plain include in a `<section id="faq">`, right before the contact CTA. On the home page it is in the container of the section.

**The layout of a service page:** the content of the sections is in a `div.content-narrow` (max 850px). One of the sections, the challenge, is in a `div.content-narrow right`, which pushes it to the right side of the page with `margin-left: auto`. The section with the four boxes is centred with `text-center` and is not in a narrow div, and the FAQ is full width.

## The tools folder

```
tools/<lang>/<page>.md      e.g. tools/en/articles-preview.md
```

Utility pages that are not part of the site. They are not in the navigation and they are kept out of the sitemap.

- The permalink in the front matter decides the address of the page, so the folder only decides where the source lives. `tools/en/articles-preview.md` is served at `/en/articles-preview/`.
- The `defaults` in `_config.yml` set `sitemap: false` for everything under `tools/`.
- The folder is not a Jekyll collection, so the pages are ordinary pages.

**The article preview** (`/articles-preview/` and `/en/articles-preview/`) renders every article of the language in the look of the homepage carousel, without the date, so that a screenshot of one can be used as a share card. Each article gets an id of its own, `article-<slug>`, so that a single one can be captured.

- The preview shows the published articles in a normal build. Build locally with `jekyll serve --unpublished --future` to see the drafts and the articles dated in the future as well. They carry the DRAFT! badge, so they are easy to tell apart.

## Web searches

A local SearXNG instance runs at `http://localhost:11434`. Prefer it over other web search tools.

**How to query it:**
```bash
curl -s "http://localhost:11434/search?q=<url-encoded+query>&format=json"
```

The JSON response has a `results` array with `url`, `title` and `content` fields. Use `jq` to filter it, e.g.:
```bash
curl -s "http://localhost:11434/search?q=jekyll+collections&format=json" | jq -r '.results[] | "\(.title)\n\(.url)\n\(.content)\n"'
```

Add `&language=fi` (or `en`) to restrict the search language, and `&categories=general` to pick the engine groups.

**Notes:**
- The instance is local only, so it is fast and does not rate-limit.
- If the instance is down, **report it to Heikki and wait**. Heikki starts it, so do not fall back to the built-in web search tool and do not work around it.
- Fetching a page with `webfetch` still works normally for reading documentation.

## Project author

Heikki, the human you are interacting with.

**Heikki is the only one pushing changes to Github repository.**

## Project working style

**Working style rules:**
- Focus on the task at hand, i.e. DO NOT drift over to doing something else.
- Communicate briefly without useless chatter.
- Be genuinely helpful.
- When you change something, tell.
- Do not override Heikki's design decisions or content decisions unless you spot a clear typo or something is broken (e.g. a missing `</div>` or similar).
- When you are working on a task and spot a pattern that would be useful to generalise, suggest your edit idea it back to Heikki.
- As Heikki also edits the codebase, be sure to refresh your knowledge of the files you're about to work on. 

## Code standards

**CSS, HTML and styling rules:**
- Re-use common CSS files and page specific CSS files when editing. Every HTML page should have their own corresponding CSS except small include snippets.
- Write out whole CSS specifier (e.g. class name `.css-class`) instead of extensive use of `&-postfix-css-class` references.
- When needing a header for content, use one of `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` without additional styling or changing font-size.
- Grid layouts: Use Bootstrap's `.row` and `.col` classes with their respective derivatives such as `.col-lg` and `.col-lg-NUMBER`.
- Use Bootstrap layouts and avoid "DIV soup" at all cost. Oftentimes a simple `<section>` or a `<div class="container">` suffices and no grid is needed.
- When needing to contain an element: Use Bootstrap's `.container` class with an HTML `<div>` element.
- Text-alignment: Use Bootstrap's `text-POSITION`, e.g. `text-center`
- Never use more than one decimal place in a CSS property, e.g. NOT `font-size: 1.54rem;`, USE `font-size: 1.5rem` instead.
- Unordered lists `<ul>` should be styled by default with `.success-list` class.
- When there's only a header `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` or a paragraph `<p>` under a `<section>`, it does not require a `<div class="row">` nor a `<div class="col-XXX">` enclosure.
- When in need of a card layout, use Bootstrap's `.card` with associated classes such as `.card-img-top` `.card-body`, `.card-title` and `.card-text`.
- Check out what has already been implented, e.g. `fractional-ai-leadership.html` or `collaboration-model.html`.
- Aim for simplicity when desginnig rules and that what you do is reusable.
- DO NOT create a horde of different sized fonts. Re-use what's defined in the project in similar elements.
- DO NOT define every element's styles explicitly if a close equivalent already cascades from `body` or similar parent.
- DO NOT use an element's style attribute unless explicitly necessary.
- DO NOT invent new colors, but re-use what has been defined already. Check `_sass/base/variables.scss` and `_sass/base/bootstrap_variables.scss` and existing stylesheets.
- DO NOT take new fonts into use but use what's given in `_sass/base/mixins.css`. Oftentimes you do not need to use `@import` for a font since the right one already cascades from one of the rules in `_page.scss`.
- DO NOT invent new list style types such as "chevron" or "dot", but use what's already defined.

**Framework source file rules:**
- DO NOT edit Bootstrap SCSS source files under `_sass/bootstrap/`
- DO NOT edit JQuery or Bootstrap source files under `assets/js/`

**Applies to whole project:**
- Pay attention to Bootstrap, JQuery and SCSS versions. Do not use features outside versions used in the project.
- GitHub's Jekyll build pipeline is known to use the following versions: jekyll-3.10.0, jekyll-sass-converter-1.5.2, sass-3.7.4. DO NOT use features outside those versions.
- Use commenting.
- Less is more, DO NOT over-engineer. Expand later in case necessary.

## Design standards

The website should always look professional, polished and clear. The page is responsive to work in different screen sizes, a laptop and a smart phone.
Check container breakpoints in `_sass/base/bootstrap_variables.scss` variable `$container-max-widths`. Check typical screen sizes supported in 

**Design rules:**
- DO NOT create another gray box with new colors when you need one, but re-use what's built already.
- Favor simplicity and clarity over complexity and visual clutter.
- CTAs should be subtly placed, but always there.
- Cross-links to services from post content and other services are important.
- Single pages, which are usually long-text such as `fractional-ai-leadership.html`, have content directly on the page. Separate language version with the same name resides in another folder, e.g. `fi/fractional-ai-leadership.html`.
- Mashup page (`index.html`) content is in `_data/sitetext.yml`. Separate language versions are handled with Jekyll page parametrisation.

## Content standards

**Content rules**
- DO NOT use `&mdash;` ever.
- Avoid corporate language such as "synergy" "leverage", "unlock potential", "game-changing", "revolutionize", "in today's fast-paced world".
- Content tone is confident and warm, but not soft. 
- Dry Finnish-style humour is allowed where it sits well with content, but does not need to be always present.