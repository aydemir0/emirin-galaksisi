
"use client";

import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from "three";


const ArkaPlan = ({ onClick }) => { 
  const texture = useLoader(TextureLoader, "/textures/uzay_arkaplan.jpg");

  return (
    <mesh
      scale={[-1, 1, 1]}
      onClick={onClick} 
      
    > 
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
};

export default ArkaPlan;
