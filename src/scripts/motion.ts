/**
 * All page motion in one small module (~1 KB). Everything degrades to a
 * fully visible, static page without JS or with prefers-reduced-motion.
 */
const root = document.documentElement;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Hero entrance: wait for display fonts so lines don't reflow mid-animation
const start = () => requestAnimationFrame(() => root.classList.add('is-loaded'));
if (document.fonts?.ready) {
  Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 900))]).then(start);
} else start();

// Hero strike draws once, after the title has risen
document.querySelectorAll<HTMLElement>('[data-strike="load"]').forEach((el) => {
  const delay = reduced ? 0 : Number(el.dataset.delay ?? 1100);
  setTimeout(() => el.classList.add('is-struck'), delay);
});

if (reduced || !('IntersectionObserver' in window)) {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'));
  document.querySelectorAll('[data-strike="scroll"]').forEach((el) => el.classList.add('is-struck'));
} else {
  const reveal = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); reveal.unobserve(e.target); }
    }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  document.querySelectorAll('.reveal').forEach((el) => reveal.observe(el));

  // Strikes fire as each line crosses the middle band of the viewport
  const strike = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-struck'); strike.unobserve(e.target); }
    }),
    { rootMargin: '-38% 0px -38% 0px' },
  );
  document.querySelectorAll('[data-strike="scroll"]').forEach((el) => strike.observe(el));
}

// Navigation: current-section state + theme (ink/paper) under the bar
const nav = document.querySelector<HTMLElement>('[data-nav]');
const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];
const sections = [...document.querySelectorAll<HTMLElement>('main section[id]')];
if (nav && 'IntersectionObserver' in window) {
  const spy = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const id = e.target.id;
      links.forEach((a) => {
        if (a.hash === `#${id}`) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    }),
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((s) => spy.observe(s));
}

// Mobile menu
const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menu = document.querySelector<HTMLElement>('[data-menu]');
if (toggle && menu) {
  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('[data-menu-label]')!.textContent = open ? 'Close' : 'Menu';
    menu.hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) menu.querySelector<HTMLElement>('a')?.focus();
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
  });
  window.matchMedia('(min-width: 768px)').addEventListener('change', (m) => m.matches && setOpen(false));
}

// Review-mode badge: count + show/hide markers
const badge = document.querySelector<HTMLButtonElement>('[data-review-toggle]');
if (badge) {
  const n = document.querySelectorAll('[data-review], [data-review-block]').length;
  badge.querySelector('[data-review-count]')!.textContent = String(n);
  badge.addEventListener('click', () => {
    const on = root.classList.toggle('review-on');
    badge.setAttribute('aria-pressed', String(on));
  });
}
