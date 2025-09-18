import { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload, Cloud } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.2 }));

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#00FFFF"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const Rain = () => {
  const rainCount = 800;
  const rainRef = useRef();
  const [positions] = useState(() => {
    const positions = new Float32Array(rainCount * 3);
    for (let i = 0; i < rainCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;      // x
      positions[i * 3 + 1] = Math.random() * 30;          // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;  // z
    }
    return positions;
  });
  
  const [velocities] = useState(() => {
    const velocities = new Float32Array(rainCount);
    for (let i = 0; i < rainCount; i++) {
      velocities[i] = 0.1 + Math.random() * 0.3; // Random initial velocity
    }
    return velocities;
  });

  useFrame((state, delta) => {
    for (let i = 0; i < rainCount; i++) {
      // Apply gravity - increase velocity over time
      velocities[i] += 0.01;
      
      // Update position based on velocity
      positions[i * 3 + 1] -= velocities[i];
      
      // Reset raindrop if it falls below the scene
      if (positions[i * 3 + 1] < -15) {
        positions[i * 3 + 1] = 15 + Math.random() * 10;
        positions[i * 3] = (Math.random() - 0.5) * 30;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
        velocities[i] = 0.1 + Math.random() * 0.3;
      }
    }
    rainRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={rainRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={rainCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#adf"
        size={0.15}
        sizeAttenuation={true}
        transparent
        opacity={0.7}
      />
    </points>
  );
};

const MovingCloud = ({ position, speed, opacity }) => {
  const cloudRef = useRef();
  const [startX] = useState(position[0]);
  const [direction, setDirection] = useState(1);
  
  useFrame((state, delta) => {
    if (!cloudRef.current) return;
    
    // Move cloud horizontally
    cloudRef.current.position.x += direction * speed * delta;
    
    // Change direction when cloud moves too far
    if (cloudRef.current.position.x > startX + 5) {
      setDirection(-1);
    } else if (cloudRef.current.position.x < startX - 5) {
      setDirection(1);
    }
  });
  
  return (
    <Cloud 
      ref={cloudRef}
      position={position}
      speed={0}
      opacity={opacity}
      color="white"
      depthTest={false}
    />
  );
};

const Clouds = () => {
  return (
    <group>
      <MovingCloud position={[-4, -2, -25]} speed={0.3} opacity={0.15} />
      <MovingCloud position={[4, 2, -15]} speed={0.2} opacity={0.1} />
      <MovingCloud position={[-2, 3, -10]} speed={0.4} opacity={0.15} />
      <MovingCloud position={[3, -5, -20]} speed={0.25} opacity={0.1} />
      <Rain />
    </group>
  );
};

const StarsCanvas = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  
  useEffect(() => {
    const checkTheme = () => {
      setIsDarkTheme(!document.documentElement.classList.contains('light-theme'));
    };
    
    checkTheme();
    
    // Create a MutationObserver to watch for class changes on the html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkTheme();
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full h-full absolute inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          {isDarkTheme ? <Stars /> : <Clouds />}
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;