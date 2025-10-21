
"use client";

import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three"
import * as THREE from "three";

const Gunes = ({ onClick, isActive }) => { 
  const sunTexture = useLoader(TextureLoader, "/textures/gunes.jpg");
  const sunRef = useRef();

  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={sunRef} onClick={onClick}>
      <mesh>
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
    
    </group>
  );
};

export default Gunes;
