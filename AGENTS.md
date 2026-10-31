# StrongPoint Consulting web page project (AKA heikkim.github.io)

This is a Jekyll static website project using Bootstrap, JQuery and select Google fonts. SASS/SCSS is widely used.
The site is published through Github.

## Project structure

Basic Jekyll site structure without particular quirks.

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
- Unordered lists `<ul>` should be styled by default with `.common-list` class.
- When there's only a header `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` or a paragraph `<p>` under a `<section>`, it does not require a `<div class="row">` nor a `<div class="col-XXX">` enclosure.
- When in need of a card layout, use Bootstrap's `.card` with associated classes such as `.card-img-top` `.card-body`, `.card-title` and `.card-text`.
- Check out what has already been implented, e.g. `fractional-ai-lead.html` or `collaboration-model.html`.
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
- Single pages, which are usually long-text such as `fractional-ai-lead.html`, have content directly on the page. Separate language version with the same name resides in another folder, e.g. `fi/fractional-ai-lead.html`.
- Mashup page (`index.html`) content is in `_data/sitetext.yml`. Separate language versions are handled with Jekyll page parametrisation.

## Content standards

**Content rules**
- DO NOT use `&mdash;` ever.
- Avoid corporate language such as "synergy" "leverage", "unlock potential", "game-changing", "revolutionize", "in today's fast-paced world".
- Content tone is confident and warm, but not soft. 
- Dry Finnish-style humour is allowed where it sits well with content, but does not need to be always present.
- The site is to introduce and showcase Heikki's professional solo AI consultancy, therefore the content often takes a first person perspective.