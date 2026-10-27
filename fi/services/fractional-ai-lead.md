---
layout: page
title: "Fractional AI Lead / Director / Officer yrityksille ja organisaatioille"
navtype: absolute
lang: fi
meta:
  title: "Fractional AI Lead"
  description: "Vanhaa tekoälystrategiaa, hallintamalleja ja käytännön toteutusta PK-yrityksille ja niiden hallituksille - ilman kokoaikaisen johtajan kustannuksia."
---
{% assign service=site.data.sitetext[page.lang].services.list | where: "sid", "fractional-ai-lead" | first %}
<div class="service-page">

  <!-- 1. Hero — headline and executive summary -->
  <section class="service-hero">
    <div class="row">
      <div class="col-lg-10 offset-lg-1 text-center">
        <h1 class="service-title">{{ service.title }}</h1>
        <p class="service-subtitle">Tulossa.</p>
        <p class="service-lead">
          <a class="content-link" href="/services/fractional-ai-lead.html">Read more about Fractional AI Lead for Companies</a>
        </p>
      </div>
    </div>
  </section>

  <section class="service-cta" id="next-steps">
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <h2 class="section-heading">Aloitetaan keskustelu.</h2>
        <p class="service-lead">
          Jokainen toimeksianto alkaa lyhyellä kartoituskeskustelulla:
          mitä on yritetty, missä kenkä puristaa ja miltä onnistuminen näyttäisi..
        </p>
      </div>
    </div>
  </section>

  <div class="container unpad-100">
    {% include contact.html lang=page.lang cta-btn-text="Ota yhteyttä" headless=true %}
  </div>
</div>
