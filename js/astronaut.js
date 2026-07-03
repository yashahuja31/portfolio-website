import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

/**
 * Loads the real astronaut model (assets/astronaut.glb) into the hero.
 * Fully drag-to-rotate, same interaction language as the skills orbit:
 * pointer drag rotates the figure on both axes, it auto-rotates gently
 * when idle, and it re-tints on theme change.
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

  const rig = new THREE.Group(); // drag rotation applied here
  scene.add(rig);

  let suitMaterials = [];

  const loader = new GLTFLoader();
  loader.load(
    'assets/astronaut.glb',
    (gltf) => {
      const model = gltf.scene;

      // frame the model: center it and scale to a consistent height
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
        if (obj.isMesh) {
          obj.castShadow = false;
          obj.receiveShadow = false;
          if (obj.material) suitMaterials.push(obj.material);
        }
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
    // swapped intentionally: orange in the light theme (pops off a
    // white background), white/neutral in the dark theme (pops off
    // black)
    const color = theme === 'light' ? 0xff7a3d : 0xffffff;
    suitMaterials.forEach((m) => {
      if (m.color) m.color.set(color);
    });
  }

  // ---- interaction: free drag rotation on both axes ----
  let isDragging = false, lastX = 0, lastY = 0;
  let velX = 0, velY = 0;
  let rotX = 0.05, rotY = 0;

  canvas.style.touchAction = 'none';
  canvas.style.cursor = 'grab';

  canvas.addEventListener('pointerdown', (e) => {
    isDragging = true;
    lastX = e.clientX; lastY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
    canvas.style.cursor = 'grabbing';
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastX, dy = e.clientY - lastY;
    velY = dx * 0.006;
    velX = dy * 0.006;
    rotY += velY;
    rotX = Math.max(-0.9, Math.min(0.9, rotX + velX));
    lastX = e.clientX; lastY = e.clientY;
  });
  function release() { isDragging = false; canvas.style.cursor = 'grab'; }
  canvas.addEventListener('pointerup', release);
  canvas.addEventListener('pointerleave', release);

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
      if (!isDragging) {
        rotY += 0.0018; // gentle idle auto-rotate
        velX *= 0.9; velY *= 0.9;
      }
      rig.rotation.y = rotY;
      rig.rotation.x = rotX;
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
