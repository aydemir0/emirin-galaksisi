// src/components/UzayIstasyonu.jsx
"use client";

import React, { useRef, useState, memo } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const UzayIstasyonu = ({ istasyonData, onClick }) => {
  const { scene } = useGLTF('/models/uzay-istasyonu.glb');
  const clonedScene = scene.clone();
  const istasyonRef = useRef();
  const [hovered, setHover] = useState(false);

  useFrame(({ clock }) => {
    if (istasyonRef.current) {
      const angle = (clock.getElapsedTime() * istasyonData.orbitSpeed) + (istasyonData.angleOffset || 0);
      const x = istasyonData.orbitRadius * Math.sin(angle);
      const z = istasyonData.orbitRadius * Math.cos(angle);
      // Eğimli yörünge animasyonu
      const y = Math.cos(angle * 2) * 0.3;
      istasyonRef.current.position.set(x, y, z);
      istasyonRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group
      ref={istasyonRef}
      onClick={(event) => {
        event.stopPropagation();
        onClick(istasyonData);
      }}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHover(false); document.body.style.cursor = 'default'; }}
    >
      <primitive object={clonedScene} scale={0.1} frustumCulled={true} />
      
      {/* Hover İsim Etiketi */}
      {hovered && (
        <Html position={[0, 1.5, 0]} center style={{ pointerEvents: 'none', transition: 'opacity 0.2s', zIndex: 50 }}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)', padding: '4px 12px',
            borderRadius: '16px', border: '1px solid #facc15', color: '#facc15',
            whiteSpace: 'nowrap', fontSize: '12px', fontWeight: 'bold', backdropFilter: 'blur(4px)'
          }}>
            {istasyonData.name}
          </div>
        </Html>
      )}
    </group>
  );
};

useGLTF.preload('/models/uzay-istasyonu.glb');

export default memo(UzayIstasyonu);