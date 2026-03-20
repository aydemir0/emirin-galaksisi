"use client";

import React, { useRef, useState, memo } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';


const ORBIT_RADIUS_X = 12; 
const ORBIT_RADIUS_Z = 12; 
const ORBIT_SPEED = 0.08;  
const TILT_AMPLITUDE = 1.5; 

const UzayGemisi = (props) => {
  const { scene } = useGLTF('/models/uzay-gemisi.glb');
  const clonedScene = scene.clone();
  const gemiRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (gemiRef.current) {
      
      const angle = elapsedTime * ORBIT_SPEED;
      const x = Math.sin(angle) * ORBIT_RADIUS_X;
      const y = Math.sin(angle) * TILT_AMPLITUDE; 
      const z = Math.cos(angle) * ORBIT_RADIUS_Z;
      gemiRef.current.position.set(x, y, z);

      const nextAngle = (elapsedTime + 0.05) * ORBIT_SPEED;
      const nextX = Math.sin(nextAngle) * ORBIT_RADIUS_X;
      const nextY = Math.sin(nextAngle) * TILT_AMPLITUDE;
      const nextZ = Math.cos(nextAngle) * ORBIT_RADIUS_Z;
<<<<<<< HEAD
      
=======

      // 3. Geminin yüzünü bir sonraki noktaya döndür
>>>>>>> 44751a7 (feat: 3D galaxy major overhaul - NASA textures, Warp Drive effect, PilotHUD, and premium sidebar UI)
      gemiRef.current.lookAt(nextX, nextY, nextZ);
    }
  });

  return (
<<<<<<< HEAD
    <group ref={gemiRef} {...props}>
     
      <primitive object={scene} rotation-y={Math.PI} />
=======
    <group 
      ref={gemiRef} 
      {...props}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
    >
      <primitive object={clonedScene} rotation-y={Math.PI} frustumCulled={true} />
      
      {/* Hover İsim Etiketi */}
      {hovered && (
        <Html position={[0, 2, 0]} center style={{ pointerEvents: 'none', transition: 'opacity 0.2s', zIndex: 50 }}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)', padding: '4px 12px',
            borderRadius: '16px', border: '1px solid #10b981', color: '#10b981',
            whiteSpace: 'nowrap', fontSize: '12px', fontWeight: 'bold', backdropFilter: 'blur(4px)'
          }}>
            The Odyssey
          </div>
        </Html>
      )}
>>>>>>> 44751a7 (feat: 3D galaxy major overhaul - NASA textures, Warp Drive effect, PilotHUD, and premium sidebar UI)
    </group>
  );
};

useGLTF.preload('/models/uzay-gemisi.glb');

<<<<<<< HEAD
export default UzayGemisi;
=======
export default memo(UzayGemisi);
>>>>>>> 44751a7 (feat: 3D galaxy major overhaul - NASA textures, Warp Drive effect, PilotHUD, and premium sidebar UI)
