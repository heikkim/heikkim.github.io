/*!
 * Start Bootstrap - Agency v5.2.2 (https://startbootstrap.com/template-overviews/agency)
 * Copyright 2013-2019 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-agency/blob/master/LICENSE)
 */

! function(jQ) {
  "use strict";
  jQ('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
      var a = jQ(this.hash);
      if ((a = a.length ? a : jQ("[name=" + this.hash.slice(1) + "]")).length) return jQ("html, body").animate({
        scrollTop: a.offset().top - 54
      }, 300, "easeInOutExpo"), !1
    }
  }); 
  
  jQ(".js-scroll-trigger").click(function() {
    var elem = $(this);

    if(elem.attr("data-collapsenavbaronclick") == "true") {
      jQ(".navbar-collapse").collapse("hide");
    }
  }); 
  
  jQ("body").scrollspy({
    target: "#mainNav",
    offset: 56
  });

  function windowSizeWatcher() {
    var mainNav = jQ("#mainNav");
    var subNavShade = jQ("#subNavShade");

    if(mainNav.offset().top > 100) {
      mainNav.addClass("navbar-shrink");
      subNavShade.addClass("navbar-shrink");
    } else {
      mainNav.removeClass("navbar-shrink");
      subNavShade.removeClass("navbar-shrink");
    }
    
  }
  
  windowSizeWatcher(), jQ(window).scroll(windowSizeWatcher)
}(jQuery);