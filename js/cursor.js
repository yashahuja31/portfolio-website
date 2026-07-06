/**
 * Custom cursor: a small solid dot tracks the pointer exactly, and a
 * larger ring trails behind it with easing. The ring expands over
 * interactive elements (links, buttons, cards) and steps aside — back
 * to the native cursor — over the two draggable 3D canvases, so the
 * browser's own grab/grabbing cursor still communicates "drag me" there.
 *
 * Only runs on fine-pointer (mouse/trackpad) devices; touchscreens keep
 * their native behaviour untouched.
 */
export function initCustomCursor() {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);
  document.body.classList.add('has-custom-cursor');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let shown = false;

  function show() {
    if (shown) return;
    shown = true;
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  }
  function hide() {
    shown = false;
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  }

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    show();
  }, { passive: true });

  window.addEventListener('mouseout', (e) => {
    if (!e.relatedTarget) hide();
  });

  const HOVER = 'a, button, .btn, .project-card, .about__card, input, textarea, select, .theme-toggle, .nav__burger, .sound-toggle';
  const DRAG = '#skills-canvas';

  document.addEventListener('mouseover', (e) => {
    const t = e.target;
    if (t.closest && t.closest(DRAG)) {
      ring.classList.add('cursor-ring--drag');
      ring.classList.remove('cursor-ring--hover');
    } else if (t.closest && t.closest(HOVER)) {
      ring.classList.add('cursor-ring--hover');
      ring.classList.remove('cursor-ring--drag');
    }
  });
  document.addEventListener('mouseout', (e) => {
    const t = e.target;
    if (t.closest && (t.closest(HOVER) || t.closest(DRAG))) {
      ring.classList.remove('cursor-ring--hover', 'cursor-ring--drag');
    }
  });

  window.addEventListener('pointerdown', (e) => {
    const t = e.target;
    if (t.closest && t.closest(DRAG)) ring.classList.add('cursor-ring--active');
  });
  window.addEventListener('pointerup', () => ring.classList.remove('cursor-ring--active'));

  function raf() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(raf);
  }
  raf();
}
