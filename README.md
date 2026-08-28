# Pristine Appliance Repair — Redesign V3.3

A mobile-first static redesign for Pristine Appliance Repair.

## Routes

- `/` — Home
- `/dryer-repair.html` — Washer & Dryer Repair
- `/dishwasher-repair.html` — Dishwasher Repair
- `/stove-repair.html` — Stove Repair
- `/contact.html` — Contact / repair request form
- `/privacy.html` — Privacy policy and consent controls

## Design direction

- Mobile-first responsive layout
- Near-black / charcoal / copper brand palette
- Editorial sections, lists, and dividers instead of card walls
- Minimal borders, restrained radii, and no glassmorphism or decorative SaaS UI
- No fake reviews, fake pricing, fake phone numbers, or unsupported service claims
- Purposeful reveal, menu, hero-mask, and subtle pointer-depth motion with `prefers-reduced-motion` support
- Mobile-only floating Call Now control with iPhone safe-area spacing

## High-intent phone CTA

`Call Now` remains the primary action throughout the site. Every call control is marked with `data-call-link`. The current `main` branch wires those controls through the verified business number in `assets/js/site.js`, and the V3.3 privacy update leaves that phone configuration untouched.

## Responsive / visual contract

- The layout is authored mobile-first and expands at 480, 640, 768, and 1024px breakpoints.
- Process rows use a dedicated number column plus a full-width text column on phones, then a three-column number/title/body layout on larger screens. This prevents the previous compressed “What to expect” copy.
- Service and problem photography uses a 3:2 container to match the selected landscape source images.
- The homepage hero uses a portrait-oriented appliance image and a dedicated 4:5 mobile frame, avoiding aggressive landscape-to-portrait cropping.
- Grid children use `min-width: 0`, page overflow is clipped, and form fields are allowed to shrink without forcing horizontal overflow.

## SEO / AI discovery

- Unique page titles and meta descriptions
- Canonical and `hreflang` tags
- Open Graph and Twitter metadata with image alt text
- JSON-LD for WebSite, LocalBusiness/HomeAndConstructionBusiness, Service, WebPage/ContactPage, BreadcrumbList, and visible FAQs
- `robots.txt`
- `sitemap.xml`
- `llms.txt`
- Semantic headings and visible service-area/service-problem content
- Search and AI crawlers do not depend on client-side rendering to access core page copy

## Contact form

The form is configured for Netlify Forms using `data-netlify="true"`. It redirects back to the contact page with a local success state, so no separate thank-you route is required.

## Photography

The site uses clean real residential photography served responsively from Unsplash. The images are intentionally appliance/interior focused rather than using stock models presented as Pristine technicians.

- Homepage hero — Lisa Anna: https://unsplash.com/photos/a-laundry-room-with-a-washer-and-dryer-49NwSDtEsuw
- Washer / laundry image — Lisa Anna: https://unsplash.com/photos/a-laundry-room-with-a-washer-and-dryer-rdRMAW3qTo8
- Dryer / laundry image — Alex Tyson: https://unsplash.com/photos/a-laundry-room-with-a-washer-and-dryer-RoY_VRBcZxo
- Dishwasher / kitchen image — Alex Tyson: https://unsplash.com/photos/a-kitchen-with-a-stove-dishwasher-and-sink-ewDVicUjeCQ
- Stove / kitchen image — Alex Tyson: https://unsplash.com/photos/a-kitchen-with-a-stove-top-oven-next-to-a-refrigerator-D0ixlSmCWQQ

The source pages identify these photos as free to use under the Unsplash License. Image requests use the Unsplash responsive image CDN with width-specific `srcset` values.

## Before production launch

Confirm the final domain. Also confirm any business hours, service guarantees, supported brands, pricing/service-call policy, and real customer reviews before adding those claims to visible copy or structured data.

## Social preview cards

Each public route has a dedicated **1200 × 630 PNG** social preview image, sized for Open Graph previews and X/Twitter `summary_large_image` cards:

- `/assets/images/og-home.png` — Home
- `/assets/images/og-dryer-repair.png` — Washer & Dryer Repair
- `/assets/images/og-stove-repair.png` — Stove Repair
- `/assets/images/og-dishwasher-repair.png` — Dishwasher Repair
- `/assets/images/og-contact.png` — Contact

Each page includes page-specific `og:image`, `og:image:secure_url`, `og:image:type`, `og:image:width`, `og:image:height`, `og:image:alt`, `twitter:image`, and `twitter:image:alt` metadata. No social account handles are declared because none have been verified.

## Privacy and consent

- `/privacy.html` explains repair-request data, website/device information, Google Analytics, Google Ads, cookies/local storage, service providers, retention, and privacy choices.
- `assets/js/consent.js` sets conservative Google Consent Mode v2 defaults before any future Google tag: `analytics_storage`, `ad_storage`, `ad_user_data`, and `ad_personalization` default to `denied`.
- Visitors can Accept all, Reject non-essential, or separately choose Analytics and Advertising.
- Choices are stored in `localStorage` under `pristine-consent-v1` and can be reopened using the footer’s Cookie Settings control.
- Keep `assets/js/consent.js` before any future Google Analytics, Google Ads, or Google Tag Manager snippet in `<head>`.
- The consent UI is not a substitute for legal review. Confirm the final data flows, Google tag configuration, retention settings, and business contact/privacy details before production advertising begins.
