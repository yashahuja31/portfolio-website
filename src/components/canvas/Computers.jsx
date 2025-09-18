import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import { FaDownload } from "react-icons/fa";
import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const handleClick = () => {
    // Create a link element
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Yash_Ahuja_Resume.pdf';
    
    // Append to the document, click it, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <group>
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
      
      {/* Simple computer representation instead of 3D model */}
      <group
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      >
        {/* Monitor */}
        <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[7, 4, 0.2]} />
          <meshStandardMaterial color="#151030" />
        </mesh>
        
        {/* Screen */}
        <mesh position={[0, 2.5, 0.11]} receiveShadow>
          <boxGeometry args={[6.4, 3.6, 0.01]} />
          <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={0.2} />
        </mesh>
      
        {/* Screen with click handler */}
        <mesh 
          position={[0, 0.2, -1.4]} 
          onClick={handleClick}
          onPointerOver={() => setShowTooltip(true)}
          onPointerOut={() => setShowTooltip(false)}
        >
          <boxGeometry args={[6.4, 3.6, 0.01]} />
          <meshStandardMaterial opacity={0} transparent />
        </mesh>
        
        {/* Download Icon */}
        <group 
          position={[0, 0.2, -1.39]} 
          onClick={handleClick}
          onPointerOver={() => setShowTooltip(true)}
          onPointerOut={() => setShowTooltip(false)}
        >
          {/* Arrow Down Icon */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
            <meshStandardMaterial color="#4CAF50" emissive="#4CAF50" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
            <coneGeometry args={[0.5, 1, 32]} />
            <meshStandardMaterial color="#4CAF50" emissive="#4CAF50" emissiveIntensity={0.5} />
          </mesh>
          
          {/* Tooltip - only visible when hovering */}
          {showTooltip && (
            <group position={[0, 1.5, 0]}>
              <mesh castShadow receiveShadow>
                <boxGeometry args={[6, 0.8, 0.1]} />
                <meshStandardMaterial color="#333333" opacity={0.8} transparent />
              </mesh>
              <mesh position={[0, 0, 0.06]} castShadow receiveShadow>
                <boxGeometry args={[5.8, 0.6, 0.01]} />
                <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.8} />
              </mesh>
            </group>
          )}
        </group>
        
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
        
        {/* Download Icon */}
        <group 
          position={[0, 2.5, 0.12]} 
          onClick={handleClick}
          onPointerOver={() => setShowTooltip(true)}
          onPointerOut={() => setShowTooltip(false)}
        >
          {/* Arrow Down Icon */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
            <meshStandardMaterial color="#4CAF50" emissive="#4CAF50" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
            <coneGeometry args={[0.5, 1, 32]} />
            <meshStandardMaterial color="#4CAF50" emissive="#4CAF50" emissiveIntensity={0.5} />
          </mesh>
          
          {/* Tooltip - only visible when hovering */}
          {showTooltip && (
            <group position={[0, 1.5, 0]}>
              <mesh castShadow receiveShadow>
                <boxGeometry args={[6, 0.8, 0.1]} />
                <meshStandardMaterial color="#333333" opacity={0.8} transparent />
              </mesh>
              <mesh position={[0, 0, 0.06]} castShadow receiveShadow>
                <boxGeometry args={[5.8, 0.6, 0.01]} />
                <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.8} />
              </mesh>
            </group>
          )}
        </group>
      </group>
    </group>
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
      <Suspense fallback={<CanvasLoader />}>
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