---
layout: page
navtype: absolute
lang: en
isNewsLetterPage: true
meta_title: "The AI Newsletter"
meta_description: "Occasional notes on AI strategy, governance and leading the change. No sales pitches, no weekly noise."
---
{% assign curlang = site.languages | where: "code", page.lang | first %}
{% assign newsletterText = site.data.sitetext.newsletter %}
{% if curlang.locale and curlang.locale != "" and curlang.locale != nil %}
  {% assign newsletterText = site.data.sitetext[curlang.locale].newsletter %}
{% endif %}

<div class="page">

  <header class="hero">
    <div class="row">
      <div class="col-lg-10 offset-lg-1 text-center">
        <h1>{{ newsletterText.title }}</h1>
        <p class="excerpt">{{ newsletterText.text }}</p>
      </div>
    </div>
  </header>

  <section class="body">
    <div class="row">
      <div class="col-lg-8 offset-lg-2 prose">
        <p>
          The newsletter is a record of learnings about AI in client work. What worked, what did not, and where
          companies usually get stuck.
        </p>

        <h2>Topics</h2>
        <ul class="common-list">
          <li><strong>AI strategy:</strong> where AI strategy really starts, and why it does not begin with the tool.</li>
          <li><strong>Governance:</strong> practical decisions and practical rules, not documentation work.</li>
          <li><strong>Leadership:</strong> how AI changes what a leader actually does at work.</li>
        </ul>

        <h2>Frequence</h2>
        <p>
          Once or twice a month. The first one will be out late 2026.
        </p>

        <h2>Focus is on what matters</h2>
        <p>
          .. and less on sales pitches.
        </p>

        <h2>Subscribe today!</h2>

        {% include newsletter-subscribe.html lang=page.lang id="newsletter-page" always=true %}

      </div>
    </div>
  </section>

</div>
