/*
 * SPC visitor preference cookie.
 *
 * Every visitor choice (cookie consent, language, ...) is kept in a single
 * JSON encoded cookie. New preferences are added as new keys in the same
 * cookie, so the store stays expandable and the choices of returning
 * visitors are never lost when a new preference is introduced.
 *
 * Public API:
 *   spc_cookieGet(key, fallback)  - read one preference
 *   spc_cookieSet(key, value)      - write one preference, keeping the others
 *   spc_cookieRead()               - read all preferences
 *   spc_cookieRemove()             - forget all preferences
 */
const SPC_COOKIE_NAME = "spc_prefs";

/*
 * Every preference shares the same long lifetime, so a stored choice never
 * expires halfway through the interest of a visitor. The consent decision,
 * the language and the newsletter subscription all live here.
 */
const SPC_COOKIE_MAX_AGE_DAYS = 730;

/*
 * Default value of every known preference. Add a new key here when a new
 * feature needs to remember something about the visitor, e.g. "lang".
 */
const SPC_COOKIE_DEFAULTS = {
    consent: {
        necessary: true,
        analytics: false,
        decidedAt: null
    },
    // Language selection, e.g. "en" or "fi". Reserved for the language chooser.
    lang: null,
    /*
     * The newsletter subscription. Only the fact that the visitor subscribed
     * is kept, never the address itself. An unsubscribed visitor is not
     * tracked at all.
     */
    newsletter: {
        subscribed: false,
        subscribedAt: null
    }
};

function spc_cookieDefaults() {
    return JSON.parse(JSON.stringify(SPC_COOKIE_DEFAULTS));
}

function spc_cookieIsObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}

/*
 * Merge the stored preferences over the defaults. Nested objects are merged
 * one level deep, so a preference that gains a new sub-key gets its default
 * value for visitors who stored their choice earlier.
 */
function spc_cookieMerge(defaults, stored) {
    const merged = {};

    for (const key in defaults) {
        if (!Object.prototype.hasOwnProperty.call(defaults, key)) {
            continue;
        }

        const defaultValue = defaults[key];
        const storedValue = stored[key];

        if (spc_cookieIsObject(defaultValue) && spc_cookieIsObject(storedValue)) {
            merged[key] = spc_cookieMerge(defaultValue, storedValue);
        } else if (storedValue !== undefined) {
            merged[key] = storedValue;
        } else {
            merged[key] = defaultValue;
        }
    }

    // Keep preferences that are not known (yet) so no data is lost.
    for (const key in stored) {
        if (!Object.prototype.hasOwnProperty.call(stored, key)) {
            continue;
        }

        if (!Object.prototype.hasOwnProperty.call(merged, key)) {
            merged[key] = stored[key];
        }
    }

    return merged;
}

function spc_cookieReadRaw() {
    const prefix = SPC_COOKIE_NAME + "=";
    const parts = document.cookie.split(";");

    for (let i = 0; i < parts.length; i++) {
        const part = parts[i].trim();

        if (part.indexOf(prefix) === 0) {
            return decodeURIComponent(part.substring(prefix.length));
        }
    }

    return null;
}

function spc_cookieRead() {
    const raw = spc_cookieReadRaw();

    if (!raw) {
        return spc_cookieDefaults();
    }

    try {
        const stored = JSON.parse(raw);

        if (!spc_cookieIsObject(stored)) {
            return spc_cookieDefaults();
        }

        return spc_cookieMerge(spc_cookieDefaults(), stored);
    } catch (ex) {
        // A corrupted cookie counts as "no decision made yet".
        return spc_cookieDefaults();
    }
}

function spc_cookieWrite(state) {
    const maxAge = SPC_COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
    let attributes = "; path=/; max-age=" + maxAge + "; SameSite=Lax";

    if (window.location.protocol === "https:") {
        attributes += "; Secure";
    }

    document.cookie = SPC_COOKIE_NAME + "=" + encodeURIComponent(JSON.stringify(state)) + attributes;
}

function spc_cookieGet(key, fallback) {
    const state = spc_cookieRead();

    if (Object.prototype.hasOwnProperty.call(state, key) && state[key] !== null) {
        return state[key];
    }

    return fallback;
}

function spc_cookieSet(key, value) {
    const state = spc_cookieRead();

    state[key] = value;
    spc_cookieWrite(state);

    return state;
}

function spc_cookieRemove() {
    document.cookie = SPC_COOKIE_NAME + "=; path=/; max-age=0; SameSite=Lax";
}

/*
 * Newsletter subscription.
 *
 * These two functions are the place where the newsletter feature stores what
 * it needs to remember. The address of the visitor is never written to a
 * cookie, only the fact that a subscription was made.
 */
function spc_cookieNewsletterSubscribed() {
    const newsletter = spc_cookieGet("newsletter", null);

    return !!(newsletter && newsletter.subscribed);
}

function spc_cookieSetNewsletterSubscribed() {
    const newsletter = spc_cookieGet("newsletter", null) || {};

    newsletter.subscribed = true;
    newsletter.subscribedAt = new Date().toISOString();

    spc_cookieSet("newsletter", newsletter);
}
