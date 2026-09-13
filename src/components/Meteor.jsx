"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Meteor = () => {
  const meshRef = useRef();
  const [position, setPosition] = useState(() => [
    (Math.random() - 0.5) * 100,
    30 + Math.random() * 20,
    (Math.random() - 0.5) * 100
  ]);
  const [velocity] = useState(() => new THREE.Vector3(
    -0.5 - Math.random() * 1,
    -1.5 - Math.random() * 2,
    -0.5 - Math.random() * 1
  ));
  const [rotation] = useState(() => {
    const angle = Math.atan2(velocity.x, velocity.y);
    return new THREE.Euler(0, 0, angle);
  });

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.add(velocity);
      if (meshRef.current.position.y < -50) {
        meshRef.current.position.set(
          (Math.random() - 0.5) * 100,
          30 + Math.random() * 50,
          (Math.random() - 0.5) * 100
        );
      }
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshBasicMaterial color="#ffffff" />
      <mesh position={[0, 1, 0]}>
        <coneGeometry args={[0.1, 2.5, 8]} />
        <meshBasicMaterial color="#5eead4" transparent opacity={0.6} />
      </mesh>
    </mesh>
  );
};

export default Meteor;
