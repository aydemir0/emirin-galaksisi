"use client";

import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from "three"; // Three.js'i import ediyoruz

const Gunes = () => {
  const sunTexture = useLoader(TextureLoader, "/textures/gunes.jpg");
  const sunRef = useRef();

  useFrame((state, delta) => {
    // Ana Güneş küresini döndür
    sunRef.current.rotation.y += delta * 0.1;
  });

  return (
    // Ana Güneş'i bir grup içinde tutalım, atmosferi de ekleyeceğiz
    <group ref={sunRef}>
      {/* ANA GÜNEŞ KÜRESİ */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial map={sunTexture} />
      </mesh>
      
      {/* ATMOSFER KÜRESİ */}
      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial 
          map={sunTexture} 
          transparent={true} 
          opacity={0.6}
          blending={THREE.AdditiveBlending} // Işıkların üst üste binerek daha parlak görünmesini sağlar
          side={THREE.BackSide} // Materyalin kürenin iç yüzeyinde görünmesini sağlar
        />
      </mesh>
    </group>
  );
};

export default Gunes;