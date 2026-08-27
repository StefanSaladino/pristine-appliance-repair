const root = document.documentElement;
const body = document.body;
const header = document.querySelector('.site-header');
const toggle = document.querySelector('[data-menu-toggle]');
const mobileNav = document.querySelector('[data-mobile-nav]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Add the real business phone number here before launch, in international format.
// Example only: +14165551234
const BUSINESS_PHONE = '';

if (!reduceMotion && 'IntersectionObserver' in window) {
  root.classList.add('motion-ready');
}

// High-intent call controls fall back to the contact form until a verified
// business phone number is supplied. No placeholder or fake number is shipped.
const callLinks = [...document.querySelectorAll('[data-call-link]')];
if (BUSINESS_PHONE) {
  callLinks.forEach((link) => {
    link.href = `tel:${BUSINESS_PHONE}`;
  });
}

function setMenu(open) {
  if (!toggle || !mobileNav) return;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  mobileNav.classList.toggle('is-open', open);
  mobileNav.setAttribute('aria-hidden', String(!open));
  body.classList.toggle('menu-open', open);
}

if (toggle && mobileNav) {
  toggle.addEventListener('click', () => {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setMenu(false);
      toggle.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) setMenu(false);
  }, { passive: true });
}

function updateHeader() {
  if (header) header.classList.toggle('is-scrolled', window.scrollY > 10);
}
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const reveals = [...document.querySelectorAll('[data-reveal]')];
if (reduceMotion || !('IntersectionObserver' in window)) {
  reveals.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  reveals.forEach((item) => observer.observe(item));
}

// Subtle desktop-only depth on the hero photograph. It is intentionally small,
// input-driven, and disabled for reduced motion and coarse pointers.
const heroVisual = document.querySelector('[data-depth]');
const finePointer = window.matchMedia('(pointer: fine)').matches;
if (heroVisual && finePointer && !reduceMotion) {
  heroVisual.addEventListener('pointermove', (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * -8;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -6;
    heroVisual.style.setProperty('--px', `${x}px`);
    heroVisual.style.setProperty('--py', `${y}px`);
  });

  heroVisual.addEventListener('pointerleave', () => {
    heroVisual.style.setProperty('--px', '0px');
    heroVisual.style.setProperty('--py', '0px');
  });
}

// Netlify form success state without adding another routed page.
const params = new URLSearchParams(window.location.search);
if (params.get('sent') === '1') {
  const message = document.querySelector('[data-form-success]');
  if (message) {
    message.classList.add('is-visible');
    message.setAttribute('tabindex', '-1');
    message.focus({ preventScroll: true });
  }
}
