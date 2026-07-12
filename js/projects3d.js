import * as THREE from 'three';

const ACCENTS = {
  inninginsights: 0xff7a5c,
  'college-dms': 0xa89bff,
  readerreviews: 0x5eead4,
  chessy: 0xffd166,
  pathwave: 0xff9ecf,
  sitetalk: 0x6cc4ff,
  stockai: 0x4ade80,
  shiftwork: 0xff5c7a,
  optivault: 0x60d394,
};

export function initProjectVisuals() {
  document.querySelectorAll('.project-card').forEach((card) => {
    const canvas = card.querySelector('.project-card__viz canvas');
    if (!canvas) return;
    const viz = card.dataset.viz || 'orbit';
    const color = ACCENTS[card.dataset.project] || 0xff7a5c;
    mountScene(canvas, viz, color);
  });
}

function mountScene(canvas, viz, color) {
  const parent = canvas.parentElement;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 20);
  camera.position.set(0, 0, 3.6);

  const builders = { orbit, checkerboard, particles, torusknot, globe, chat, candles, ecg, vault };
  const build = builders[viz] || orbit;
  const update = build(scene, color);

  function resize() {
    const w = parent.clientWidth, h = parent.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(parent);
  resize();

  let paused = false;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { paused = !e.isIntersecting; });
  }, { threshold: 0.05 });
  io.observe(canvas);

  const clock = new THREE.Clock();
  function animate() {
    if (!paused) {
      const dt = clock.getDelta();
      const t = clock.getElapsedTime();
      update(dt, t);
      renderer.render(scene, camera);
    } else {
      clock.getDelta();
    }
    requestAnimationFrame(animate);
  }
  animate();
}

/* ---------------------------------------------------------
   1. ORBIT — a wireframe icosahedron core with a small satellite
      looping around it (InningInsights: model + live inference loop)
   --------------------------------------------------------- */
function orbit(scene, color) {
  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.72, 0),
    new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.85 })
  );
  scene.add(core);

  const satellite = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  scene.add(satellite);

  const ringGeo = new THREE.RingGeometry(1.15, 1.16, 64);
  const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.18, side: THREE.DoubleSide }));
  ring.rotation.x = Math.PI / 2.3;
  scene.add(ring);

  addStars(scene);

  return (dt, t) => {
    core.rotation.x += dt * 0.25;
    core.rotation.y += dt * 0.35;
    satellite.position.set(Math.cos(t * 1.1) * 1.15, Math.sin(t * 0.6) * 0.25, Math.sin(t * 1.1) * 1.15);
    ring.rotation.z += dt * 0.1;
  };
}

/* ---------------------------------------------------------
   2. CHECKERBOARD — small alternating grid with one "record" tile
      pulsing (College Data Management System: rows/records, CRUD)
   --------------------------------------------------------- */
function checkerboard(scene, color) {
  const group = new THREE.Group();
  scene.add(group);
  const size = 5;
  const tileGeo = new THREE.BoxGeometry(0.34, 0.34, 0.06);
  const tiles = [];
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const isAccent = (x + y) % 2 === 0;
      const mat = new THREE.MeshBasicMaterial({
        color: isAccent ? color : 0xffffff,
        transparent: true,
        opacity: isAccent ? 0.55 : 0.08,
      });
      const tile = new THREE.Mesh(tileGeo, mat);
      tile.position.set((x - (size - 1) / 2) * 0.4, (y - (size - 1) / 2) * 0.4, 0);
      tile.userData.phase = Math.random() * Math.PI * 2;
      tiles.push(tile);
      group.add(tile);
    }
  }
  group.rotation.x = -0.5;
  group.rotation.z = 0.15;

  addStars(scene);

  return (dt, t) => {
    group.rotation.y = Math.sin(t * 0.25) * 0.25;
    tiles.forEach((tile) => {
      tile.position.z = Math.sin(t * 0.8 + tile.userData.phase) * 0.12;
    });
  };
}

/* ---------------------------------------------------------
   3. PARTICLES — a sphere built from points, like aggregated
      reviews/ratings clustering into a whole (ReaderReviews Hub)
   --------------------------------------------------------- */
function particles(scene, color) {
  const count = 260;
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // fibonacci sphere distribution
    const y = 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    positions[i * 3] = x * 0.95;
    positions[i * 3 + 1] = y * 0.95;
    positions[i * 3 + 2] = z * 0.95;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({ color, size: 0.05, transparent: true, opacity: 0.85 });
  const cloud = new THREE.Points(geo, mat);
  scene.add(cloud);

  const inner = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.4, 1),
    new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.25 })
  );
  scene.add(inner);

  addStars(scene);

  return (dt, t) => {
    cloud.rotation.y += dt * 0.18;
    cloud.rotation.x = Math.sin(t * 0.2) * 0.2;
    inner.rotation.y -= dt * 0.3;
  };
}

