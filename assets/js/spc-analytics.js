/*
 * Google Analytics loader.
 *
 * The Google Analytics script is requested only after the visitor has accepted
 * analytics cookies, so nothing is tracked before consent is given. The
 * measurement id is set from _config.yml via window.spcAnalyticsId.
 */
let spc_analyticsLoaded = false;

function spc_initAnalytics() {
    if (spc_analyticsLoaded) {
        return;
    }

    const id = window.spcAnalyticsId;

    if (!id) {
        return;
    }

    const consent = spc_cookieGet("consent", null);

    if (!consent || !consent.analytics) {
        return;
    }

    spc_analyticsLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
        window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", id);

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
    document.head.appendChild(script);
}

/*
 * Withdrawing consent has to remove the tracking that has already happened.
 * Google Analytics stores its identifiers in "_ga" cookies, so they are
 * deleted here.
 */
function spc_stopAnalytics() {
    // No further events are sent after the consent has been withdrawn.
    window.gtag = function () {};

    const hostParts = window.location.hostname.split(".");
    const domains = [""];

    for (let i = 0; i < hostParts.length - 1; i++) {
        domains.push(hostParts.slice(i).join("."));
    }

    const names = document.cookie.split(";").map(function (part) {
        return part.trim().split("=")[0];
    }).filter(function (name) {
        return name.indexOf("_ga") === 0;
    });

    names.forEach(function (name) {
        domains.forEach(function (domain) {
            const domainAttribute = domain ? "; domain=" + domain : "";
            document.cookie = name + "=; path=/; max-age=0; SameSite=Lax" + domainAttribute;
        });
    });
}

// Analytics can also be granted during the visit, not only on page load.
document.addEventListener("spc:consent", spc_initAnalytics);

// Visitors who have already accepted analytics cookies are tracked right away.
spc_initAnalytics();
