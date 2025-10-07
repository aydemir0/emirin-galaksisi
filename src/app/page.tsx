"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { projects } from "../data/projects";
import Gezegen from "../components/Gezegen";
import Gunes from "../components/Gunes";
import ArkaPlan from "../components/ArkaPlan";
import Image from "next/image";


// Profil Kartı için veri ve component tanımları
const profileData = { name: "Muhammed Emin Aydın", title: "Yazılım Mühendisi Adayı", bio: "Teknolojiye olan merakım ve problem çözme tutkum beni yazılım mühendisliği alanına yönlendirdi...", imageUrl: "/images/profil.jpg", githubUrl: "https://github.com/aydemir0", };
const ProfilKarti = ({ onClose }: { onClose: () => void }) => {
  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }} onClick={onClose}>
      <div style={{ position: 'relative', backgroundColor: '#111827', color: 'white', borderRadius: '1rem', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)', maxWidth: '28rem', width: '90%', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '1.5rem' }}>&times;</button>
        <div style={{ position: 'relative', width: '8rem', height: '8rem', borderRadius: '9999px', overflow: 'hidden', border: '4px solid #374151' }}><Image src={profileData.imageUrl} alt="Profil" layout="fill" objectFit="cover" /></div>
        <div style={{ textAlign: 'center' }}><h2 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>{profileData.name}</h2><p style={{ fontSize: '1.125rem', color: '#5eead4' }}>{profileData.title}</p></div>
        <p style={{ color: '#d1d5db', lineHeight: '1.625', textAlign: 'center' }}>{profileData.bio}</p>
        <a href={profileData.githubUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', backgroundColor: '#2563eb', padding: '0.75rem 1rem', borderRadius: '0.5rem', textAlign: 'center', textDecoration: 'none', color: 'white', fontWeight: 'bold', marginTop: '1rem' }}>GitHub Profili</a>
      </div>
    </div>
  );
}; 

export default function Home() {
  const [seciliProje, setSeciliProje] = useState(null);

  const handleGezegenClick = (projeData: any) => {
    if (seciliProje && seciliProje.id === projeData.id) {
      setSeciliProje(null);
    } else {
      setSeciliProje(projeData);
    }
  };
const handleGunesClick = (event: any) => {
    event.stopPropagation();
    console.log("--- handleGunesClick fonksiyonu çalıştı ---");
    setSeciliProje('gunes');
  };

  const handleKapat = () => {
    setSeciliProje(null);
  }

 console.log("<<< Home componenti render ediliyor. 'seciliProje' değeri:", seciliProje, ">>>");

  return (
    <main style={{ height: '100vh', width: '100vw', display: 'flex', backgroundColor: 'black' }}>

      {/* SOL TARAF: 3D SAHNE */}
      <div style={{ height: '100%', width: seciliProje ? '66.66%' : '100%', transition: 'width 0.5s ease-in-out' }}>
        <Canvas
          style={{ height: '100%', width: '100%' }}
          camera={{ position: [0, 5, 15], fov: 45 }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[0, 0, 0]} intensity={150} />
          <OrbitControls />
          <ArkaPlan onClick={handleKapat} /> {/* Kapatma fonksiyonunu buraya bağladık */}
         <Gunes 
  onClick={handleGunesClick} 
  isActive={seciliProje === 'gunes'}
/>
          {projects.map((proje) => (
            <Gezegen
              key={proje.id}
              {...proje}
              onGezegenClick={(projeData: any, event: any) => {
                event.stopPropagation();
                handleGezegenClick(projeData);
              }}
            />
          ))}
          <EffectComposer>
            <Bloom intensity={1.2} luminanceThreshold={0.4} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* SAĞ TARAF: BİLGİ PANELİ */}
      <div style={{
        height: '100%',
        width: seciliProje ? '33.33%' : '0%',
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(10px)',
        borderLeft: '1px solid rgba(51, 65, 85, 1)',
        transition: 'width 0.5s ease-in-out',
        overflow: 'hidden'
      }}>
        {seciliProje && (
          <div style={{ padding: '2.5rem', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', color: '#cbd5e1' }}>
            <button onClick={handleKapat} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '2rem', zIndex: 10 }}>
              &times;
            </button>

            <div style={{ position: 'relative', width: '100%', height: '12rem', marginBottom: '1.5rem', borderRadius: '0.5rem', overflow: 'hidden', backgroundColor: '#1e293b' }}>
              <Image
                src={seciliProje.imageUrl}
                alt={`${seciliProje.name} Logosu`}
                layout="fill"
                objectFit="cover"
              />
            </div>

            <div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', lineHeight: 1.2, color: seciliProje.color }}>
                {seciliProje.name}
              </h2>
              <p style={{ color: '#5eead4', fontWeight: '600', marginTop: '0.5rem' }}>{seciliProje.completionDate}</p>
            </div>

            <p style={{ color: '#e2e8f0', fontSize: '1.1rem', lineHeight: '1.75', marginTop: '1.5rem' }}>{seciliProje.description}</p>

            <hr style={{ borderColor: '#334155', margin: '2rem 0' }} />

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'white', marginBottom: '1rem' }}>README.md</h3>
              <code style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.3)', color: '#d1d5db', padding: '1.5rem', borderRadius: '0.75rem', whiteSpace: 'pre-wrap', fontSize: '0.9rem', fontFamily: 'monospace' }}>
                {seciliProje.readme}
              </code>
            </div>

            <div style={{ flexGrow: 1 }}></div>

            <a href={seciliProje.githubUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', backgroundColor: '#2563eb', color: 'white', fontWeight: 'bold', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center', textDecoration: 'none', transition: 'transform 0.2s', marginTop: '2rem' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
              GitHub'da Görüntüle
            </a>

            <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.75rem', color: '#64748b' }}>
              İncelediğiniz için teşekkürler!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}