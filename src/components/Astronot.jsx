// src/components/Astronot.jsx
"use client";

import React, { useRef, useState, memo } from 'react';
import { useGLTF, Ring, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Astronot = (props) => {
  const { astronotData, onClick } = props;
  const { scene } = useGLTF('/models/astronot.glb');
  const clonedScene = scene.clone();
  const astronotRef = useRef();

  // YENİ: Fare'nin obje üzerinde olup olmadığını takip eden state
  const [hovered, setHover] = useState(false);

  useFrame(({ clock }) => {
    if (astronotRef.current) {
      const angle = (clock.getElapsedTime() * astronotData.orbitSpeed) + (astronotData.angleOffset || 0);
      const x = astronotData.orbitRadius * Math.sin(angle);
      const z = astronotData.orbitRadius * Math.cos(angle);
      const y = Math.cos(angle * 2) * 0.3;
      astronotRef.current.position.set(x, y, z);
      astronotRef.current.rotation.y += 0.004;
    }
  });

  return (
    <group
      ref={astronotRef}
      onClick={(event) => {
        event.stopPropagation();
        onClick(astronotData);
      }}
      // YENİ: Fare olaylarını dinleyen handler'lar
      onPointerOver={(event) => {
        event.stopPropagation();
        setHover(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHover(false);
        document.body.style.cursor = 'default';
      }}
    >
      <primitive
        object={clonedScene}
        scale={0.00099}
        rotation-y={Math.PI / 2}
        frustumCulled={true}
      />

      {/* --- YENİ BÖLÜM: HOLOGRAM EFEKTİ --- */}
      {/* 'hovered' durumu true ise, yani fare üzerindeyse, bu halkayı çiz */}
      {hovered && (
        <Ring
          position={[0.5, 0.8, 0]} // Astronotun biraz sağına ve yukarısına
          rotation={[Math.PI / 2.5, 0, 0]} // Hafif açılı dursun
          args={[0.6, 0.7, 64]} // İç yarıçap, dış yarıçap, segment sayısı
        >
          <meshBasicMaterial
            color="#00ffff" // Parlak cyan rengi
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending} // Işıkların üst üste binerek daha da parlamasını sağlar
            side={THREE.DoubleSide}
          />
        </Ring>
      )}

      {/* Hover İsim Etiketi */}
      {hovered && (
        <Html position={[0, 1.5, 0]} center style={{ pointerEvents: 'none', transition: 'opacity 0.2s', zIndex: 50 }}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)', padding: '4px 12px',
            borderRadius: '16px', border: '1px solid #5eead4', color: '#5eead4',
            whiteSpace: 'nowrap', fontSize: '12px', fontWeight: 'bold', backdropFilter: 'blur(4px)'
          }}>
            {astronotData.name}
          </div>
        </Html>
      )}
    </group>
  );
};

useGLTF.preload('/models/astronot.glb');

export default memo(Astronot);