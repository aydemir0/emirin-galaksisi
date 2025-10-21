"use client";

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const YeteneklerUydusu = ({ uyduData, onClick }) => {
  const { scene } = useGLTF('/models/yetenekler-kristali.glb');
  const kristalRef = useRef();

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
    >
      <primitive 
        object={scene} 
        scale={0.05} // Başlangıç boyutu, gerekirse değiştiririz
      /> 
    </group>
  );
};

useGLTF.preload('/models/yetenekler-kristali.glb');

export default YeteneklerUydusu;
