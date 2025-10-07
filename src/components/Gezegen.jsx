"use client";

import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

const Gezegen = ({ onGezegenClick, ...props }) => { 
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  const renkHaritasi = props.textureUrl ? useLoader(TextureLoader, props.textureUrl) : null;
  
  useFrame(({ clock }) => {
    const angle = clock.getElapsedTime() * props.orbitSpeed;
    const x = props.orbitRadius * Math.sin(angle);
    const z = props.orbitRadius * Math.cos(angle);
    meshRef.current.position.x = x;
    meshRef.current.position.z = z;
    meshRef.current.rotation.y += 0.005;
  });

  return (
    <mesh 
      ref={meshRef}
      // HATA BURADAYDI, ŞİMDİ DÜZELDİ
      onClick={(event) => {
        // Ana sayfaya hem proje bilgilerini hem de 'event' objesini gönderiyoruz
        onGezegenClick(props, event);
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(event) => {
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
    >
      <sphereGeometry args={[props.size, 32, 32]} />
      <meshStandardMaterial 
        map={renkHaritasi}
        emissive={hovered ? props.color || '#ffffff' : '#000000'}
        emissiveIntensity={hovered ? 0.5 : 0}
      />
    </mesh>
  );
};

export default Gezegen;