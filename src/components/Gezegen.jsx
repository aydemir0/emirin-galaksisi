
"use client";

import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import Ay from './Ay';


const Gezegen = ({ gezegenData, onGezegenClick }) => {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const renkHaritasi = gezegenData.textureUrl ? useLoader(TextureLoader, gezegenData.textureUrl) : null;

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const angle = clock.getElapsedTime() * gezegenData.orbitSpeed;
      const x = gezegenData.orbitRadius * Math.sin(angle);
      const z = gezegenData.orbitRadius * Math.cos(angle);
      const y = Math.sin(angle * (gezegenData.orbitRadius / 2)) * 0.5;
      meshRef.current.position.set(x, y, z);
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh
      ref={meshRef}
      onClick={(event) => {
        event.stopPropagation();
        onGezegenClick(gezegenData); 
      }}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHover(false); document.body.style.cursor = 'default'; }}
    >
      <sphereGeometry args={[gezegenData.size, 32, 32]} />
      <meshStandardMaterial
        map={renkHaritasi}
        emissive={hovered ? gezegenData.color || '#ffffff' : '#000000'}
        emissiveIntensity={hovered ? 0.5 : 0}
      />
      {gezegenData.id === 'kampus-sosyal' && <Ay />}
    </mesh>
  );
};

export default Gezegen;
