// src/components/HaberlesmeUydusu.jsx
"use client";

import React, { useRef, useState, memo } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const HaberlesmeUydusu = ({ uyduData, onClick }) => {
  const { scene } = useGLTF('/models/haberlesme-uydusu.glb');
  const clonedScene = scene.clone();
  const uyduRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (uyduRef.current) {
      const angle = (clock.getElapsedTime() * uyduData.orbitSpeed) + (uyduData.angleOffset || 0);
      const x = uyduData.orbitRadius * Math.sin(angle);
      const z = uyduData.orbitRadius * Math.cos(angle);
      const y = Math.cos(angle * 2) * 0.3;
      uyduRef.current.position.set(x, y, z);
      uyduRef.current.rotation.y += 0.005; // Kendi etrafında yavaşça dönsün
    }
  });

  return (
    <group
      ref={uyduRef}
      onClick={(event) => {
        event.stopPropagation();
        onClick(uyduData);
      }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
    >
      <primitive
        object={clonedScene}
        scale={0.20}
        frustumCulled={true}
      />
      
      {/* Hover İsim Etiketi */}
      {hovered && (
        <Html position={[0, 1.5, 0]} center style={{ pointerEvents: 'none', transition: 'opacity 0.2s', zIndex: 50 }}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)', padding: '4px 12px',
            borderRadius: '16px', border: '1px solid #38bdf8', color: '#38bdf8',
            whiteSpace: 'nowrap', fontSize: '12px', fontWeight: 'bold', backdropFilter: 'blur(4px)'
          }}>
            {uyduData.name}
          </div>
        </Html>
      )}
    </group>
  );
};

useGLTF.preload('/models/haberlesme-uydusu.glb');

export default memo(HaberlesmeUydusu);