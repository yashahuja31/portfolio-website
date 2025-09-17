import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const SkillPoint = ({ position, name, color, onHover, onLeave }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef();
  
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  return (
    <group position={position}>
      <Sphere 
        args={[0.3, 16, 16]} 
        ref={ref}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover(name);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          onLeave();
        }}
      >
        <meshStandardMaterial 
          color={hovered ? '#ff6b6b' : color} 
          emissive={hovered ? '#ff6b6b' : color}
          emissiveIntensity={hovered ? 0.8 : 0.4}
          roughness={0.3}
          metalness={0.8}
        />
      </Sphere>
    </group>
  );
};

const SkillCloud = ({ skills }) => {
  const groupRef = useRef();
  const [hoveredSkill, setHoveredSkill] = useState(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  const colors = [
    '#4cc9f0', '#4895ef', '#4361ee', '#3f37c9', '#3a0ca3',
    '#480ca8', '#560bad', '#7209b7', '#b5179e', '#f72585'
  ];

  // Generate positions on a sphere
  const positions = [];
  const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
  
  for (let i = 0; i < skills.length; i++) {
    const y = 1 - (i / (skills.length - 1)) * 2; // y goes from 1 to -1
    const radius = Math.sqrt(1 - y * y); // radius at y
    const theta = phi * i; // golden angle increment
    
    const x = Math.cos(theta) * radius * 5;
    const z = Math.sin(theta) * radius * 5;
    
    positions.push([x, y * 5, z]);
  }

  return (
    <>
      <group ref={groupRef}>
        {skills.map((skill, index) => (
          <SkillPoint 
            key={skill}
            position={positions[index]}
            name={skill}
            color={colors[index % colors.length]}
            onHover={setHoveredSkill}
            onLeave={() => setHoveredSkill(null)}
          />
        ))}
      </group>
      
      {hoveredSkill && (
        <Text
          position={[0, -7, 0]}
          color="white"
          fontSize={0.8}
          maxWidth={200}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign="center"
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          anchorX="center"
          anchorY="middle"
        >
          {hoveredSkill}
        </Text>
      )}
    </>
  );
};

const SkillSphere = ({ skillItems }) => {
  // Flatten all skill items into a single array
  const allSkills = skillItems.flatMap(category => 
    category.items.map(item => item.name)
  );

  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 60 }}
      style={{ height: '500px' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <SkillCloud skills={allSkills} />
    </Canvas>
  );
};

export default SkillSphere;