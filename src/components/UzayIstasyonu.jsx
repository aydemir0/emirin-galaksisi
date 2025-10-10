// src/components/UzayIstasyonu.jsx
"use client";
import { useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const UzayIstasyonu = ({ istasyonData, onClick }) => {
  const gltf = useLoader(GLTFLoader, "/models/uzay_istasyonu.glb");
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const angle = clock.getElapsedTime() * istasyonData.orbitSpeed + istasyonData.angleOffset;
      const x = istasyonData.orbitRadius * Math.sin(angle);
      const z = istasyonData.orbitRadius * Math.cos(angle);
      meshRef.current.position.set(x, 0, z);
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <primitive
      object={gltf.scene}
      ref={meshRef}
      scale={0.5}
      onClick={() => onClick(istasyonData)}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHover(false); document.body.style.cursor = 'default'; }}
    />
  );
};

export default UzayIstasyonu;
