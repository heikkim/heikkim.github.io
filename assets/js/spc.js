const __SPC_PERIODIC_REFRESH = false;
const __SPC_DEBUG = false;

function spc_init() {
    spc_initContactButtonShowForm();
    spc_initNavItemContacFormShow();
    
    spc_initServiceOnclicks();

    spc_initOpenContactTimer();

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
        //swallow
    }
}

function spc_getAcW() {
    const acws = 'f65444e:.9f46.5299.:3:3.8g2bfb12bg8g';
    var acw = '';

    for(var ci = 0; ci < acws.length; ci++) {
        var c = acws.charCodeAt(ci);

        acw += String.fromCharCode(c-1);
    }
    
    return acw;   
}
