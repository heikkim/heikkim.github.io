Add a newsletter subscription feature.

**Technical Context:**
* **Framework:** Jekyll (standard GitHub Pages).
* **Frontend Stack:** Bootstrap and jQuery.
* **Existing Setup:** There is already a custom cookie management implementation in place.
* **Languages:** Finnish (`fi`, default) and English (`en`).

**Core Requirements:**

**1. Relocatable Newsletter Form Component:**
* Create a modular Jekyll `include` (e.g., `newsletter-form.html`) that contains a single email input field and a submit button.
* **Default State:** A single email input field and a submit button for subscribing.
* **Subscribed State:** If the user is already subscribed, hide the input. Do not show a message to user about their subscription status.
* The design should use subtle Bootstrap styling so it integrates smoothly into footers, sidebars, or inline within articles.
* Ensure the text labels (call-to-action, placeholder, button text) can handle the bilingual setup (e.g., by passing parameters to the include or using Liquid variables).

**2. Exit-Intent Modal:**
* Create a subtle Bootstrap Modal `include` (e.g., `exit-modal.html`) containing the same newsletter subscription form.
* Write the jQuery/JavaScript logic to detect "exit-intent" (e.g., when the user's mouse cursor leaves the top of the browser viewport).
* The modal should **only** trigger if the user has not already subscribed.

**3. JavaScript & Cookie Logic:**
* Write the jQuery script to handle the form submission (preventing default reload).
* Upon submission, the script must hook into a placeholder for the existing cookie implementation to store a long-lasting cookie (e.g., `newsletter_subscribed=true`). Expand current cookie implementation so that all set cookies are long-lasting to keep it simpler technically.
* Provide the logic that checks for this cookie on page load to prevent the exit-intent modal from firing for existing subscribers, and to potentially hide the inline form if desired.
* Do not track unsubscribed status in cookies.
* Show a simple, subtle success message upon form submission.

**4. Styling (SCSS):**
* Provide a new SCSS partial (e.g., `_newsletter-subscribe.scss`) for any custom subtle styling applied to the form and the modal, ensuring it meshes well with standard Bootstrap utility classes.
* Utilise current theming, e.g. button styles. Do not invent new styles.
* Modal needs to have a close button (X) in the upper right corner.

**Deliverables:**
1. The HTML/Liquid code for the `newsletter-subscribe.html` include.
2. The HTML/Liquid code for the `exit-modal.html` include.
3. The jQuery/JavaScript snippet handling the form submission, exit-intent detection, and cookie logic.
4. The SCSS for `_newsletter-subscribe.scss`.

Sidenote: that there is already a `modals.html` which is related to the Jekyll Agency theme`s portfolio listing. Rename that file to something else to avoid mixing it up with this new functionality.
