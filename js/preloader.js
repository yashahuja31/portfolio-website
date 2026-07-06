/**
 * A short boot-sequence preloader. Progress is simulated (there's no
 * single "download" to track — Three.js, fonts, and the astronaut
 * model all load independently) but eases toward 90% immediately and
 * completes once the page's declared resources have loaded, with a
 * minimum display time so it never just flashes on a fast connection.
 *
 * The astronaut model itself (~2MB) often keeps loading a moment after
 * this preloader clears — that's fine, it has its own small "Loading
 * model…" label in the hero for that last stretch.
 */
export function initPreloader() {
  const el = document.getElementById('preloader');
  if (!el) return;
  const bar = document.getElementById('preloader-bar');
  const pctEl = document.getElementById('preloader-pct');
  const statusEl = document.getElementById('preloader-status');

  const messages = [
    'Calibrating trajectory…',
    'Charting stars…',
    'Pressurizing cabin…',
    'Syncing telemetry…',
  ];
  let msgIndex = 0;
  const msgTimer = setInterval(() => {
    msgIndex = (msgIndex + 1) % messages.length;
    statusEl.textContent = messages[msgIndex];
  }, 900);

  document.body.classList.add('preload-lock');

  const start = performance.now();
  const MIN_MS = 1100;
  let progress = 0;
  let rafId;

  function render(p) {
    pctEl.textContent = `${Math.round(p)}%`;
    bar.style.width = `${p}%`;
  }

  function tick() {
    progress += (90 - progress) * 0.045 + 0.12;
    if (progress > 90) progress = 90;
    render(progress);
    if (progress < 90) rafId = requestAnimationFrame(tick);
  }
  rafId = requestAnimationFrame(tick);

  function finish() {
    cancelAnimationFrame(rafId);
    const elapsed = performance.now() - start;
    const wait = Math.max(0, MIN_MS - elapsed);
    setTimeout(() => {
      const runUp = setInterval(() => {
        progress += (100 - progress) * 0.25 + 1.5;
        if (progress >= 100) progress = 100;
        render(progress);
        if (progress >= 100) {
          clearInterval(runUp);
          clearInterval(msgTimer);
          statusEl.textContent = 'Go for launch';
          setTimeout(hide, 260);
        }
      }, 16);
    }, wait);
  }

  function hide() {
    el.classList.add('is-hidden');
    document.body.classList.remove('preload-lock');
    setTimeout(() => el.remove(), 700);
  }

  if (document.readyState === 'complete') {
    finish();
  } else {
    window.addEventListener('load', finish, { once: true });
  }
}
