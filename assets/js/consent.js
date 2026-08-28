(() => {
  const STORAGE_KEY = 'pristine-consent-v1';
  const VERSION = 1;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  // Conservative Consent Mode v2 defaults. Keep this script before any future
  // Google Analytics, Google Ads, or Google Tag Manager snippet in <head>.
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    personalization_storage: 'denied',
    security_storage: 'granted',
    wait_for_update: 500
  });

  function normalize(value) {
    if (!value || value.version !== VERSION) return null;
    return {
      version: VERSION,
      analytics: value.analytics === true,
      advertising: value.advertising === true,
      updatedAt: typeof value.updatedAt === 'string' ? value.updatedAt : null
    };
  }

  function readPreferences() {
    try {
      return normalize(JSON.parse(window.localStorage.getItem(STORAGE_KEY)));
    } catch {
      return null;
    }
  }

  function sendConsent(preferences) {
    window.gtag('consent', 'update', {
      analytics_storage: preferences.analytics ? 'granted' : 'denied',
      ad_storage: preferences.advertising ? 'granted' : 'denied',
      ad_user_data: preferences.advertising ? 'granted' : 'denied',
      ad_personalization: preferences.advertising ? 'granted' : 'denied'
    });
  }

  function savePreferences(preferences) {
    const value = {
      version: VERSION,
      analytics: preferences.analytics === true,
      advertising: preferences.advertising === true,
      updatedAt: new Date().toISOString()
    };

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch {
      // Consent still applies for this page even if browser storage is blocked.
    }

    sendConsent(value);
    window.dispatchEvent(new CustomEvent('pristine:consentchange', { detail: value }));
    return value;
  }

  const savedAtLoad = readPreferences();
  if (savedAtLoad) sendConsent(savedAtLoad);

  window.PristineConsent = {
    get: readPreferences,
    set: savePreferences,
    open: () => document.dispatchEvent(new CustomEvent('pristine:openconsent'))
  };

  function mountControls() {
    const banner = document.createElement('section');
    banner.className = 'consent-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Privacy choices');
    banner.innerHTML = `
      <div class="shell consent-layout">
        <div class="consent-copy">
          <h2>Privacy choices</h2>
          <p>We use necessary browser storage to remember your privacy choice. Optional analytics and advertising technologies may be used to measure site performance and Google Ads. You can accept or reject them. <a href="privacy.html">Privacy Policy</a></p>
        </div>
        <div class="consent-actions">
          <button class="button" type="button" data-consent-accept>Accept all</button>
          <button class="button button-secondary" type="button" data-consent-reject>Reject non-essential</button>
          <button class="consent-text-button" type="button" data-consent-manage>Manage choices</button>
        </div>
      </div>`;

    const dialog = document.createElement('dialog');
    dialog.className = 'consent-dialog';
    dialog.setAttribute('aria-labelledby', 'consent-dialog-title');
    dialog.innerHTML = `
      <div class="consent-dialog-inner">
        <div class="consent-dialog-head">
          <div>
            <p class="eyebrow">Privacy settings</p>
            <h2 id="consent-dialog-title">Choose what you allow.</h2>
          </div>
          <button class="consent-close" type="button" aria-label="Close privacy settings" data-consent-close>×</button>
        </div>
        <p>Necessary storage supports basic site functions and remembers this choice. Analytics and advertising are optional.</p>
        <div class="consent-choice">
          <div><strong>Necessary</strong><p>Required for privacy preferences and essential site operation.</p></div>
          <span class="consent-always-on">Always active</span>
        </div>
        <label class="consent-choice">
          <span><strong>Analytics</strong><p>Helps understand visits and site performance using tools such as Google Analytics.</p></span>
          <input type="checkbox" data-consent-analytics aria-label="Allow analytics">
        </label>
        <label class="consent-choice">
          <span><strong>Advertising</strong><p>Supports Google Ads measurement and, if enabled, advertising personalization.</p></span>
          <input type="checkbox" data-consent-advertising aria-label="Allow advertising">
        </label>
        <div class="consent-dialog-actions">
          <button class="button" type="button" data-consent-save>Save choices</button>
          <button class="button button-secondary" type="button" data-consent-dialog-accept>Accept all</button>
        </div>
        <p class="consent-dialog-footnote">You can change these choices at any time using “Cookie Settings” in the footer. See the <a href="privacy.html">Privacy Policy</a> for details.</p>
      </div>`;

    document.body.append(banner, dialog);

    const analytics = dialog.querySelector('[data-consent-analytics]');
    const advertising = dialog.querySelector('[data-consent-advertising]');

    function hideBanner() {
      banner.hidden = true;
      document.body.classList.remove('consent-banner-open');
    }

    function showBanner() {
      banner.hidden = false;
      document.body.classList.add('consent-banner-open');
    }

    function closeDialog() {
      if (typeof dialog.close === 'function' && dialog.open) dialog.close();
      else dialog.removeAttribute('open');
    }

    function openDialog() {
      const current = readPreferences() || { analytics: false, advertising: false };
      analytics.checked = current.analytics;
      advertising.checked = current.advertising;
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    }

    function commit(preferences) {
      savePreferences(preferences);
      hideBanner();
      closeDialog();
    }

    banner.querySelector('[data-consent-accept]').addEventListener('click', () => commit({ analytics: true, advertising: true }));
    banner.querySelector('[data-consent-reject]').addEventListener('click', () => commit({ analytics: false, advertising: false }));
    banner.querySelector('[data-consent-manage]').addEventListener('click', openDialog);
    dialog.querySelector('[data-consent-close]').addEventListener('click', closeDialog);
    dialog.querySelector('[data-consent-save]').addEventListener('click', () => commit({ analytics: analytics.checked, advertising: advertising.checked }));
    dialog.querySelector('[data-consent-dialog-accept]').addEventListener('click', () => commit({ analytics: true, advertising: true }));

    dialog.addEventListener('cancel', (event) => {
      event.preventDefault();
      closeDialog();
    });

    document.addEventListener('pristine:openconsent', openDialog);
    document.querySelectorAll('[data-consent-settings]').forEach((control) => {
      control.addEventListener('click', openDialog);
    });

    if (savedAtLoad) hideBanner();
    else showBanner();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountControls, { once: true });
  } else {
    mountControls();
  }
})();
