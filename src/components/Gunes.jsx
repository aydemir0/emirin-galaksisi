"use client";

import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from "three";

// Uydular için test component'i (Boyutunu büyüttük)
const Uydu = ({ position }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.8, 32, 32]} /> {/* TEST: Boyutu artırdık (0.2 -> 0.8) */}
      <meshStandardMaterial color="white" emissive="white" emissiveIntensity={2} />
    </mesh>
  );
};


const Gunes = ({ onClick, isActive }) => { 
  const sunTexture = useLoader(TextureLoader, "/textures/gunes.jpg");
  const sunRef = useRef();

  // Uydu pozisyonlarını test için uzaklaştırdık
  const satellites = [
    { id: 'photo', position: [5, 0, 0] },   // TEST: Mesafeyi artırdık (2.5 -> 5)
    { id: 'bio', position: [0, 5, 0] },     // TEST: Mesafeyi artırdık (2.5 -> 5)
    { id: 'social', position: [-5, 0, 0] }, // TEST: Mesafeyi artırdık (2.5 -> 5)
    { id: 'contact', position: [0, -5, 0] },// TEST: Mesafeyi artırdık (2.5 -> 5)
  ];

  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    // DÜZELTME: onClick olayını, atmosfer dahil tüm grubu kapsayacak şekilde dışarı taşıdık.
    <group ref={sunRef} onClick={onClick}>
      <mesh> {/* Bu mesh artık sadece görsel, tıklama dış grupta */}
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial map={sunTexture} />
      </mesh>
      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial 
          map={sunTexture} 
          transparent={true} 
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Eğer Güneş aktifse uyduları göster */}
      {isActive && satellites.map(s => <Uydu key={s.id} position={s.position} />)}
    </group>
  );
};

export default Gunes;