
"use client";

import React, { useRef, useState } from 'react'; 
import { useGLTF, Ring } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three'; 

const Astronot = (props) => {
  const { astronotData, onClick } = props;
  const { scene } = useGLTF('/models/astronot.glb');
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
        object={scene} 
        scale={0.00099}
        rotation-y={Math.PI / 2}
      /> 

     
      {hovered && (
        <Ring 
          position={[0.5, 0.8, 0]}
          rotation={[Math.PI / 2.5, 0, 0]}
          args={[0.6, 0.7, 64]} 
        >
          <meshBasicMaterial 
            color="#00ffff" 
            transparent 
            opacity={0.5}
            blending={THREE.AdditiveBlending} 
            side={THREE.DoubleSide}
          />
        </Ring>
      )}
    </group>
  );
};

useGLTF.preload('/models/astronot.glb');

export default Astronot;
