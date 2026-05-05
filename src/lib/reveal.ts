const SELECTOR = '[data-reveal]';

function setRevealed(el: Element) {
  el.setAttribute('data-revealed', 'true');
}

function init() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = document.querySelectorAll(SELECTOR);

  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach(setRevealed);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setRevealed(entry.target);
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
  );

  targets.forEach((el) => observer.observe(el));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
