"use client";

import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const AsteroitKusagi = ({ radius = 9.5, count = 800, speed = 0.0003, color = "#64748b" }) => {
  const meshRef = useRef();
  const dummy = new THREE.Object3D();

  useEffect(() => {
    if (meshRef.current) {
      for (let i = 0; i < count; i++) {
        // Belt width is about 1.5 units
        const r = radius + (Math.random() - 0.5) * 1.5;
        const theta = Math.random() * 2 * Math.PI;
        
        // Distribution of y is tighter in the middle
        const y = (Math.random() - 0.5) * (Math.random() * 0.8);
        
        dummy.position.set(r * Math.cos(theta), y, r * Math.sin(theta));
        
        // Random rotation
        dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        
        // Random scale (some big, mostly small)
        const scale = Math.random() > 0.9 ? Math.random() * 0.06 + 0.02 : Math.random() * 0.03 + 0.005;
        dummy.scale.set(scale, scale, scale);
        
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [count, radius]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y -= speed;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={color} roughness={0.9} metalness={0.1} />
    </instancedMesh>
  );
};

export default AsteroitKusagi;
