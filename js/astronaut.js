import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

/**
 * A small stylised astronaut that floats beside the hero headline.
 * Suit colour swaps with the site theme: white in "daylight nebula"
 * (light theme), warm coral/orange in "night sky" (dark theme) so it
 * always reads clearly against the background.
 */
export function initAstronaut(canvas) {
  const parent = canvas.parentElement;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 20);
  camera.position.set(0.3, 0.1, 6);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.75));
  const key = new THREE.DirectionalLight(0xffffff, 1.15);
  key.position.set(3, 4, 5);
  scene.add(key);
  const rim = new THREE.PointLight(0x7b6bff, 1.3, 20);
  rim.position.set(-3, -1.5, 3);
  scene.add(rim);
  const warmFill = new THREE.PointLight(0xffab93, 0.8, 20);
  warmFill.position.set(2, -2, 4);
  scene.add(warmFill);

  const group = new THREE.Group();
  scene.add(group);

  const suitMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.55, metalness: 0.12 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x171a2e, roughness: 0.45, metalness: 0.3 });
  const visorMat = new THREE.MeshStandardMaterial({ color: 0x080a18, roughness: 0.15, metalness: 0.6 });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xbfe3ff, transparent: true, opacity: 0.28, roughness: 0.08,
    transmission: 0.55, thickness: 0.25, metalness: 0,
  });
  const stripeMat = new THREE.MeshStandardMaterial({ color: 0xffd166, roughness: 0.4, metalness: 0.2 });

  // torso
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.58, 0.82, 8, 16), suitMat);
  group.add(torso);

  // chest stripe (small accent detail, stays gold regardless of theme)
  const stripe = new THREE.Mesh(new THREE.TorusGeometry(0.585, 0.035, 8, 32, Math.PI * 0.9), stripeMat);
  stripe.rotation.set(Math.PI / 2, 0, -0.45);
  stripe.position.set(0, 0.05, 0);
  group.add(stripe);

  // backpack
  const pack = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.86, 0.3), darkMat);
  pack.position.set(0, 0.02, -0.52);
  group.add(pack);
  [-0.2, 0.2].forEach((x) => {
    const vent = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.3, 12), darkMat);
    vent.rotation.x = Math.PI / 2;
    vent.position.set(x, 0.3, -0.7);
    group.add(vent);
  });

  // helmet
  const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), glassMat);
  helmet.position.set(0, 0.98, 0.04);
  group.add(helmet);

  const helmetRing = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.045, 12, 32), darkMat);
  helmetRing.rotation.x = Math.PI / 2;
  helmetRing.position.set(0, 0.72, 0.04);
  group.add(helmetRing);

  const visor = new THREE.Mesh(
    new THREE.SphereGeometry(0.36, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.6),
    visorMat
  );
  visor.position.set(0, 1.0, 0.2);
  visor.rotation.x = -0.35;
  group.add(visor);

  // visor highlight (reads as a reflection, sells the glass)
  const highlight = new THREE.Mesh(
    new THREE.SphereGeometry(0.07, 12, 12),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 })
  );
  highlight.position.set(-0.12, 1.12, 0.42);
  group.add(highlight);

  // arms
  function makeArm(x, rotZ) {
    const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.155, 0.58, 6, 12), suitMat);
    arm.position.set(x, 0.18, 0);
    arm.rotation.z = rotZ;
    return arm;
  }
  const armL = makeArm(-0.74, 0.4);
  const armR = makeArm(0.74, -0.4);
  group.add(armL, armR);

  [-1.0, 1.0].forEach((sign) => {
    const glove = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), darkMat);
    glove.position.set(0.74 * sign * 1.28, -0.24, 0.1);
    group.add(glove);
  });

  // legs
  function makeLeg(x) {
    const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.185, 0.66, 6, 12), suitMat);
    leg.position.set(x, -0.98, 0);
    return leg;
  }
  const legL = makeLeg(-0.27);
  const legR = makeLeg(0.27);
  group.add(legL, legR);

  [-0.27, 0.27].forEach((x) => {
    const boot = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.16, 0.34), darkMat);
    boot.position.set(x, -1.42, 0.06);
    group.add(boot);
  });

  // chest control panel
  const panel = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.2, 0.05), darkMat);
  panel.position.set(0, 0.1, 0.58);
  group.add(panel);
  [-0.08, 0, 0.08].forEach((x, i) => {
    const btn = new THREE.Mesh(new THREE.CircleGeometry(0.025, 12), stripeMat);
    btn.position.set(x, 0.14, 0.61);
    group.add(btn);
  });

  // antenna
  const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.26, 8), darkMat);
  antenna.position.set(0.22, 1.42, 0);
  antenna.rotation.z = 0.45;
  group.add(antenna);
  const antennaTip = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 10), stripeMat);
  antennaTip.position.set(0.33, 1.52, 0);
  group.add(antennaTip);

  group.rotation.set(0.08, -0.55, 0.04);
  group.position.set(0, -0.1, 0);
  group.scale.setScalar(0.92);

  // loose dust / star particles drifting around the figure
  const dustGeo = new THREE.BufferGeometry();
  const dustCount = 46;
  const dpos = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    dpos[i * 3] = (Math.random() - 0.5) * 5.5;
    dpos[i * 3 + 1] = (Math.random() - 0.5) * 5.5;
    dpos[i * 3 + 2] = (Math.random() - 0.5) * 3 - 1;
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dpos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
    color: 0xffffff, size: 0.028, transparent: true, opacity: 0.55,
  }));
  scene.add(dust);

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
      group.position.y = -0.1 + Math.sin(t * 0.55) * 0.16;
      group.rotation.y = -0.55 + Math.sin(t * 0.28) * 0.18;
      group.rotation.z = 0.04 + Math.sin(t * 0.4) * 0.03;
      dust.rotation.y = t * 0.02;
      renderer.render(scene, camera);
    } else {
      clock.getDelta();
    }
    requestAnimationFrame(animate);
  }
  animate();

  return {
    setTheme(theme) {
      if (theme === 'light') {
        suitMat.color.set(0xffffff);
        suitMat.roughness = 0.5;
      } else {
        suitMat.color.set(0xff7a5c);
        suitMat.roughness = 0.42;
      }
    },
  };
}
