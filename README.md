# Yash Ahuja — Space Portfolio

A single-page portfolio built with plain HTML/CSS/JS and Three.js — no
build step, no framework, deploys anywhere static files are served
(Vercel, Netlify, GitHub Pages).

## What's in it

- **Ambient starfield background** (`js/starfield.js`) — layered particles
  and nebula glow that respond to theme and mouse parallax.
- **Interactive orbital skills system** (`js/skills.js`) — a 3D
  constellation of your tech stack. Drag to rotate, click a node to see
  detail in the readout panel. Inner ring = core languages, mid ring =
  frameworks, outer ring = platforms/practice.
- **Mini rotating visuals per project card** (`js/projects3d.js`).
- **Astronaut in the hero** (`js/astronaut.js`) — a small procedural
  figure that floats beside your name. Suit is white in the light theme,
  coral/orange in the dark theme, so it always reads against the
  background.
- **Dark ("Night sky") and light ("Daylight nebula") themes**, toggled
  top-right, persisted in `localStorage`.
- Scroll-reveal animations, mobile nav, reduced-motion support.

Content — name, both internships, all four projects, skills, and
education — is pulled directly from `Yash_Ahuja_Resume.pdf`. The résumé
itself is bundled at `assets/Yash_Ahuja_Resume.pdf` and wired up to both
"Download résumé" buttons.

## Before you deploy — things marked `EDIT_ME`

Your résumé doesn't include a GitHub or LinkedIn URL as clickable text
(pypdf couldn't find embedded link annotations in the PDF either), so
those two are the only real gaps:

1. **`index.html`**
   - Contact section and every project's "Repository"/"Live" link are
     `href="#"` placeholders — point them at your actual repos and your
     GitHub / LinkedIn profile URLs.

2. **`js/skills.js`**
   - The `SKILLS` array at the top drives the whole 3D system. Add,
     remove, or re-categorize entries (`lang` / `frame` / `db` / `tool`)
     and the orbit rebuilds automatically.

## Running locally

Because this uses ES modules (`<script type="module">`), open it through
a local server rather than double-clicking the HTML file:

```bash
# any static server works, for example:
npx serve .
# or
python3 -m http.server 8080
```

Then visit the printed local URL.

## Deploying to Vercel

1. Push this folder to a GitHub repo.
2. Import the repo in Vercel — no build command needed, output directory
   is the project root (it's static).
3. Deploy.

## Notes on content

The bio, mission log, and two of the project cards are drawn from what
you've shared about GGSIPU, Sterco Digitex, and InningInsights — check
the wording matches how you'd actually describe the work before sending
this to a recruiter. Everything else is placeholder for you to fill in
with real links and specifics.
