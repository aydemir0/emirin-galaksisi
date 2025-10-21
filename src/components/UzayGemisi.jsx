"use client";

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';


const ORBIT_RADIUS_X = 12; 
const ORBIT_RADIUS_Z = 12; 
const ORBIT_SPEED = 0.08;  
const TILT_AMPLITUDE = 1.5; 

const UzayGemisi = (props) => {
  const { scene } = useGLTF('/models/uzay-gemisi.glb');
  const gemiRef = useRef();

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
      
      gemiRef.current.lookAt(nextX, nextY, nextZ);
    }
  });

  return (
    <group ref={gemiRef} {...props}>
     
      <primitive object={scene} rotation-y={Math.PI} />
    </group>
  );
};

useGLTF.preload('/models/uzay-gemisi.glb');

export default UzayGemisi;
