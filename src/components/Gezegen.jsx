// src/components/Gezegen.jsx
"use client";
import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import Ay from './Ay';

const Gezegen = ({ gezegenData, onGezegenClick }) => {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const renkHaritasi = gezegenData.textureUrl ? useLoader(TextureLoader, gezegenData.textureUrl) : null;

  // Gezegen boyutunu %20 artırıyoruz (Yeni Özellik 1)
  const newSize = gezegenData.size * 1.2; 

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const angle = clock.getElapsedTime() * gezegenData.orbitSpeed;
      const x = gezegenData.orbitRadius * Math.sin(angle);
      const z = gezegenData.orbitRadius * Math.cos(angle);
      const y = Math.sin(angle * (gezegenData.orbitRadius / 2)) * 0.5;
      meshRef.current.position.set(x, y, z);
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group>
      {/* Yörünge Çizgisi (Yeni Özellik 3) - Sadece Gezegen bileşeninde çizmek yerine, page.tsx'te Ring bileşeni zaten var. 
      Ancak, bu bileşenin kendi yörünge çizgisini çizmesini sağlayarak daha modüler hale getirebiliriz. 
      Ancak page.tsx'te zaten Ring bileşeni kullanıldığı için, bu değişikliği page.tsx'te yapmak daha doğru olacaktır. 
      Şimdilik sadece gezegen boyutunu ve hover/click efektini güncelleyelim. */}

      <mesh
        ref={meshRef}
        onClick={(event) => {
          event.stopPropagation();
          onGezegenClick(gezegenData);
        }}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHover(false); document.body.style.cursor = 'default'; }}
      >
        {/* Boyut artırıldı */}
        <sphereGeometry args={[newSize, 32, 32]} /> 
        <meshStandardMaterial
          map={renkHaritasi}
          // Hover/Click Efekti İyileştirildi (Yeni Özellik 2)
          emissive={hovered ? gezegenData.color || '#ffffff' : '#000000'}
          emissiveIntensity={hovered ? 1.5 : 0} // Parlaklık artırıldı
        />
        {gezegenData.id === 'kampus-sosyal' && <Ay />}
      </mesh>
    </group>
  );
};

export default Gezegen;
