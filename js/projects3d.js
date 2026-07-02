import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

const PALETTES = [
  { color: 0xff7a5c, geo: 'icosahedron' },
  { color: 0x7b6bff, geo: 'torusKnot' },
  { color: 0x5eead4, geo: 'octahedron' },
];

function makeGeometry(kind) {
  switch (kind) {
    case 'torusKnot': return new THREE.TorusKnotGeometry(0.62, 0.18, 120, 16);
    case 'octahedron': return new THREE.OctahedronGeometry(0.95, 0);
    default: return new THREE.IcosahedronGeometry(0.95, 0);
  }
}

export function initProjectVisuals() {
  const cards = document.querySelectorAll('.project-card__viz canvas');
  cards.forEach((canvas, i) => {
    const palette = PALETTES[i % PALETTES.length];
    const parent = canvas.parentElement;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 20);
    camera.position.set(0, 0, 3.4);

    const geo = makeGeometry(palette.geo);
    const wireMat = new THREE.MeshBasicMaterial({ color: palette.color, wireframe: true, transparent: true, opacity: 0.85 });
    const mesh = new THREE.Mesh(geo, wireMat);
    scene.add(mesh);

    const glowMat = new THREE.MeshBasicMaterial({ color: palette.color, transparent: true, opacity: 0.06 });
    const glow = new THREE.Mesh(geo.clone(), glowMat);
    glow.scale.setScalar(1.4);
    scene.add(glow);

    // scattered points behind for depth
    const starGeo = new THREE.BufferGeometry();
    const starCount = 60;
    const pos = new Float32Array(starCount * 3);
    for (let j = 0; j < starCount; j++) {
      pos[j * 3] = (Math.random() - 0.5) * 6;
      pos[j * 3 + 1] = (Math.random() - 0.5) * 4;
      pos[j * 3 + 2] = (Math.random() - 0.5) * 4 - 2;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.02, transparent: true, opacity: 0.5 }));
    scene.add(stars);

    function resize() {
      const w = parent.clientWidth, h = parent.clientHeight;
      if (w === 0 || h === 0) return;
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
        mesh.rotation.x += dt * 0.25;
        mesh.rotation.y += dt * 0.35;
        glow.rotation.copy(mesh.rotation);
        stars.rotation.y += dt * 0.02;
        renderer.render(scene, camera);
      } else {
        clock.getDelta();
      }
      requestAnimationFrame(animate);
    }
    animate();
  });
}
