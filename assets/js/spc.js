const __SPC_PERIODIC_REFRESH = false;
const __SPC_DEBUG = false;

function spc_init() {
    spc_initContactButtonShowForm();
    spc_initNavItemContacFormShow();
    spc_initSecondaryContactCTAs();
    
    spc_initServiceOnclicks();

    spc_initOpenContactTimer();

    spc_fixScrollWhenComingToFrontPageFromSinglePage();

    spc_bindSubNavFunctionality();

    spc_initCookieConsent(); // in spc-cookie-consent.js

    spc_initNewsletter(); // in spc-newsletter.js

    spc_bindCookieChangeToLangMenu();

    if(__SPC_PERIODIC_REFRESH === true) {
        setTimeout(function() {window.location.reload();}, 700);
    }
}

function spc_getContactFormContainer() {
    return $("#contact-form-container");
}

function spc_getContactFormShowButton() {
    return $("#contact-form-show-btn");
}

function spc_getContactNavItem() {
    return $("#nav-link-contact");
}

function spc_getMainNav() {
    return $("#mainNav");
}

function spc_getSubNavShade() {
    return $("#subNavShade")
}

function spc_showContactForm() { 
    var contactFormContainer = spc_getContactFormContainer();
    var contactFormShowButton = spc_getContactFormShowButton();
    
    contactFormContainer.toggleClass("d-none", false);        
    contactFormShowButton.parent().hide(); //toggleClass("d-none", true);
}

function spc_initContactButtonShowForm() {
    spc_getContactFormShowButton().on("click", function() {
        spc_showContactForm();
    });
}

function spc_initNavItemContacFormShow() {
    var contactNavItem = spc_getContactNavItem();

    contactNavItem.on("click", function() {
        spc_getContactFormShowButton().click();
    });
}

function spc_initServiceOnclicks() {
    $("#services").find("div[id|=service]").on("click", function(e) {
        var link = $(this).attr("data-link");

        if(String.prototype.toLowerCase(e.target.tagName) != "a" && link != "") {
            $(location).attr("href", link);
        }
    });
}

function spc_initOpenContactTimer() {
    try {
        if(document.location.href.indexOf("#contact") > -1) {
            setTimeout(function() {
                if(spc_getContactFormContainer().hasClass("d-none")) {
                    spc_getContactFormShowButton().click();
                }
            }, 400);
        }
    } catch (ex) {
        if(__SPC_DEBUG) {
            console.log(ex);
        }
    }
}

function spc_getAcW(acws) {
    var acw = '';

    for(var ci = 0; ci < acws.length; ci++) {
        var c = acws.charCodeAt(ci);
        acw += String.fromCharCode(c-1);
    }
    
    return acw;   
}

const cfacws = ('fgg81', 'f65444e:.9f46.' +
     "5299.:3:3.8g2bfb12bg8g");

function spc_getContactFormAcW() {
    return spc_getAcW(cfacws)
}

function spc_fixScrollWhenComingToFrontPageFromSinglePage() {
    var url = new URL(window.location.href);
    
    if(url.href.indexOf("#") > -1) {
        try {
            var naviLinks = $("#navbarResponsive").find("ul").first().find("li a"); 
            var _continue = true;
            
            naviLinks.each(function() {
                if(_continue) {
                    var link = $(this);
                    var linkHref = link.attr("href");

                    if(!linkHref) {
                        return;
                    }

                    if(linkHref.indexOf(".html") > -1) {
                        // Links to a separate page navigate away — no scroll fix needed.
                        return;
                    }

                    if(url.href.indexOf(linkHref) > -1) {
                        link.click();
                        _continue = false;
                    }
                }
            });
        } catch(ex) {
            if(__SPC_DEBUG) {
                console.log(ex);
            }
        }

    }
}

function spc_initSecondaryContactCTAs() {
    $(".contact-secondary-cta").on("click", function(e) {
        e.preventDefault();
        spc_getContactFormShowButton().click();
    });
}

/*
 * Remember the language the visitor picks from the language menu, so that the
 * choice is known on the next visit.
 */
function spc_bindCookieChangeToLangMenu() {
    $("#lang-chooser").find("a").on("click", function() {
        var lang = $(this).attr("data-lang");

        if(lang) {
            spc_cookieSet("lang", lang);
        }
    });
}

function spc_bindSubNavFunctionality() {
    var navsWithSubNav = $("#navbarResponsive").find("ul li.has-sub-nav");

    navsWithSubNav.each(function() {
        var navListItem = $(this);
        var links = navListItem.find("a");

        links.each(function() {
            var link = $(this);

            if(link.parentsUntil("ul").parent().hasClass("subnav")) {            
                return;
            }

            link.on("click", function(e) {
                e.preventDefault();
                
                var uls = link.siblings("ul");
                uls.toggleClass("d-none");
                navListItem.toggleClass("subnav-open");

                uls.each(function() {
                    try {
                        const mainNav = spc_getMainNav();
                        const subNavShade = spc_getSubNavShade();

                        if(!$(this).hasClass("d-none")) {
                            //subNavShade.css("top", num + unit);
                            subNavShade.show();
                        } else {
                            //subNavShade.css("top", num + unit);
                            subNavShade.hide();
                        }
                    } catch(ex) {
                        if(__SPC_DEBUG) {
                            console.log(ex);
                        }
                    }
                });
            });
        });
    });
}