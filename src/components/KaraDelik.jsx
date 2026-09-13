"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Html } from "@react-three/drei";

const KaraDelik = ({ position = [50, -25, -40], size = 4 }) => {
  const groupRef = useRef();
  const diskRef = useRef();

  // Accretion disk particles
  const particleCount = 2500;
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const cols = new Float32Array(particleCount * 3);
    const colorObj = new THREE.Color();
    
    for (let i = 0; i < particleCount; i++) {
      const radius = size * 1.2 + Math.random() * size * 2.5;
      const angle = Math.random() * Math.PI * 2;
      
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * (Math.random() * 0.8);
      pos[i * 3 + 2] = Math.sin(angle) * radius;
      
      const mixRatio = (radius - size * 1.2) / (size * 2.5); 
      colorObj.set("#ffffff").lerp(new THREE.Color("#ff4500"), mixRatio);
      
      cols[i * 3] = colorObj.r;
      cols[i * 3 + 1] = colorObj.g;
      cols[i * 3 + 2] = colorObj.b;
    }
    return [pos, cols];
  }, [particleCount, size]);

  useFrame(({ clock }) => {
    if (diskRef.current) {
      diskRef.current.rotation.y -= 0.015;
      groupRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.8) * 1.5;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Olay Ufku (Event Horizon) */}
      <mesh>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      
      {/* Çevresindeki Bükülmüş Işık Haresi (Photon Sphere) */}
      <mesh scale={[1.1, 1.1, 1.1]}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial color="#ff4500" transparent opacity={0.15} blending={THREE.AdditiveBlending} side={THREE.BackSide} />
      </mesh>

      {/* Toplanma Diski (Accretion Disk) */}
      <points ref={diskRef} rotation-x={Math.PI * 0.05} rotation-z={-Math.PI * 0.05}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.15} vertexColors transparent opacity={0.8} blending={THREE.AdditiveBlending} />
      </points>
      
      <Html position={[0, size + 2, 0]} center style={{ pointerEvents: "none", opacity: 0.5 }}>
        <div style={{ color: "#ff4500", fontSize: "10px", letterSpacing: "2px", fontWeight: "bold" }}>
          BİLİNMEYEN ANOMALİ
        </div>
      </Html>
    </group>
  );
};

export default KaraDelik;
