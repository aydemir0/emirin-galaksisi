// src/components/YildizKumesi.jsx
"use client";
import { useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const YildizKumesi = ({ position, onClick }) => {
  // Model adını 'yetenekler-kristali.glb' olarak değiştiriyoruz
  const gltf = useLoader(GLTFLoader, "/models/yetenekler-kristali.glb");
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <primitive
      object={gltf.scene}
      ref={meshRef}
      position={position}
      scale={0.5}
      onClick={onClick}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHover(false); document.body.style.cursor = 'default'; }}
    />
  );
};

export default YildizKumesi;
