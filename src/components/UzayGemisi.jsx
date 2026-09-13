// src/components/UzayGemisi.jsx
"use client";

import React, { useRef, useState, memo } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

// Animasyon ayarlarını buradan kolayca değiştirebiliriz
const ORBIT_RADIUS_X = 12; // Yörüngenin genişliği
const ORBIT_RADIUS_Z = 12; // Yörüngenin derinliği (X ile aynı olursa daire olur)
const ORBIT_SPEED = 0.08;  // Geminin yörüngedeki hızı
const TILT_AMPLITUDE = 1.5; // Yörüngenin dikey eğim miktarı

const UzayGemisi = (props) => {
  const { scene } = useGLTF('/models/uzay-gemisi.glb');
  const clonedScene = scene.clone();
  const gemiRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [pilotMode, setPilotMode] = useState(false);
  const keys = useRef({ w: false, a: false, s: false, d: false, shift: false });
  const [lasers, setLasers] = useState([]);

  // Lazer Sınıfı
  const Laser = memo(({ pos, rot }) => {
    const meshRef = useRef();
    useFrame(() => {
      if (meshRef.current) {
        meshRef.current.translateZ(2.5); // Lazer hızı (çok hızlı)
      }
    });
    return (
      <mesh ref={meshRef} position={pos} rotation={rot}>
        <cylinderGeometry args={[0.05, 0.05, 3, 8]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>
    );
  });

  // WASD Kontrolleri
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (keys.current.hasOwnProperty(key)) keys.current[key] = true;
      if (key === 'p') setPilotMode(p => !p); // Pilot modunu aç/kapat
      if (key === ' ' && pilotMode && gemiRef.current) {
        // Ateş Etme (Boşluk Tuşu)
        setLasers(prev => [
          ...prev, 
          { 
            id: Date.now(), 
            pos: [gemiRef.current.position.x, gemiRef.current.position.y, gemiRef.current.position.z],
            rot: [gemiRef.current.rotation.x, gemiRef.current.rotation.y, gemiRef.current.rotation.z] 
          }
        ]);
        
        // 3 Saniye sonra mermiyi bellekten sil (performans için)
        setTimeout(() => {
          setLasers(prev => prev.slice(1));
        }, 3000);
      }
    };
    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (keys.current.hasOwnProperty(key)) keys.current[key] = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [pilotMode]);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (gemiRef.current) {
      if (!pilotMode) {
        // OTOMATİK PİLOT (Yörünge Modu)
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
      } else {
        // MANUEL PİLOT MODU (WASD)
        const isBoosting = keys.current.shift;
        const speed = isBoosting ? 0.8 : 0.2;
        
        if (keys.current.w) gemiRef.current.translateZ(speed); // Gemi ters dönük olduğu için +Z ileri
        if (keys.current.s) gemiRef.current.translateZ(-speed);
        if (keys.current.a) gemiRef.current.rotation.y += 0.05; // Sola dön
        if (keys.current.d) gemiRef.current.rotation.y -= 0.05; // Sağa dön
      }
    }
  });

  return (
    <>
    <group 
      ref={gemiRef} 
      {...props}
      onClick={(e) => { e.stopPropagation(); setPilotMode(p => !p); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
    >
      <primitive object={clonedScene} rotation-y={Math.PI} frustumCulled={true} />
      
      {/* Geminin İtici Motor Işığı (Engine Glow) - Boost modunda daha büyük olur */}
      <pointLight position={[0, 0, -1.5]} distance={5} intensity={keys.current?.shift ? 5 : 2} color="#5eead4" />
      <mesh position={[0, 0, -1.2]}>
        <sphereGeometry args={[keys.current?.shift ? 0.6 : 0.3, 8, 8]} />
        <meshBasicMaterial color="#5eead4" transparent opacity={0.6} />
      </mesh>
      
      {/* Hover İsim Etiketi */}
      {hovered && !pilotMode && (
        <Html position={[0, 2, 0]} center style={{ pointerEvents: 'none', transition: 'opacity 0.2s', zIndex: 50 }}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)', padding: '4px 12px',
            borderRadius: '16px', border: '1px solid #10b981', color: '#10b981',
            whiteSpace: 'nowrap', fontSize: '12px', fontWeight: 'bold', backdropFilter: 'blur(4px)'
          }}>
            The Odyssey (WASD İçin 'P', Işık Hızı İçin 'Shift', Lazer İçin 'Boşluk')
          </div>
        </Html>
      )}

      {/* Pilot Modu Açıkken Üstünde Yazan Uyarı */}
      {pilotMode && (
        <Html position={[0, 2.5, 0]} center style={{ pointerEvents: 'none' }}>
          <div style={{
            background: 'rgba(220, 38, 38, 0.8)', padding: '4px 12px',
            borderRadius: '16px', border: '1px solid #f87171', color: 'white',
            whiteSpace: 'nowrap', fontSize: '12px', fontWeight: 'bold',
            animation: 'pulse 1s infinite'
          }}>
            PİLOT MODU (Ateş Etmek İçin SPACE)
          </div>
        </Html>
      )}
    </group>
    {/* Uzay boşluğuna atılan bağımsız Lazerler */}
    {lasers.map(l => <Laser key={l.id} pos={l.pos} rot={l.rot} />)}
    </>
  );
};

useGLTF.preload('/models/uzay-gemisi.glb');

export default memo(UzayGemisi);