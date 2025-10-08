// src/components/UzayGemisi.jsx
"use client";

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

// Animasyon ayarlarını buradan kolayca değiştirebiliriz
const ORBIT_RADIUS_X = 12; // Yörüngenin genişliği
const ORBIT_RADIUS_Z = 12; // Yörüngenin derinliği (X ile aynı olursa daire olur)
const ORBIT_SPEED = 0.08;  // Geminin yörüngedeki hızı
const TILT_AMPLITUDE = 1.5; // Yörüngenin dikey eğim miktarı

const UzayGemisi = (props) => {
  const { scene } = useGLTF('/models/uzay-gemisi.glb');
  const gemiRef = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (gemiRef.current) {
      // 1. Geniş, eğimli ve eliptik bir yörünge pozisyonu hesapla
      const angle = elapsedTime * ORBIT_SPEED;
      const x = Math.sin(angle) * ORBIT_RADIUS_X;
      const y = Math.sin(angle) * TILT_AMPLITUDE; // Y ekseninde salınım için
      const z = Math.cos(angle) * ORBIT_RADIUS_Z;
      gemiRef.current.position.set(x, y, z);

      // 2. Geminin gideceği bir sonraki noktayı hesapla (yönünü belirlemek için)
      const nextAngle = (elapsedTime + 0.05) * ORBIT_SPEED;
      const nextX = Math.sin(nextAngle) * ORBIT_RADIUS_X;
      const nextY = Math.sin(nextAngle) * TILT_AMPLITUDE;
      const nextZ = Math.cos(nextAngle) * ORBIT_RADIUS_Z;
      
      // 3. Geminin yüzünü bir sonraki noktaya döndür
      gemiRef.current.lookAt(nextX, nextY, nextZ);
    }
  });

  return (
    <group ref={gemiRef} {...props}>
      {/* Modeli -Z eksenine bakacak şekilde 180 derece döndürüyoruz.
          Çoğu modelin önü +Z eksenine bakar, lookAt'in doğru çalışması için bunu yapıyoruz. */}
      <primitive object={scene} rotation-y={Math.PI} />
    </group>
  );
};

useGLTF.preload('/models/uzay-gemisi.glb');

export default UzayGemisi;