// src/components/Gunes.jsx
"use client";

import { useRef, memo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

const Gunes = ({ onClick, isActive }) => {
  const sunTexture = useLoader(TextureLoader, "/textures/gunes.jpg");
  const sunRef = useRef();
  const coronaRef = useRef();

  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.1;
    }
    if (coronaRef.current) {
      // Pulse the corona scale smoothly
      const pulse = 1.03 + Math.sin(state.clock.elapsedTime * 2) * 0.015;
      coronaRef.current.scale.set(pulse, pulse, pulse);
      coronaRef.current.rotation.y -= delta * 0.05; // Rotate opposite slowly
    }
  });

  return (
    <group onClick={onClick}>
      <mesh ref={sunRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial 
          map={sunTexture} 
          emissive="#ffbb00" 
          emissiveMap={sunTexture}
          emissiveIntensity={1.5}
        />
      </mesh>
      <mesh ref={coronaRef}>
        <sphereGeometry args={[1.65, 24, 24]} />
        <meshStandardMaterial
          map={sunTexture}
          transparent={true}
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          emissive="#ff6600"
          emissiveIntensity={4}
        />
      </mesh>
    </group>
  );
};

export default memo(Gunes);