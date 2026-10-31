---
layout: page
navtype: absolute
lang: en
meta_title: "A Step Ahead - posts"
meta_description: "Writing on AI strategy, AI governance and leading the change."
---
{% assign curlang = site.languages | where: "code", page.lang | first %}
{% assign postsText = site.data.sitetext.posts %}
{% if curlang.locale and curlang.locale != "" and curlang.locale != nil %}
  {% assign postsText = site.data.sitetext[curlang.locale].posts %}
{% endif %}

<section id="posts-main" class="page-hero">
  <h1>{{ postsText.title }}</h1>
  <h5>{{ postsText.text }}</h5>
</section>

{% include posts-list.html lang=page.lang %}
