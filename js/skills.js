import * as THREE from 'three';

const SKILLS = [
  // ---- languages (innermost ring) ----
  { name: 'C#', cat: 'lang', ring: 0, desc: 'Primary language for full-stack and .NET service work.' },
  { name: 'JavaScript', cat: 'lang', ring: 0, desc: 'Frontend logic and Node-based tooling.' },
  { name: 'TypeScript', cat: 'lang', ring: 0, desc: 'Typed JavaScript for larger, safer codebases.' },
  { name: 'Python', cat: 'lang', ring: 0, desc: 'Data pipelines and modelling for InningInsights.' },
  { name: 'Java', cat: 'lang', ring: 0, desc: 'Coursework, DSA practice, and interview prep.' },
  { name: 'C++', cat: 'lang', ring: 0, desc: 'Core DSA and systems coursework.' },
  { name: 'Golang', cat: 'lang', ring: 0, desc: 'Exploring for lightweight, concurrent services.' },

  // ---- frameworks (2nd ring) ----
  { name: '.NET', cat: 'frame', ring: 1, desc: 'Backend services and MVC apps — Sterco Digitex internship.' },
  { name: 'React.js', cat: 'frame', ring: 1, desc: 'Component-driven interfaces for web platforms.' },
  { name: 'Next.js', cat: 'frame', ring: 1, desc: 'Full-stack React framework behind InningInsights.' },
  { name: 'Node.js', cat: 'frame', ring: 1, desc: 'API and service layer across MERN projects.' },
  { name: 'Express.js', cat: 'frame', ring: 1, desc: 'REST APIs for ReaderReviews Hub and InningInsights.' },
  { name: 'Tailwind CSS', cat: 'frame', ring: 1, desc: 'Utility-first styling — used across Chessy and more.' },

  // ---- databases (3rd ring) ----
  { name: 'MS SQL Server', cat: 'db', ring: 2, desc: 'Production schema design and query optimization.' },
  { name: 'PostgreSQL', cat: 'db', ring: 2, desc: 'Relational store behind InningInsights.' },
  { name: 'MongoDB', cat: 'db', ring: 2, desc: 'Document store for ReaderReviews Hub.' },
  { name: 'MySQL', cat: 'db', ring: 2, desc: 'Relational database coursework and side projects.' },

  // ---- tools & concepts (outer ring) ----
  { name: 'Git / GitHub', cat: 'tool', ring: 3, desc: 'Version control and branching workflows on every team.' },
  { name: 'Docker', cat: 'tool', ring: 3, desc: 'Containerised deployment for InningInsights.' },
  { name: 'REST APIs', cat: 'tool', ring: 3, desc: 'Designing and consuming service interfaces.' },
  { name: 'MVC', cat: 'tool', ring: 3, desc: 'Architecture behind the College Data Management System.' },
  { name: 'JWT Auth', cat: 'tool', ring: 3, desc: 'Secure auth across InningInsights and ReaderReviews Hub.' },
  { name: 'CI/CD', cat: 'tool', ring: 3, desc: 'Automated pipelines for reliable deployment.' },
  { name: 'DSA', cat: 'tool', ring: 3, desc: 'Ongoing interview-prep focus.' },
];

const CAT_COLOR = { lang: 0xff7a5c, frame: 0xa89bff, db: 0x5eead4, tool: 0xffd166 };
const RING_RADIUS = [1.75, 2.85, 3.95, 5.05];
const RING_SPEED = [0.055, -0.04, 0.03, -0.022];