/* ---------------------------------------------------------
   4. TORUS KNOT — a tangled, looping knot (Chessy: real-time
      multiplayer state weaving between two players)
   --------------------------------------------------------- */
function torusknot(scene, color) {
  const geo = new THREE.TorusKnotGeometry(0.55, 0.16, 120, 16);
  const mat = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.85 });
  const knot = new THREE.Mesh(geo, mat);
  scene.add(knot);

  const glow = new THREE.Mesh(geo.clone(), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.06 }));
  glow.scale.setScalar(1.35);
  scene.add(glow);

  addStars(scene);

  return (dt) => {
    knot.rotation.x += dt * 0.3;
    knot.rotation.y += dt * 0.22;
    glow.rotation.copy(knot.rotation);
  };
}

/* ---------------------------------------------------------
   5. GLOBE — a wireframe globe with a comet travelling an orbit
      path (PathWave: routes between a student and a destination)
   --------------------------------------------------------- */
function globe(scene, color) {
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.68, 20, 14),
    new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.55 })
  );
  scene.add(sphere);

  const pathGeo = new THREE.TorusGeometry(1.05, 0.006, 8, 96);
  const path = new THREE.Mesh(pathGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35 }));
  path.rotation.x = Math.PI / 2.4;
  scene.add(path);

  const comet = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  scene.add(comet);

  addStars(scene);

  return (dt, t) => {
    sphere.rotation.y += dt * 0.15;
    const angle = t * 0.8;
    const r = 1.05;
    const x = Math.cos(angle) * r;
    const z0 = Math.sin(angle) * r;
    // apply the same tilt as the path torus
    const tilt = Math.PI / 2.4;
    comet.position.set(x, Math.sin(tilt) * z0 * -1, Math.cos(tilt) * z0);
  };
}

/* ---------------------------------------------------------
   6. CHAT — two nodes ping-ponging a message pulse between them,
      with a small voice-waveform bar underneath (SiteTalk: real-time
      site-specific chat, text + voice)
   --------------------------------------------------------- */
function chat(scene, color) {
  const nodeGeo = new THREE.SphereGeometry(0.16, 20, 20);
  const nodeMatA = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 });
  const nodeMatB = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 });
  const nodeA = new THREE.Mesh(nodeGeo, nodeMatA);
  const nodeB = new THREE.Mesh(nodeGeo, nodeMatB);
  nodeA.position.set(-0.85, 0.15, 0);
  nodeB.position.set(0.85, -0.1, 0);
  scene.add(nodeA, nodeB);

  const lineGeo = new THREE.BufferGeometry().setFromPoints([nodeA.position, nodeB.position]);
  const line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.25 }));
  scene.add(line);

  const pulse = new THREE.Mesh(
    new THREE.SphereGeometry(0.07, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  scene.add(pulse);

  // small waveform bars beneath, like a voice message
  const bars = [];
  const barCount = 9;
  for (let i = 0; i < barCount; i++) {
    const bar = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.2, 0.05),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.55 })
    );
    bar.position.set((i - (barCount - 1) / 2) * 0.13, -0.75, 0);
    bar.userData.phase = Math.random() * Math.PI * 2;
    bars.push(bar);
    scene.add(bar);
  }

  addStars(scene);

  return (dt, t) => {
    const cycle = (Math.sin(t * 0.9) + 1) / 2; // 0..1 ping-pong
    pulse.position.lerpVectors(nodeA.position, nodeB.position, cycle);
    pulse.position.y += Math.sin(cycle * Math.PI) * 0.25;
    nodeA.scale.setScalar(1 + Math.sin(t * 3) * 0.04);
    nodeB.scale.setScalar(1 + Math.cos(t * 3) * 0.04);
    bars.forEach((bar) => {
      const h = 0.12 + Math.abs(Math.sin(t * 2.4 + bar.userData.phase)) * 0.32;
      bar.scale.y = h / 0.2;
    });
  };
}

/* ---------------------------------------------------------
   7. CANDLES — a small candlestick chart cluster, gently
      rotating, with a marker riding the implied trend
      (StockAI: ensemble trading model, walk-forward backtest)
   --------------------------------------------------------- */
