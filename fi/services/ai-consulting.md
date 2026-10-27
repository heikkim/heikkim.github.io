---
layout: page
title: "AI-konsultointi yrityksille, hallituksille ja organisaatioille"
navtype: absolute
lang: fi
meta:
  title: "AI-konsultointi"
  description: "Ratkaisut PK-yritysten erityisiin tekoäly- ja dataongelmiin - mahdollisuuksien arvioinnista liiketoimintaperusteluun ja toteutukseen."
---
{% assign service=site.data.sitetext[page.lang].services.list | where: "sid", "ai-consulting" | first %}
<div class="service-page">

  <!-- 1. Hero — headline and executive summary -->
  <section class="service-hero">
    <div class="row">
      <div class="col-lg-10 offset-lg-1 text-center">
        <h1 class="service-title">{{ service.title }}</h1>
        <p class="service-subtitle">Tulossa.</p>
        <p class="service-lead">
          <a class="content-link" href="/services/ai-consulting.html">Read more about AI Consulting for Companies</a>
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
