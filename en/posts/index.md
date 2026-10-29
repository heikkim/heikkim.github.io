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

<div class="posts-page">

  <header class="posts-hero">
    <div class="row">
      <div class="col-lg-10 offset-lg-1 text-center">
        <h1>{{ postsText.title }}</h1>
        <p class="posts-excerpt">{{ postsText.index-lead }}</p>
      </div>
    </div>
  </header>

  {% include posts-list.html lang=page.lang %}

</div>
