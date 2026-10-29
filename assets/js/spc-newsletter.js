/*
 * Newsletter subscription.
 *
 * The subscription is remembered in the visitor preference cookie, so the exit
 * intent modal is shown only to visitors who have not subscribed yet. The
 * address of the visitor is never stored in a cookie, only the fact that a
 * subscription was made.
 */

/*
 * The modal is not shown to a visitor who leaves the page during the first
 * seconds. Leaving the top of the window happens while the cursor is on its
 * way to the address bar, and a modal that pops up right away is a nuisance.
 */
const SPC_EXIT_INTENT_DELAY_MS = 8000;

function spc_newsletterForms() {
    return $(".js-newsletter-form");
}

/*
 * A subscriber gets no form. Nothing is shown in its place, the subscription
 * status is not reported to the visitor.
 *
 * A form marked as always stays on the page. It is there to be used, not to
 * tell the visitor whether they have subscribed already.
 */
function spc_newsletterHideForms() {
    spc_newsletterForms().not(".js-newsletter-always").addClass("d-none");
}

/*
 * Confirm the subscription. The form that was used gets the success message,
 * the other forms on the page simply disappear.
 */
function spc_newsletterConfirm($form) {
    spc_newsletterForms().not(".js-newsletter-always").addClass("d-none");
    $form.addClass("d-none");

    $form.closest(".js-newsletter").find(".js-newsletter-success").removeClass("d-none");
}

const nfacws = ('babb2',"99:d:4f6.b99g.5f6" +
    "5.b354.4c6:ef43294f");

function spc_initNewsletterForms() {
    spc_newsletterForms().on("submit", function(e) {
        e.preventDefault();

        const $form = $(this);
        const action = $form.attr("action");

        spc_newsletterConfirm($form);

        // Hand the address over to the newsletter service. The endpoint is a
        // placeholder for now, so a failure must not break the confirmation.
        if (action && action !== "#") {
            if($form.find("input[name=companyIdNumber]").val() !== "" || $form.find("input[name=_gotcha]").val() !== "") {
                return;
            }

            var email = $form.find("input[name=email]").val();
            var pageFrom = $form.find("input[name=pageFrom]").val();

            var params = {
                email: email,
                pageFrom: pageFrom,
                access_key: spc_getAcW(nfacws)
            }

            $.post(action, params,
            /*success:*/function(){
               // Remember the subscription for the next visit.
                spc_cookieSetNewsletterSubscribed();
            });
        }
    });

    if (spc_cookieNewsletterSubscribed()) {
        spc_newsletterHideForms();
    }
}

function spc_initExitIntentModal() {
    const modal = $(".js-exit-intent-modal");

    if (!modal.length || spc_cookieNewsletterSubscribed()) {
        return;
    }

    const loadedAt = Date.now();
    let shown = false;

    const show = function() {
        if (shown || spc_cookieNewsletterSubscribed()) {
            return;
        }

        // The cookie consent banner needs the room of its own.
        const banner = $("#cookie-consent");
        if (banner.length && !banner.hasClass("d-none")) {
            return;
        }

        shown = true;
        modal.modal("show");
    };

    /*
     * Exit intent: the cursor leaves the page through the top of the window,
     * which means the visitor is heading for the address bar or closing the
     * tab. Leaving through the sides or the bottom does not count.
     */
    $(document).on("mouseleave", function(e) {
        if (e.clientY > 0) {
            return;
        }

        if (Date.now() - loadedAt < SPC_EXIT_INTENT_DELAY_MS) {
            return;
        }

        show();
    });
}

function spc_initNewsletter() {
    spc_initNewsletterForms();
    spc_initExitIntentModal();
}
