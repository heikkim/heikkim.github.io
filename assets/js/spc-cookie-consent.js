/*
 * Cookie consent banner.
 *
 * The banner is shown once per visitor, until a choice is saved in the
 * preference cookie. The choice can be changed later from the footer link.
 */
function spc_consentBanner() {
    return $("#cookie-consent");
}

function spc_consentOptions() {
    return $("#cookie-consent-options");
}

function spc_consentDecision() {
    const consent = spc_cookieGet("consent", null);

    if (consent && consent.decidedAt) {
        return consent;
    }

    return null;
}

function spc_consentShow(showOptions) {
    const banner = spc_consentBanner();

    if (!banner.length) {
        return;
    }

    banner.removeClass("d-none");

    if (showOptions) {
        spc_consentOptions().removeClass("d-none");
    }

    spc_consentLayout();
    banner.trigger("focus");
}

function spc_consentHide() {
    const banner = spc_consentBanner();

    if (!banner.length) {
        return;
    }

    banner.addClass("d-none");
    spc_consentLayout();
}

/*
 * Keep the page clear of the banner: the body gets room for it and a footer
 * that is pinned to the bottom of the window is lifted above the banner.
 */
function spc_consentLayout() {
    const banner = spc_consentBanner();
    const footer = $("#footer");

    if (!banner.length || banner.hasClass("d-none")) {
        document.body.style.paddingBottom = "";

        if (footer.length) {
            footer.css("bottom", "");
        }

        return;
    }

    const height = banner.outerHeight();

    document.body.style.paddingBottom = height + "px";

    if (footer.length && footer.css("position") === "fixed") {
        footer.css("bottom", height + "px");
    }
}

function spc_consentSave(consent) {
    consent.necessary = true;
    consent.decidedAt = new Date().toISOString();

    spc_cookieSet("consent", consent);
    spc_consentHide();

    if (!consent.analytics) {
        spc_stopAnalytics();
    }

    document.dispatchEvent(new CustomEvent("spc:consent", { detail: consent }));
}

function spc_initCookieConsent() {
    const banner = spc_consentBanner();

    if (!banner.length) {
        return;
    }

    const decision = spc_consentDecision();

    // Show the stored choice in the settings panel.
    $("#cookie-consent-analytics").prop("checked", !!(decision && decision.analytics));

    $("#cookie-consent-accept").on("click", function () {
        spc_consentSave({ analytics: true });
    });

    $("#cookie-consent-reject").on("click", function () {
        spc_consentSave({ analytics: false });
    });

    $("#cookie-consent-save").on("click", function () {
        spc_consentSave({
            analytics: $("#cookie-consent-analytics").is(":checked")
        });
    });

    $("#cookie-consent-toggle").on("click", function () {
        spc_consentOptions().toggleClass("d-none");
        spc_consentLayout();
    });

    // Link for changing the choice later on.
    $(".js-cookie-settings").on("click", function (e) {
        e.preventDefault();
        spc_consentShow(true);
    });

    $(window).on("resize", spc_consentLayout);

    if (!decision) {
        spc_consentShow(false);
    }
}
