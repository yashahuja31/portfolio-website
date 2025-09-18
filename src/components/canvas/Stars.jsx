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
  const rainCount = 500;
  const [positions] = useState(() => {
    const positions = new Float32Array(rainCount * 3);
    for (let i = 0; i < rainCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;      // x
      positions[i * 3 + 1] = Math.random() * 20 - 5;      // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;  // z
    }
    return positions;
  });

  useFrame((state, delta) => {
    for (let i = 0; i < rainCount; i++) {
      positions[i * 3 + 1] -= 0.1 + Math.random() * 0.1;
      if (positions[i * 3 + 1] < -10) {
        positions[i * 3 + 1] = 15;
      }
    }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={rainCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#8af"
        size={0.1}
        sizeAttenuation={true}
        transparent
        opacity={0.7}
      />
    </points>
  );
};

const Clouds = () => {
  return (
    <group>
      <Cloud position={[-4, -2, -25]} speed={0.2} opacity={0.2} />
      <Cloud position={[4, 2, -15]} speed={0.1} opacity={0.15} />
      <Cloud position={[-2, 3, -10]} speed={0.3} opacity={0.2} />
      <Cloud position={[3, -5, -20]} speed={0.2} opacity={0.15} />
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