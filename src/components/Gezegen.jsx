<<<<<<< HEAD

=======
>>>>>>> 44751a7 (feat: 3D galaxy major overhaul - NASA textures, Warp Drive effect, PilotHUD, and premium sidebar UI)
"use client";

import React, { useRef, useState, memo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { TextureLoader } from 'three';
import Ay from './Ay';

<<<<<<< HEAD

=======
>>>>>>> 44751a7 (feat: 3D galaxy major overhaul - NASA textures, Warp Drive effect, PilotHUD, and premium sidebar UI)
const Gezegen = ({ gezegenData, onGezegenClick }) => {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const renkHaritasi = gezegenData.textureUrl ? useLoader(TextureLoader, gezegenData.textureUrl) : null;

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const angle = (clock.getElapsedTime() * gezegenData.orbitSpeed) + (gezegenData.startingAngle || 0);
      const x = gezegenData.orbitRadius * Math.sin(angle);
      const z = gezegenData.orbitRadius * Math.cos(angle);
      const y = Math.sin(angle * (gezegenData.orbitRadius / 2)) * 0.5;
      meshRef.current.position.set(x, y, z);
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh
      ref={meshRef}
      castShadow={false}
      receiveShadow={false}
      onClick={(event) => {
        event.stopPropagation();
<<<<<<< HEAD
        onGezegenClick(gezegenData); 
=======
        onGezegenClick(gezegenData);
>>>>>>> 44751a7 (feat: 3D galaxy major overhaul - NASA textures, Warp Drive effect, PilotHUD, and premium sidebar UI)
      }}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHover(false); document.body.style.cursor = 'default'; }}
    >
      <sphereGeometry args={[gezegenData.size, 24, 24]} />
      <meshStandardMaterial
        map={renkHaritasi}
        color={gezegenData.color || '#ffffff'}
        emissive={hovered ? (gezegenData.color !== '#ffffff' ? gezegenData.color : '#aaaaaa') : '#000000'}
        emissiveIntensity={hovered ? 0.4 : 0}
      />
      {gezegenData.id === 'kampus-sosyal' && <Ay />}
      
      {/* Hover İsim Etiketi */}
      {hovered && (
        <Html position={[0, gezegenData.size + 0.5, 0]} center style={{ pointerEvents: 'none', transition: 'opacity 0.2s', zIndex: 50 }}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)', padding: '4px 12px',
            borderRadius: '16px', border: `1px solid ${gezegenData.color || '#5eead4'}`, 
            color: 'white', whiteSpace: 'nowrap', fontSize: '13px', fontWeight: 'bold', backdropFilter: 'blur(4px)'
          }}>
            {gezegenData.name}
          </div>
        </Html>
      )}
    </mesh>
  );
};

<<<<<<< HEAD
export default Gezegen;
=======
export default memo(Gezegen);
>>>>>>> 44751a7 (feat: 3D galaxy major overhaul - NASA textures, Warp Drive effect, PilotHUD, and premium sidebar UI)
