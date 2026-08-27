# Pristine Appliance Repair — Redesign Draft 3

A mobile-first static redesign for Pristine Appliance Repair.

## Routes

- `/` — Home
- `/dryer-repair.html` — Dryer Repair
- `/dishwasher-repair.html` — Dishwasher Repair
- `/contact.html` — Contact / repair request form

## Design direction

- Mobile-first responsive layout
- Near-black / charcoal / copper brand palette
- Editorial sections, lists, and dividers instead of card walls
- Minimal borders, restrained radii, and no glassmorphism or decorative SaaS UI
- No fake reviews, fake pricing, fake phone numbers, or unsupported service claims
- Purposeful reveal, menu, hero-mask, and subtle pointer-depth motion with `prefers-reduced-motion` support
- Mobile-only floating Call Now control with iPhone safe-area spacing

## High-intent phone CTA

`Call Now` is the primary action throughout the site. Every call control is marked with `data-call-link` and is wired through one verified value in `assets/js/site.js`:

```js
const BUSINESS_PHONE = '';
```

Before launch, set that constant to the real business phone number in international format, for example `+14165551234`. Until a verified number is supplied, the controls safely fall back to the repair-request form. No placeholder or fabricated phone number is shipped.

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

The form is configured for Netlify Forms using `data-netlify="true"`. It redirects back to the contact page with a local success state, so no fifth routed page is required.

## Photography

The site uses clean real residential photography served responsively from Unsplash. The images are intentionally appliance/interior focused rather than using stock models presented as Pristine technicians.

- Homepage hero — Lisa Anna: https://unsplash.com/photos/a-laundry-room-with-a-washer-and-dryer-49NwSDtEsuw
- Dryer / laundry image — Alex Tyson: https://unsplash.com/photos/a-laundry-room-with-a-washer-and-dryer-RoY_VRBcZxo
- Dishwasher / kitchen image — Alex Tyson: https://unsplash.com/photos/a-kitchen-with-a-stove-dishwasher-and-sink-ewDVicUjeCQ

The source pages identify these photos as free to use under the Unsplash License. Image requests use the Unsplash responsive image CDN with width-specific `srcset` values.

## Before production launch

Confirm the final domain and add the verified business phone number. Also confirm any business hours, service guarantees, supported brands, pricing/service-call policy, and real customer reviews before adding those claims to visible copy or structured data.
