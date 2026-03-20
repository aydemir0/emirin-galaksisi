// src/components/YeteneklerUydusu.jsx
"use client";

import React, { useRef, useState, memo } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const YeteneklerUydusu = ({ uyduData, onClick }) => {
  const { scene } = useGLTF('/models/yetenekler-kristali.glb');
  const clonedScene = scene.clone();
  const kristalRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (kristalRef.current) {
      const angle = (clock.getElapsedTime() * uyduData.orbitSpeed) + (uyduData.angleOffset || 0);
      const x = uyduData.orbitRadius * Math.sin(angle);
      const z = uyduData.orbitRadius * Math.cos(angle);
      const y = Math.cos(angle * 2) * 0.3;
      kristalRef.current.position.set(x, y, z);
      kristalRef.current.rotation.y += 0.01; // Kristal biraz daha hızlı dönebilir
    }
  });

  return (
    <group
      ref={kristalRef}
      onClick={(event) => {
        event.stopPropagation();
        onClick(uyduData);
      }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
    >
      <primitive
        object={clonedScene}
        scale={0.05}
        frustumCulled={true}
      />
      
      {/* Hover İsim Etiketi */}
      {hovered && (
        <Html position={[0, 1.5, 0]} center style={{ pointerEvents: 'none', transition: 'opacity 0.2s', zIndex: 50 }}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)', padding: '4px 12px',
            borderRadius: '16px', border: '1px solid #c084fc', color: '#c084fc',
            whiteSpace: 'nowrap', fontSize: '12px', fontWeight: 'bold', backdropFilter: 'blur(4px)'
          }}>
            {uyduData.name}
          </div>
        </Html>
      )}
    </group>
  );
};

useGLTF.preload('/models/yetenekler-kristali.glb');

export default memo(YeteneklerUydusu);