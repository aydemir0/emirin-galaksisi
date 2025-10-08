// src/app/page.tsx
"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Ring } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import { projects } from "../data/projects";
import { profileOrbits } from "../data/profileOrbits";
import { blogData } from "../data/blogs";
import Gezegen from "../components/Gezegen";
import Gunes from "../components/Gunes";
import ArkaPlan from "../components/ArkaPlan";
import Uydu from "../components/Uydu";
import BilgiPaneli from "../components/BilgiPaneli";
import UzayGemisi from "../components/UzayGemisi";
import YildizKumesi from "../components/YildizKumesi";
import UzayIstasyonu from "../components/UzayIstasyonu";
import Astronot from "../components/Astronot";
import HaberlesmeUydusu from "../components/HaberlesmeUydusu";
import YeteneklerUydusu from "../components/YeteneklerUydusu";

export default function Home() {
  const [seciliProje, setSeciliProje] = useState(null);
  const [gunesMenuAcik, setGunesMenuAcik] = useState(false);

  const odysseyData = {
    id: 'odyssey', name: 'The Odyssey', color: '#C0C0C0',
    description: "Bu galaksi, tamamlanmış projelerden oluşan bir anı defteri. Bu gemi ise geleceğe yazılacak yeni anıların habercisi...",
    imageUrl: '/images/odyssey_image.png',
  };

  const handleGezegenClick = (projeData) => {
    if (seciliProje && seciliProje.id === projeData.id) setSeciliProje(null);
    else { setSeciliProje(projeData); setGunesMenuAcik(false); }
  };

  const handleGunesClick = (event) => {
    event.stopPropagation();
    setGunesMenuAcik(!gunesMenuAcik);
    setSeciliProje(null);
  };

  const handleUyduClick = (uyduData) => {
    if (seciliProje && seciliProje.id === uyduData.id) setSeciliProje(null);
    else setSeciliProje(uyduData);
  };

  const handleKapat = () => {
    setSeciliProje(null);
    setGunesMenuAcik(false);
  };

  const handleYildizKumesiClick = () => {
    const blogPanelData = { ...blogData.panelInfo, posts: blogData.posts };
    setSeciliProje(blogPanelData);
    setGunesMenuAcik(false);
  };

  const enUzakYorunge = Math.max(...projects.map(p => p.orbitRadius));
  const guvenliMesafe = enUzakYorunge + 4;
  const yildizKumesiPozisyonu = [Math.cos(Math.PI / 4) * -guvenliMesafe, 0, Math.sin(Math.PI / 4) * guvenliMesafe];

  return (
    <main style={{ height: '100vh', width: '100vw', display: 'flex', backgroundColor: 'black' }}>
      <div style={{ height: '100%', width: seciliProje ? '66.66%' : '100%', transition: 'width 0.5s ease-in-out' }}>
        <Canvas camera={{ position: [0, 5, 15], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[0, 0, 0]} intensity={150} />
          <OrbitControls />
          <ArkaPlan onClick={handleKapat} />
          <YildizKumesi position={yildizKumesiPozisyonu} onClick={handleYildizKumesiClick} />
          {!gunesMenuAcik && projects.map(proje => (
            <Ring key={`ring-${proje.id}`} args={[proje.orbitRadius - 0.02, proje.orbitRadius + 0.02, 128]} rotation-x={-Math.PI / 2}>
              <meshBasicMaterial color={proje.color} transparent opacity={0.25} />
            </Ring>
          ))}
          <Gunes onClick={handleGunesClick} isActive={gunesMenuAcik} />
          <UzayGemisi scale={0.5} onClick={(event) => { event.stopPropagation(); setSeciliProje(odysseyData); }} />

          {gunesMenuAcik && profileOrbits.map((uydu) => {
            if (uydu.id === 'iletisim') {
              return <UzayIstasyonu key={uydu.id} istasyonData={uydu} onClick={handleUyduClick} />;
            } else if (uydu.id === 'profil') {
              return <Astronot key={uydu.id} astronotData={uydu} onClick={handleUyduClick} />;
            } else if (uydu.id === 'sosyal-medya') {
              return <HaberlesmeUydusu key={uydu.id} uyduData={uydu} onClick={handleUyduClick} />;
            } else if (uydu.id === 'yetenekler') {
              return <YeteneklerUydusu key={uydu.id} uyduData={uydu} onClick={handleUyduClick} />;
            }
          })}

          {!gunesMenuAcik && projects.map((proje) => (
            <Gezegen key={proje.id} gezegenData={proje} onGezegenClick={handleGezegenClick} />
          ))}

          <EffectComposer>
            <Bloom intensity={1.2} luminanceThreshold={0.4} />
          </EffectComposer>
        </Canvas>
      </div>
      <BilgiPaneli proje={seciliProje} onClose={handleKapat} />
    </main>
  );
}