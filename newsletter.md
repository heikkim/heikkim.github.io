---
layout: page
navtype: absolute
lang: fi
isNewsLetterPage: true
meta_title: "Tekoälyuutiskirje: Askel Edellä"
meta_description: "Näkemyksiä tekoälystrategiasta, AI-käytännöistä ja muutoksen johtamisesta."
---
{% assign curlang = site.languages | where: "code", page.lang | first %}
{% assign newsletterText = site.data.sitetext.newsletter %}
{% if curlang.locale and curlang.locale != "" and curlang.locale != nil %}
  {% assign newsletterText = site.data.sitetext[curlang.locale].newsletter %}
{% endif %}

<section class="content-narrow mx-auto page-hero">
  <div class="prose">
    <h1>{{ newsletterText.title }}</h1>
    <p class="excerpt">{{ newsletterText.text }}</p>
    
    <p>
      Uutiskirje sisältää oppeja tekoälystä asiakastyössä, siitä, mikä on toiminut, mikä ei ole
      ja missä yritykset yleensä kompuroivat.
    </p>

    <h2>Aihealueet</h2>
    <ul class="common-list">
      <li><strong>Tekoälystrategia:</strong> mistä strategia oikeasti alkaa ja miksi se lähtee ongelmasta, ei työkalusta.</li>
      <li><strong>Hallinta:</strong> käytännön päätökset ja käytännön säännöt tekoälyn käytössä yrityksissä.</li>
      <li><strong>Johtaminen:</strong> miten tekoäly muuttaa johtajan työarkea.</li>
    </ul>

    <h2>Frekvenssi</h2>
    <p>
      Kerran - pari kuussa. Ensimmäinen loppuvuoden 2026 aikana.
    </p>

    <h2>Asiapainotteista sisältöä</h2>
    <p>
      .. ja vähemmän palveluiden myymistä.
    </p>

    <div id="permanentNewsletterOrderForm">
      <h2>Tilaa uutiskirje!</h2>

      {% include newsletter-subscribe.html lang=page.lang id="newsletter-page" always=true %}
    </div>
  </div>
</section>
