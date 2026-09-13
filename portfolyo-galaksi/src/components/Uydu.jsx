// src/components/Uydu.jsx
"use client";

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

const Uydu = ({ uyduData, onUyduClick }) => {
  // Bu component'in render edilmeye başladığını konsolda görelim
  ('Rendering Uydu:', uyduData.name);

  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const angle = (clock.getElapsedTime() * uyduData.orbitSpeed) + (uyduData.angleOffset || 0);
      const x = uyduData.orbitRadius * Math.sin(angle);
      const z = uyduData.orbitRadius * Math.cos(angle);
      // Eğimli yörünge animasyonu
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
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
    >
      <sphereGeometry args={[uyduData.size, 32, 32]} />
      <meshStandardMaterial
        color={uyduData.color}
        emissive={hovered ? uyduData.color : '#000000'}
        emissiveIntensity={hovered ? 0.6 : 0}
      />
      
      {/* Hover İsim Etiketi */}
      {hovered && (
        <Html position={[0, uyduData.size + 0.5, 0]} center style={{ pointerEvents: 'none', transition: 'opacity 0.2s', zIndex: 50 }}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)', padding: '4px 12px',
            borderRadius: '16px', border: `1px solid ${uyduData.color || '#5eead4'}`, 
            color: 'white', whiteSpace: 'nowrap', fontSize: '13px', fontWeight: 'bold', backdropFilter: 'blur(4px)'
          }}>
            {uyduData.name}
          </div>
        </Html>
      )}
    </mesh>
  );
};

export default Uydu;