// src/components/UzayGemisi.jsx
"use client";
import { useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const UzayGemisi = ({ scale, onClick }) => {
  const gltf = useLoader(GLTFLoader, "/models/spaceship.glb");
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const angle = clock.getElapsedTime() * 0.1;
      const x = 2 * Math.sin(angle);
      const z = 2 * Math.cos(angle);
      meshRef.current.position.set(x, 0.5, z);
      meshRef.current.rotation.y = -angle;
    }
  });

  return (
    <primitive
      object={gltf.scene}
      ref={meshRef}
      scale={scale}
      onClick={onClick}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHover(false); document.body.style.cursor = 'default'; }}
    />
  );
};

export default UzayGemisi;
