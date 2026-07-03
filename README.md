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
- **Astronaut in the hero** (`js/astronaut.js`) — your real Sketchfab/Meshy
  astronaut model (`assets/astronaut.glb`), fully drag-to-rotate on both
  axes, auto-rotating gently when idle. Suit is **orange in the light
  theme**, **white in the dark theme**.
- **Dark ("Night sky") and light ("Daylight nebula") themes**, toggled
  top-right, persisted in `localStorage`.
- Scroll-reveal animations, mobile nav, reduced-motion support.

Content — name, both internships, all four projects, skills, and
education — is pulled directly from `Yash_Ahuja_Resume.pdf`. The résumé
itself is bundled at `assets/Yash_Ahuja_Resume.pdf` and wired up to both
"Download résumé" buttons.

## About the astronaut model

Your uploaded `.glb` was 28 MB — mostly raw, ultra-dense scan geometry
(six mesh chunks, ~330k vertices total) plus three 1024×1024 textures.
That's fine for Sketchfab but would badly stall a portfolio's first
paint. I re-processed it with `gltf-transform` (simplify + weld + quantize
+ WebP textures) down to **`assets/astronaut.glb` at ~2.2 MB**, keeping
it a single mesh/material so the drag-rotate and tinting still work the
same way. If you want higher fidelity and don't mind the extra weight,
regenerate with a gentler simplification ratio:

```bash
npx @gltf-transform/cli optimize spaceman_original.glb assets/astronaut.glb \
  --compress quantize --simplify true --simplify-ratio 0.25 \
  --simplify-error 0.0006 --texture-compress webp --texture-size 1024 --join true
```

The model has a single baked material shared across the whole mesh
(helmet, suit, backpack), so the theme swap works by tinting that one
material rather than isolating "just the suit" — bright fabric areas
pick up the color strongly, dark visor/backpack areas barely shift.
I haven't been able to render/preview the model myself in this
environment, so if it loads facing an odd direction, adjust the initial
rotation in `js/astronaut.js` (search for `rig.rotation`).

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
