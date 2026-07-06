import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

/**
 * Loads the astronaut model (assets/astronaut.glb) into the hero.
 * Instead of drag-to-rotate, it gently turns to "look toward" wherever
 * the cursor is anywhere on the page — a living, ambient reaction
 * rather than something the visitor has to operate. On touch devices,
 * where there's no persistent pointer, it falls back to a slow
 * autonomous sway.
 *
 * The source model ships with a single baked material/texture across
 * the whole mesh (helmet, suit, backpack all share one texture), so
 * "suit color" is applied as a multiply-tint on that material rather
 * than an isolated part. Bright fabric areas pick up the tint strongly;
 * dark visor/backpack detail stays close to unaffected.
 */
export function initAstronaut(canvas, statusEl) {
  const parent = canvas.parentElement;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.05, 20);
  camera.position.set(0, 0.05, 3.1);

  scene.add(new THREE.AmbientLight(0xffffff, 0.85));
  const key = new THREE.DirectionalLight(0xffffff, 1.3);
  key.position.set(3, 4, 5);
  scene.add(key);
  const rim = new THREE.PointLight(0x7b6bff, 1.4, 20);
  rim.position.set(-3, -1, 3);
  scene.add(rim);
  const warmFill = new THREE.PointLight(0xffab93, 0.7, 20);
  warmFill.position.set(2, -2, 4);
  scene.add(warmFill);

  const rig = new THREE.Group(); // cursor-follow rotation applied here
  scene.add(rig);

  let suitMaterials = [];

  const loader = new GLTFLoader();
  loader.load(
    'assets/astronaut.glb',
    (gltf) => {
      const model = gltf.scene;

      const box = new THREE.Box3().setFromObject(model);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);
      model.position.sub(center);
      const targetHeight = 2.05;
      const scale = targetHeight / (size.y || 1);
      model.scale.setScalar(scale);

      model.traverse((obj) => {
        if (obj.isMesh && obj.material) suitMaterials.push(obj.material);
      });

      rig.add(model);
      if (statusEl) statusEl.classList.add('is-loaded');
      applyPendingTheme();
    },
    undefined,
    (err) => {
      console.warn('Astronaut model failed to load:', err);
      if (statusEl) statusEl.textContent = 'Model unavailable';
    }
  );

  let pendingTheme = null;
  function applyPendingTheme() {
    if (pendingTheme) tintSuit(pendingTheme);
  }

  function tintSuit(theme) {
    // orange in the light theme (pops off a white background), white
    // in the dark theme (pops off black)
    const color = theme === 'light' ? 0xff7a3d : 0xffffff;
    suitMaterials.forEach((m) => {
      if (m.color) m.color.set(color);
    });
  }

  // ---- cursor-follow: track the pointer anywhere on the page ----
  const MAX_YAW = 0.55;
  const MAX_PITCH = 0.22;
  let targetYaw = -0.15;
  let targetPitch = 0.05;
  let curYaw = targetYaw;
  let curPitch = targetPitch;
  let lastInputAt = 0;

  function setTargetFromNormalized(nx, ny) {
    targetYaw = -0.15 + nx * MAX_YAW;
    targetPitch = 0.05 - ny * MAX_PITCH;
    lastInputAt = performance.now();
  }

  window.addEventListener('mousemove', (e) => {
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = (e.clientY / window.innerHeight) * 2 - 1;
    setTargetFromNormalized(nx, ny);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!e.touches.length) return;
    const t = e.touches[0];
    const nx = (t.clientX / window.innerWidth) * 2 - 1;
    const ny = (t.clientY / window.innerHeight) * 2 - 1;
    setTargetFromNormalized(nx, ny);
  }, { passive: true });

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
      const t = clock.getElapsedTime();

      // if no pointer input for a while (e.g. touch device idling),
      // drift gently on its own so it still feels alive
      const idleFor = performance.now() - lastInputAt;
      if (idleFor > 2500) {
        targetYaw = -0.15 + Math.sin(t * 0.25) * 0.35;
        targetPitch = 0.05 + Math.sin(t * 0.4) * 0.1;
      }

      curYaw += (targetYaw - curYaw) * 0.045;
      curPitch += (targetPitch - curPitch) * 0.045;
      rig.rotation.y = curYaw;
      rig.rotation.x = curPitch;
      rig.position.y = Math.sin(t * 0.55) * 0.05;

      renderer.render(scene, camera);
    } else {
      clock.getDelta();
    }
    requestAnimationFrame(animate);
  }
  animate();

  return {
    setTheme(theme) {
      pendingTheme = theme;
      if (suitMaterials.length) tintSuit(theme);
    },
  };
}
