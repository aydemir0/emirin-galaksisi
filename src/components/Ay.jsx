// src/components/Ay.jsx
"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Ay = () => {
  const ayRef = useRef();

  useFrame(({ clock }) => {
    if (ayRef.current) {
      // Bu Ay'ın, içinde bulunduğu gezegenin etrafındaki yörüngesi
      const yorungeHizi = 1;
      const yorungeYaricapi = 1.2;
      const angle = clock.getElapsedTime() * yorungeHizi;
      
      const x = yorungeYaricapi * Math.sin(angle);
      const z = yorungeYaricapi * Math.cos(angle);
      
      ayRef.current.position.set(x, 0, z);

      // Ay'ın kendi etrafında dönmesi
      ayRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={ayRef}>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial color="#A9A9A9" />
    </mesh>
  );
};

export default Ay;