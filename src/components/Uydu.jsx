"use client";

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

const Uydu = ({ uyduData, onUyduClick }) => {
  ('Rendering Uydu:', uyduData.name);

  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const angle = (clock.getElapsedTime() * uyduData.orbitSpeed) + (uyduData.angleOffset || 0);
      const x = uyduData.orbitRadius * Math.sin(angle);
      const z = uyduData.orbitRadius * Math.cos(angle);
      const y = Math.cos(angle * 2) * 0.3; 
      meshRef.current.position.set(x, y, z);
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh
      ref={meshRef}
      onClick={(event) => {
        event.stopPropagation();
        onUyduClick(uyduData);
      }}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHover(false); document.body.style.cursor = 'default'; }}
    >
      <sphereGeometry args={[uyduData.size, 32, 32]} />
      <meshStandardMaterial
        color={uyduData.color}
        emissive={hovered ? uyduData.color : '#000000'}
        emissiveIntensity={hovered ? 0.6 : 0}
      />
    </mesh>
  );
};

export default Uydu;
