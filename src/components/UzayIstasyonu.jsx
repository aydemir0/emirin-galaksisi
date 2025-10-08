// src/components/UzayIstasyonu.jsx
"use client";

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const UzayIstasyonu = ({ istasyonData, onClick }) => {
  // Bu component'in render edilmeye başladığını konsolda görelim
  console.log('Rendering UzayIstasyonu:', istasyonData.name);

  const { scene } = useGLTF('/models/uzay-istasyonu.glb');
  const istasyonRef = useRef();

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
    >
      <primitive object={scene} scale={0.1} /> 
    </group>
  );
};

useGLTF.preload('/models/uzay-istasyonu.glb');

export default UzayIstasyonu;