function candles(scene, color) {
  const group = new THREE.Group();
  scene.add(group);

  const count = 11;
  const bars = [];
  const downColor = 0xff5c5c;
  let cursor = 0;
  for (let i = 0; i < count; i++) {
    const height = 0.25 + Math.random() * 0.85;
    const up = Math.random() > 0.42;
    const geo = new THREE.BoxGeometry(0.16, height, 0.16);
    const mat = new THREE.MeshBasicMaterial({ color: up ? color : downColor, transparent: true, opacity: 0.88 });
    const bar = new THREE.Mesh(geo, mat);
    const x = (i - (count - 1) / 2) * 0.26;
    bar.position.set(x, -0.9 + height / 2, 0);
    group.add(bar);
    bars.push({ mesh: bar, baseHeight: height, up, x });
    cursor = Math.max(cursor, -0.9 + height);
  }

  const marker = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 12, 12),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  scene.add(marker);

  group.rotation.x = -0.15;

  addStars(scene);

  return (dt, t) => {
    group.rotation.y = Math.sin(t * 0.2) * 0.3;
    bars.forEach(({ mesh, baseHeight, x }, i) => {
      const wobble = Math.sin(t * 1.4 + i) * 0.03;
      mesh.scale.y = 1 + wobble;
    });
    const idx = Math.floor((t * 0.8) % count);
    const target = bars[idx];
    marker.position.set(target.x, target.mesh.position.y + (target.baseHeight * target.mesh.scale.y) / 2 + 0.14, 0);
  };
}

/* ---------------------------------------------------------
   8. ECG — a heartbeat waveform with a traveling scan point
      (ShiftWork: the live stress-reactive ECG line is the app's
      own signature UI element)
   --------------------------------------------------------- */
function ecg(scene, color) {
  const points = [];
  const width = 3.6, samples = 140;
  for (let i = 0; i <= samples; i++) {
    const x = (i / samples - 0.5) * width;
    let y = 0;
    const phase = i % 40;
    if (phase === 18) y = -0.15;
    else if (phase === 20) y = 0.65;
    else if (phase === 22) y = -0.3;
    else if (phase === 24) y = 0.05;
    y += (Math.random() - 0.5) * 0.01;
    points.push(new THREE.Vector3(x, y, 0));
  }
  const geo = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.85 }));
  scene.add(line);

  const glowDot = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  scene.add(glowDot);

  addStars(scene);

  return (dt, t) => {
    const cycle = (t * 0.6) % 1;
    const idx = Math.min(samples, Math.floor(cycle * samples));
    const pos = points[idx] || points[0];
    glowDot.position.set(pos.x, pos.y, 0.02);
    line.material.opacity = 0.6 + Math.sin(t * 3) * 0.2;
    line.rotation.z = Math.sin(t * 0.15) * 0.02;
  };
}

/* ---------------------------------------------------------
   9. VAULT — objects drifting down through stacked storage
      tiers, flagged ones fading out (OptiVault: metadata
      scanning, duplicate/stale detection across storage tiers)
   --------------------------------------------------------- */
function vault(scene, color) {
  const group = new THREE.Group();
  scene.add(group);

  const tierCount = 4;
  for (let i = 0; i < tierCount; i++) {
    const tier = new THREE.Mesh(
      new THREE.BoxGeometry(1.3, 0.14, 1.3),
      new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.5 - i * 0.06 })
    );
    tier.position.y = -0.55 + i * 0.32;
    group.add(tier);
  }
  group.rotation.x = -0.4;

  const objs = [];
  for (let i = 0; i < 10; i++) {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.045, 10, 10),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true })
    );
    mesh.userData = {
      phase: Math.random(),
      x: (Math.random() - 0.5) * 0.9,
      z: (Math.random() - 0.5) * 0.9,
      flagged: i % 4 === 0, // one in four reads as "detected duplicate/stale"
    };
    group.add(mesh);
    objs.push(mesh);
  }

  addStars(scene);

  return (dt, t) => {
    group.rotation.y = Math.sin(t * 0.2) * 0.3;
    objs.forEach((o) => {
      const p = (o.userData.phase + t * 0.12) % 1;
      o.position.set(o.userData.x, -0.7 + p * 1.5, o.userData.z);
      o.material.opacity = o.userData.flagged ? Math.max(0, 1 - p * 1.6) : 0.85;
    });
  };
}

/* shared faint starfield behind each mini scene */
function addStars(scene) {
  const count = 50;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 6;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 4 - 2;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const stars = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.018, transparent: true, opacity: 0.4 }));
  scene.add(stars);
}
