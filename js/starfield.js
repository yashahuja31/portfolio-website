import * as THREE from 'three';

/**
 * Ambient starfield that sits behind the whole page.
 * Two depth layers of points give a subtle parallax feel on mouse move
 * and on scroll. Colors respond to the active theme via CSS-driven
 * accent injection (read once per theme change).
 */
export function initStarfield(canvas, getTheme) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 8;

  function makeLayer(count, spread, size, color, opacity) {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      size, color, transparent: true, opacity,
      depthWrite: false, sizeAttenuation: true,
    });
    return new THREE.Points(geo, mat);
  }

  const far = makeLayer(900, 60, 0.045, 0xffffff, 0.55);
  const mid = makeLayer(350, 40, 0.07, 0x9d8cff, 0.6);
  const near = makeLayer(120, 26, 0.1, 0xff9a7c, 0.55);
  scene.add(far, mid, near);

  // a couple of large soft "nebula" sprites for depth
  function makeGlow(color, size, x, y, z, opacity) {
    const spriteMat = new THREE.SpriteMaterial({
      map: makeRadialTexture(color),
      transparent: true, opacity, depthWrite: false,
    });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(size, size, 1);
    sprite.position.set(x, y, z);
    return sprite;
  }

  function makeRadialTexture(hexColor) {
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const ctx = c.getContext('2d');
    const grd = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    const col = new THREE.Color(hexColor);
    grd.addColorStop(0, `rgba(${col.r * 255},${col.g * 255},${col.b * 255},0.9)`);
    grd.addColorStop(1, `rgba(${col.r * 255},${col.g * 255},${col.b * 255},0)`);
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(c);
  }

  const glowA = makeGlow(0x7b6bff, 14, -6, 2, -10, 0.35);
  const glowB = makeGlow(0xff7a5c, 10, 7, -3, -14, 0.25);
  scene.add(glowA, glowB);

  let mouseX = 0, mouseY = 0, targetRotX = 0, targetRotY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5);
    mouseY = (e.clientY / window.innerHeight - 0.5);
  }, { passive: true });

  let scrollY = 0;
  window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  const clock = new THREE.Clock();
  function animate() {
    const t = clock.getElapsedTime();

    targetRotY += (mouseX * 0.4 - targetRotY) * 0.03;
    targetRotX += (mouseY * 0.3 - targetRotX) * 0.03;

    scene.rotation.y = targetRotY;
    scene.rotation.x = targetRotX;

    far.rotation.y = t * 0.008;
    mid.rotation.y = -t * 0.015;
    near.rotation.y = t * 0.02;

    camera.position.y = -scrollY * 0.0009;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();

  return {
    setTheme(theme) {
      // slightly tune star opacity for light theme so stars stay visible
      // against a brighter sky without overwhelming it
      const op = theme === 'light' ? 0.35 : 0.55;
      far.material.opacity = op;
    },
  };
}
