---
layout: page
title: "AI-valmennus ylemmälle johdolle ja hallituksille"
navtype: absolute
lang: fi
meta:
  title: "AI-valmennus"
  description: "Henkilökohtaista, käytännönläheistä AI-valmennusta johtajille ja hallitusjäsenille - satunnaisesta käyttäjästä luotettavaksi tekoälyn tehokäyttäjäksi neljässä viikossa."
---
{% assign service=site.data.sitetext[page.lang].services.list | where: "sid", "ai-coaching" | first %}
<div class="service-page">

  <!-- 1. Hero — headline and executive summary -->
  <section class="service-hero">
    <div class="row">
      <div class="col-lg-10 offset-lg-1 text-center">
        <h1 class="service-title">{{ service.title }}</h1>
        <p class="service-subtitle">Tulossa.</p>
        <p class="service-lead">
          <a class="content-link" href="/services/ai-coaching.html"><span class="line">Read more about AI Coaching for senior leaders</span></a>
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
