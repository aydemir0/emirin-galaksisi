
"use client";
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const HaberlesmeUydusu = ({ uyduData, onClick }) => {
  const { scene } = useGLTF('/models/haberlesme-uydusu.glb');
  const uyduRef = useRef();

  useFrame(({ clock }) => {
    if (uyduRef.current) {
      const angle = (clock.getElapsedTime() * uyduData.orbitSpeed) + (uyduData.angleOffset || 0);
      const x = uyduData.orbitRadius * Math.sin(angle);
      const z = uyduData.orbitRadius * Math.cos(angle);
      const y = Math.cos(angle * 2) * 0.3;
      uyduRef.current.position.set(x, y, z);
      uyduRef.current.rotation.y += 0.005; 
    }
  });

  return (
    <group 
      ref={uyduRef} 
      onClick={(event) => {
        event.stopPropagation();
        onClick(uyduData);
      }}
    >
      <primitive 
        object={scene} 
        scale={0.20}
      /> 
    </group>
  );
};

useGLTF.preload('/models/haberlesme-uydusu.glb');

export default HaberlesmeUydusu;
