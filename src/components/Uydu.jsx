// src/components/Uydu.jsx
"use client";
import { useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Uydu = ({ uyduData, onUyduClick }) => {
  const gltf = useLoader(GLTFLoader, "/models/uydu.glb");
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const angle = clock.getElapsedTime() * uyduData.orbitSpeed + uyduData.angleOffset;
      const x = uyduData.orbitRadius * Math.sin(angle);
      const z = uyduData.orbitRadius * Math.cos(angle);
      meshRef.current.position.set(x, 0, z);
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <primitive
      object={gltf.scene}
      ref={meshRef}
      scale={0.5}
      onClick={() => onUyduClick(uyduData)}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHover(false); document.body.style.cursor = 'default'; }}
    />
  );
};

export default Uydu;
