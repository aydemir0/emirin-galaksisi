// src/components/Astronot.jsx
"use client";

import React, { useRef, useState } from 'react'; // useState'i import ettik
import { useGLTF, Ring } from '@react-three/drei'; // Ring'i import ettik
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three'; // Parlama efekti için THREE'yi import ettik

const Astronot = (props) => {
  const { astronotData, onClick } = props;
  const { scene } = useGLTF('/models/astronot.glb');
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
        object={scene} 
        scale={0.00099}
        rotation-y={Math.PI / 2}
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
    </group>
  );
};

useGLTF.preload('/models/astronot.glb');

export default Astronot;