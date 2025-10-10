// src/components/Gunes.jsx
"use client";
import { useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

const Gunes = ({ onClick, isActive }) => { 
  const sunTexture = useLoader(TextureLoader, "/textures/gunes.jpg");
  const sunRef = useRef();
  const [hovered, setHover] = useState(false);

  // Rotasyonu basitleştirme
  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.05; // Daha yavaş rotasyon
    }
  });

  return (
    <group 
      ref={sunRef} 
      onClick={onClick}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHover(false); document.body.style.cursor = 'default'; }}
    >
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial map={sunTexture} />
      </mesh>
      {/* Glow efekti için ikinci mesh'i koruyoruz, ancak performansı etkileyecek karmaşık shader'lar kullanmıyoruz. */}
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