export function initSkills(canvas, { onSelect } = {}) {
  const parent = canvas.parentElement;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 3.4, 10.4);
  camera.lookAt(0, 0, 0);

  // ---- core sun ----
  const coreGeo = new THREE.IcosahedronGeometry(0.85, 2);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0xffffff, emissive: 0xff7a5c, emissiveIntensity: 0.9,
    roughness: 0.3, metalness: 0.1,
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  scene.add(core);

  const coreGlow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: radialTexture(0xff7a5c), transparent: true, opacity: 0.7, depthWrite: false,
  }));
  coreGlow.scale.set(4.5, 4.5, 1);
  scene.add(coreGlow);

  // ---- lights ----
  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const pt = new THREE.PointLight(0xffffff, 1.4, 30);
  pt.position.set(4, 5, 6);
  scene.add(pt);

  // ---- orbit rings (visual guides) ----
  const orbitGroup = new THREE.Group();
  scene.add(orbitGroup);

  RING_RADIUS.forEach((r) => {
    const ringGeo = new THREE.RingGeometry(r - 0.006, r + 0.006, 128);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffffff, transparent: true, opacity: 0.08, side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    orbitGroup.add(ring);
  });

  // ---- nodes ----
  const nodeMeshes = [];
  const ringCounts = [0, 0, 0, 0];
  SKILLS.forEach((s) => { ringCounts[s.ring]++; });
  const ringSeen = [0, 0, 0, 0];

  SKILLS.forEach((skill) => {
    const idx = ringSeen[skill.ring]++;
    const total = ringCounts[skill.ring];
    const angle = (idx / total) * Math.PI * 2 + skill.ring * 0.4;
    const radius = RING_RADIUS[skill.ring];

    const geo = new THREE.SphereGeometry(0.15, 24, 24);
    const mat = new THREE.MeshStandardMaterial({
      color: CAT_COLOR[skill.cat],
      emissive: CAT_COLOR[skill.cat],
      emissiveIntensity: 0.5,
      roughness: 0.4,
    });
    const node = new THREE.Mesh(geo, mat);
    node.userData = { skill, angle, radius, baseY: (Math.random() - 0.5) * 0.6 };
    node.position.set(Math.cos(angle) * radius, node.userData.baseY, Math.sin(angle) * radius);
    orbitGroup.add(node);
    nodeMeshes.push(node);

    // label sprite — dark pill backdrop so text stays legible on
    // both the dark AND light theme background, since the sprite
    // itself does not change color when the page theme changes
    const label = makeLabelSprite(skill.name);
    label.position.set(0, 0.32, 0);
    node.add(label);
  });

  function makeLabelSprite(text) {
    const c = document.createElement('canvas');
    const scale = 2;
    const w = 260, h = 60;
    c.width = w * scale; c.height = h * scale;
    const ctx = c.getContext('2d');
    ctx.scale(scale, scale);
    ctx.font = '600 21px "Space Grotesk", sans-serif';
    const textWidth = ctx.measureText(text).width;
    const padX = 16;
    const pillW = Math.min(w - 6, textWidth + padX * 2);
    const pillH = 30;
    const pillX = (w - pillW) / 2;
    const pillY = (h - pillH) / 2;

    roundRectPath(ctx, pillX, pillY, pillW, pillH, 15);
    ctx.fillStyle = 'rgba(6, 8, 20, 0.72)';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255,255,255,0.16)';
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#f5f4ff';
    ctx.fillText(text, w / 2, h / 2 + 1);

    const tex = new THREE.CanvasTexture(c);
    tex.minFilter = THREE.LinearFilter;
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(1.55, (h / w) * 1.55, 1);
    return sprite;
  }

  function roundRectPath(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function radialTexture(hexColor) {
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const ctx = c.getContext('2d');
    const grd = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    const col = new THREE.Color(hexColor);
    grd.addColorStop(0, `rgba(${col.r * 255},${col.g * 255},${col.b * 255},0.8)`);
    grd.addColorStop(1, `rgba(${col.r * 255},${col.g * 255},${col.b * 255},0)`);
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(c);
  }

  // ---- interaction: drag to rotate, click/tap to select ----
  let isDragging = false, lastX = 0, lastY = 0, movedDist = 0;
  let velX = 0, velY = 0;
  let userRotX = 0.15, userRotY = 0;

  function pointerDown(x, y) {
    isDragging = true; lastX = x; lastY = y; movedDist = 0;
  }
  function pointerMove(x, y) {
    if (!isDragging) return;
    const dx = x - lastX, dy = y - lastY;
    movedDist += Math.abs(dx) + Math.abs(dy);
    velY = dx * 0.005;
    velX = dy * 0.003;
    userRotY += velY;
    userRotX = Math.max(-0.9, Math.min(0.9, userRotX + velX));
    lastX = x; lastY = y;
  }
  function pointerUp(x, y) {
    isDragging = false;
    if (movedDist < 6) handleSelect(x, y);
  }

  canvas.addEventListener('pointerdown', (e) => { pointerDown(e.clientX, e.clientY); canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointermove', (e) => pointerMove(e.clientX, e.clientY));
  canvas.addEventListener('pointerup', (e) => pointerUp(e.clientX, e.clientY));
  canvas.addEventListener('pointerleave', () => { isDragging = false; });

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let selected = null;

  function handleSelect(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(nodeMeshes, false);
    if (hits.length) {
      if (selected) selected.scale.setScalar(1);
      selected = hits[0].object;
      selected.scale.setScalar(1.6);
      onSelect && onSelect(selected.userData.skill);
    }
  }

  function resize() {
    const w = parent.clientWidth, h = parent.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(parent);
  resize();

  const clock = new THREE.Clock();
  function animate() {
    const t = clock.getElapsedTime();
    const dt = clock.getDelta();

    if (!isDragging) {
      userRotY += 0.0022; // gentle auto-rotate when idle
      velX *= 0.9; velY *= 0.9;
    }

    orbitGroup.rotation.y = userRotY;
    orbitGroup.rotation.x = userRotX;

    core.rotation.y += 0.4 * dt;
    core.rotation.x += 0.15 * dt;

    nodeMeshes.forEach((n) => {
      const ud = n.userData;
      const speed = RING_SPEED[ud.skill.ring];
      ud.angle += speed * dt;
      n.position.x = Math.cos(ud.angle) * ud.radius;
      n.position.z = Math.sin(ud.angle) * ud.radius;
      n.position.y = ud.baseY + Math.sin(t * 0.6 + ud.angle) * 0.12;
      n.children[0].quaternion.copy(camera.quaternion);
    });

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();

  return { dispose() { ro.disconnect(); } };
}
