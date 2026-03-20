
"use client";

import { useRef, memo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
<<<<<<< HEAD
import { TextureLoader } from "three"
=======
import { TextureLoader } from "three";
>>>>>>> 44751a7 (feat: 3D galaxy major overhaul - NASA textures, Warp Drive effect, PilotHUD, and premium sidebar UI)
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
        <sphereGeometry args={[1.5, 28, 28]} />
        <meshBasicMaterial map={sunTexture} />
      </mesh>
      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[1.5, 20, 20]} />
        <meshStandardMaterial
          map={sunTexture}
          transparent={true}
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
<<<<<<< HEAD
    
=======
      { }
>>>>>>> 44751a7 (feat: 3D galaxy major overhaul - NASA textures, Warp Drive effect, PilotHUD, and premium sidebar UI)
    </group>
  );
};

<<<<<<< HEAD
export default Gunes;
=======
export default memo(Gunes);
>>>>>>> 44751a7 (feat: 3D galaxy major overhaul - NASA textures, Warp Drive effect, PilotHUD, and premium sidebar UI)
