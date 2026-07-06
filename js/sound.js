/**
 * Small, synthesized UI sounds — no audio files to ship or load.
 * Off by default (most people opening a portfolio tab don't want
 * surprise audio); toggled via #sound-toggle in the nav, remembered
 * in localStorage.
 *
 * Other modules don't need to import this file to trigger a sound —
 * they dispatch a `document.dispatchEvent(new CustomEvent('sfx', {
 * detail: 'open' }))` and this module listens globally, so the audio
 * layer stays decoupled from the rest of the app.
 */
export function initSound() {
  const toggle = document.getElementById('sound-toggle');
  if (!toggle) return;

  let enabled = localStorage.getItem('yash-sound') === 'on';
  let ctx = null;

  function setEnabled(v) {
    enabled = v;
    localStorage.setItem('yash-sound', v ? 'on' : 'off');
    toggle.setAttribute('aria-pressed', String(v));
    toggle.classList.toggle('is-on', v);
  }
  setEnabled(enabled);

  function ensureCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function tone({ freq, start = 0, dur = 0.09, type = 'sine', peak = 0.05 }) {
    const c = ensureCtx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    const t0 = c.currentTime + start;
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(peak, t0 + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain).connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  const SOUNDS = {
    click: () => tone({ freq: 620, dur: 0.07, type: 'sine', peak: 0.045 }),
    toggle: () => {
      tone({ freq: 480, dur: 0.06, peak: 0.05 });
      tone({ freq: 720, start: 0.05, dur: 0.08, peak: 0.045 });
    },
    open: () => {
      tone({ freq: 420, dur: 0.09, peak: 0.04 });
      tone({ freq: 640, start: 0.06, dur: 0.12, peak: 0.045 });
      tone({ freq: 900, start: 0.12, dur: 0.14, peak: 0.035 });
    },
    close: () => {
      tone({ freq: 700, dur: 0.08, peak: 0.04 });
      tone({ freq: 420, start: 0.05, dur: 0.1, peak: 0.035 });
    },
    submit: () => {
      tone({ freq: 523.25, dur: 0.1, peak: 0.045 });
      tone({ freq: 659.25, start: 0.08, dur: 0.1, peak: 0.045 });
      tone({ freq: 783.99, start: 0.16, dur: 0.16, peak: 0.045 });
    },
    select: () => tone({ freq: 880, dur: 0.06, type: 'triangle', peak: 0.04 }),
  };

  document.addEventListener('sfx', (e) => {
    if (!enabled) return;
    const fn = SOUNDS[e.detail];
    if (fn) fn();
  });

  // generic soft click on the usual interactive elements
  const CLICKABLE = 'a, button, .project-card, .contact__switch-btn';
  document.addEventListener('click', (e) => {
    if (!enabled) return;
    const t = e.target;
    if (t.closest && t.closest(CLICKABLE) && t.closest('#sound-toggle') === null) {
      SOUNDS.click();
    }
  });

  toggle.addEventListener('click', () => {
    ensureCtx();
    setEnabled(!enabled);
    if (!enabled) return;
    SOUNDS.toggle();
  });
}
