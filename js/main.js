import { initStarfield } from './starfield.js';
import { initSkills } from './skills.js';
import { initProjectVisuals } from './projects3d.js';
import { initAstronaut } from './astronaut.js';
import { initCustomCursor } from './cursor.js';
import { initContactForm } from './contact-form.js';
import { initProjectModal } from './project-modal.js';

initCustomCursor();
initContactForm();
initProjectModal();

/* ---------------- theme ---------------- */
const root = document.body;
const toggle = document.getElementById('theme-toggle');
const toggleLabel = document.getElementById('theme-toggle-label');
const stored = localStorage.getItem('yash-theme');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
let theme = stored || (prefersLight ? 'light' : 'dark');

let starfield;
let astronaut;

function applyTheme(t) {
  theme = t;
  root.setAttribute('data-theme', t);
  toggle.setAttribute('aria-pressed', String(t === 'light'));
  toggleLabel.textContent = t === 'light' ? 'Daylight nebula' : 'Night sky';
  localStorage.setItem('yash-theme', t);
  starfield && starfield.setTheme(t);
  astronaut && astronaut.setTheme(t);
}
applyTheme(theme);

toggle.addEventListener('click', () => applyTheme(theme === 'dark' ? 'light' : 'dark'));

/* ---------------- mobile nav ---------------- */
const burger = document.getElementById('nav-burger');
const mobileNav = document.getElementById('nav-mobile');
burger.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(open));
});
mobileNav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
}));

/* ---------------- scroll cue ---------------- */
document.getElementById('scroll-cue').addEventListener('click', () => {
  document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});

/* ---------------- footer year ---------------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------------- scroll reveal ---------------- */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach((el) => io.observe(el));

/* ---------------- three.js: background starfield ---------------- */
starfield = initStarfield(document.getElementById('bg-canvas'));
starfield.setTheme(theme);

/* ---------------- three.js: skills orbital system ---------------- */
const readout = document.getElementById('skills-readout');
initSkills(document.getElementById('skills-canvas'), {
  onSelect(skill) {
    const catLabel = {
      lang: 'Language', frame: 'Framework / library',
      db: 'Database', tool: 'Tool / concept',
    }[skill.cat];
    readout.innerHTML = `
      <p class="skills__readout-cat">${catLabel}</p>
      <h3 class="skills__readout-name">${skill.name}</h3>
      <p class="skills__readout-hint">${skill.desc}</p>
    `;
  },
});

/* ---------------- three.js: project card visuals ---------------- */
initProjectVisuals();

/* ---------------- three.js: hero astronaut ---------------- */
const astronautStatus = document.getElementById('astronaut-status');
astronaut = initAstronaut(document.getElementById('astronaut-canvas'), astronautStatus);
astronaut.setTheme(theme);
