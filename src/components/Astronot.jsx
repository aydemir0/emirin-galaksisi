
"use client";

<<<<<<< HEAD
import React, { useRef, useState } from 'react'; 
import { useGLTF, Ring } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three'; 
=======
import React, { useRef, useState, memo } from 'react';
import { useGLTF, Ring, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
>>>>>>> 44751a7 (feat: 3D galaxy major overhaul - NASA textures, Warp Drive effect, PilotHUD, and premium sidebar UI)

const Astronot = (props) => {
  const { astronotData, onClick } = props;
  const { scene } = useGLTF('/models/astronot.glb');
  const clonedScene = scene.clone();
  const astronotRef = useRef();

  
  const [hovered, setHover] = useState(false);

  useFrame(({ clock }) => {
    if (astronotRef.current) {
      const angle = (clock.getElapsedTime() * astronotData.orbitSpeed) + (astronotData.angleOffset || 0);
      const x = astronotData.orbitRadius * Math.sin(angle);
      const z = astronotData.orbitRadius * Math.cos(angle);
      const y = Math.cos(angle * 2) * 0.3;
      astronotRef.current.position.set(x, y, z);
      astronotRef.current.rotation.y += 0.004;
    }
  });

  return (
    <group
      ref={astronotRef}
      onClick={(event) => {
        event.stopPropagation();
        onClick(astronotData);
      }}
      // YENİ: Fare olaylarını dinleyen handler'lar
      onPointerOver={(event) => {
        event.stopPropagation();
        setHover(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHover(false);
        document.body.style.cursor = 'default';
      }}
    >
      <primitive
        object={clonedScene}
        scale={0.00099}
        rotation-y={Math.PI / 2}
        frustumCulled={true}
      />

     
      {hovered && (
<<<<<<< HEAD
        <Ring 
          position={[0.5, 0.8, 0]}
          rotation={[Math.PI / 2.5, 0, 0]}
          args={[0.6, 0.7, 64]} 
        >
          <meshBasicMaterial 
            color="#00ffff" 
            transparent 
=======
        <Ring
          position={[0.5, 0.8, 0]} // Astronotun biraz sağına ve yukarısına
          rotation={[Math.PI / 2.5, 0, 0]} // Hafif açılı dursun
          args={[0.6, 0.7, 64]} // İç yarıçap, dış yarıçap, segment sayısı
        >
          <meshBasicMaterial
            color="#00ffff" // Parlak cyan rengi
            transparent
>>>>>>> 44751a7 (feat: 3D galaxy major overhaul - NASA textures, Warp Drive effect, PilotHUD, and premium sidebar UI)
            opacity={0.5}
            blending={THREE.AdditiveBlending} 
            side={THREE.DoubleSide}
          />
        </Ring>
      )}

      {/* Hover İsim Etiketi */}
      {hovered && (
        <Html position={[0, 1.5, 0]} center style={{ pointerEvents: 'none', transition: 'opacity 0.2s', zIndex: 50 }}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)', padding: '4px 12px',
            borderRadius: '16px', border: '1px solid #5eead4', color: '#5eead4',
            whiteSpace: 'nowrap', fontSize: '12px', fontWeight: 'bold', backdropFilter: 'blur(4px)'
          }}>
            {astronotData.name}
          </div>
        </Html>
      )}
    </group>
  );
};

useGLTF.preload('/models/astronot.glb');

<<<<<<< HEAD
export default Astronot;
=======
export default memo(Astronot);
>>>>>>> 44751a7 (feat: 3D galaxy major overhaul - NASA textures, Warp Drive effect, PilotHUD, and premium sidebar UI)
