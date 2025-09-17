import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

const Computers = ({ isMobile }) => {
  // This is a placeholder for a 3D model
  // In a real implementation, you would import an actual GLTF model
  // For now, we'll create a simple 3D object to represent a computer
  
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      
      {/* Simple computer-like shape */}
      <group position={[0, -3.25, 0]}>
        {/* Monitor */}
        <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.5, 2, 0.2]} />
          <meshStandardMaterial color="#151030" />
        </mesh>
        
        {/* Screen */}
        <mesh position={[0, 2.5, 0.11]} receiveShadow>
          <boxGeometry args={[3.2, 1.8, 0.01]} />
          <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={0.2} />
        </mesh>
        
        {/* Stand */}
        <mesh position={[0, 1.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="#151030" />
        </mesh>
        
        {/* Base */}
        <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.1, 1]} />
          <meshStandardMaterial color="#151030" />
        </mesh>
        
        {/* Keyboard */}
        <mesh position={[0, 0.9, 1.5]} castShadow receiveShadow>
          <boxGeometry args={[3, 0.1, 1]} />
          <meshStandardMaterial color="#232323" />
        </mesh>
      </group>
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={null}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;