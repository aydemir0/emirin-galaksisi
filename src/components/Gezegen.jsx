"use client";

import React, { useRef, useState, memo, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Html, Trail } from '@react-three/drei';
import * as THREE from 'three';
import Ay from './Ay';

const Gezegen = ({ gezegenData, onGezegenClick }) => {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const renkHaritasi = useLoader(THREE.TextureLoader, gezegenData.textureUrl || '/textures/earth.jpg');

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
    <Trail
      width={1.5}
      length={8}
      color={gezegenData.color || '#ffffff'}
      attenuation={(t) => t * t}
    >
    <mesh
      ref={meshRef}
      castShadow={true}
      receiveShadow={true}
      onClick={(event) => {
        event.stopPropagation();
        onGezegenClick(gezegenData);
      }}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHover(false); document.body.style.cursor = 'default'; }}
    >
      <sphereGeometry args={[gezegenData.size, 64, 64]} />
      <meshPhysicalMaterial
        map={renkHaritasi}
        color={gezegenData.color || '#ffffff'}
        emissive={hovered ? (gezegenData.color !== '#ffffff' ? gezegenData.color : '#aaaaaa') : '#000000'}
        emissiveIntensity={hovered ? 0.4 : 0}
        roughness={0.6}
        metalness={0.1}
        clearcoat={0.2}
        clearcoatRoughness={0.4}
      />

      {/* Gezegen Hover Hologram Efekti */}
      {hovered && (
        <mesh scale={[1.05, 1.05, 1.05]}>
          <sphereGeometry args={[gezegenData.size, 16, 16]} />
          <meshBasicMaterial 
            color={gezegenData.color !== '#ffffff' ? gezegenData.color : '#5eead4'} 
            wireframe 
            transparent 
            opacity={0.5} 
          />
        </mesh>
      )}

      {/* Büyük Gezegenler İçin Uydu (Ay) */}
      {gezegenData.size >= 0.8 && gezegenData.id !== 'kampus-sosyal' && (
        <mesh position={[gezegenData.size + 0.5, 0, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.8} />
        </mesh>
      )}

      {/* Gezegen Halkası (Eğer varsa) */}
      {gezegenData.hasRing && (
        <mesh rotation-x={Math.PI / 2}>
          <ringGeometry args={[gezegenData.size * 1.3, gezegenData.size * 1.8, 64]} />
          <meshStandardMaterial 
            color={gezegenData.ringColor || gezegenData.color || '#ffffff'} 
            transparent 
            opacity={0.5} 
            side={THREE.DoubleSide} 
          />
        </mesh>
      )}

      {/* Özel Efekt: Veri Aurası ve Atmosfer */}
      {gezegenData.specialEffect === 'earth-atmosphere' && (
        <DataAura size={gezegenData.size} color="#38bdf8" />
      )}

      {gezegenData.id === 'kampus-sosyal' && <Ay />}
      
      {/* Hover İsim Etiketi ve Hedef Kilitlenme (Targeting HUD) */}
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
      
      {hovered && (
        <Html position={[0, 0, 0]} center style={{ pointerEvents: 'none', zIndex: 40 }}>
          <div style={{
            width: '120px', height: '120px',
            border: `2px dashed ${gezegenData.color || '#5eead4'}`,
            borderRadius: '50%',
            animation: 'spin 4s linear infinite',
            opacity: 0.8,
            boxShadow: `0 0 15px ${gezegenData.color || '#5eead4'}`
          }}>
            <div style={{ position: 'absolute', top: '-10px', left: '50%', width: '4px', height: '20px', background: gezegenData.color || '#5eead4', transform: 'translateX(-50%)' }} />
            <div style={{ position: 'absolute', bottom: '-10px', left: '50%', width: '4px', height: '20px', background: gezegenData.color || '#5eead4', transform: 'translateX(-50%)' }} />
            <div style={{ position: 'absolute', left: '-10px', top: '50%', width: '20px', height: '4px', background: gezegenData.color || '#5eead4', transform: 'translateY(-50%)' }} />
            <div style={{ position: 'absolute', right: '-10px', top: '50%', width: '20px', height: '4px', background: gezegenData.color || '#5eead4', transform: 'translateY(-50%)' }} />
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes spin { 100% { transform: rotate(360deg); } }
          `}} />
        </Html>
      )}
    </mesh>
    </Trail>
  );
};

const DataAura = memo(({ size, color }) => {
  const pointsRef = useRef();
  
  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.002;
      pointsRef.current.rotation.z += 0.001;
    }
  });
  
  const pts = useMemo(() => {
    const particleCount = 400;
    const arr = new Float32Array(particleCount * 3);
    for(let i=0; i<particleCount; i++) {
       const angle = Math.random() * Math.PI * 2;
       // Dağınık, yörünge etrafında süzülen veri ağı (Network)
       const r = size * 1.5 + (Math.random() - 0.5) * 0.4;
       arr[i*3] = Math.cos(angle) * r;
       arr[i*3+1] = (Math.random() - 0.5) * (size * 0.8);
       arr[i*3+2] = Math.sin(angle) * r;
    }
    return arr;
  }, [size]);

  return (
    <group>
      {/* İnce Atmosfer Parıltısı */}
      <mesh scale={[1.15, 1.15, 1.15]}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Dijital Veri Parçacıkları Ağı */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={400} array={pts} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color={color} size={0.03} transparent opacity={0.8} blending={THREE.AdditiveBlending} />
      </points>
    </group>
  );
});

export default memo(Gezegen);