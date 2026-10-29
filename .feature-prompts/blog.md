Build a bilingual posts/article section with categories, a highly structured posts layout, and a Bootstrap-powered featured posts carousel for the homepage.

**Technical Context:**
* **Framework:** Jekyll (strictly standard GitHub Pages, absolutely **no** custom plugins).
* **Languages:** Finnish (`fi`, default) and English (`en`).
* **Frontend Stack:** Bootstrap and jQuery are already installed and active.

**Core Requirements:**

**1. Bilingual & Category Folder Architecture:**
* Design a folder structure that utilizes Jekyll's native directory-based categorization while cleanly separating the `fi` and `en` content.
* Provide the exact `_config.yml` additions required to set language and default front matter variables based on these folder paths.

**2. Highlighted Posts Carousel (Homepage):**
* Create an `include` file (e.g., `carousel.html`) that strictly utilizes **Bootstrap's native Carousel component**. 
* Write the Liquid loop logic to fetch only posts with `highlighted: true` in their front matter, filtered by the active language.
* **Carousel Content:** Each carousel slide must display the post's `hero_image` as the background or main visual, along with the post's `excerpt`.
* Handle the Bootstrap `active` class assignment dynamically in the Liquid loop so the first slide displays correctly.

**3. Detailed Blog Layout (`_layouts/post.html`) & SEO:**
* Create a dedicated layout for posts that supports the following elements via front matter or content blocks:
  * **SEO Meta:** Use `meta_title` and `meta_description` from the front matter to appropriately populate or override the `<head>` tags.
  * **Excerpt:** Displayed near the top of the post (and reused on the front page carousel).
  * **Images:** A main `hero_image` and a placeholder/structure for 1 smaller `content_image`.
  * **Pull Quote:** A highlighted text-quote lifted from the post text.
  * **Relevant Posts:** A section at the bottom listing links to other relevant posts (e.g., matching the same category and language).

**4. Styling (SCSS):**
* Assume I have a main stylesheet with existing styles. 
* Generate a separate SCSS partial (e.g., `_posts.scss`) specifically for the posts layout and carousel overrides. Ensure it uses standard SCSS nesting and Bootstrap utility classes where appropriate, complementing an existing design system.

**Deliverables:**
1. The directory tree for categories and languages.
2. The required `_config.yml` configurations.
3. The full Bootstrap HTML/Liquid code for the carousel include.
4. The HTML/Liquid code for the new `post.html` layout.
5. Example front matter for a post utilizing all the requested variables (`meta_title`, `meta_description`, `hero_image`, `content_image`, `excerpt`, `quote`, `highlighted`, etc.).
6. The foundational SCSS for `_posts.scss`.
