
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { OrbitControls, Ring } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Canvas, ThreeEvent } from "@react-three/fiber";
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

// --- TİP TANIMLAMALARI (INTERFACES) ---

interface Project {
  id: string; name: string; size: number; orbitRadius: number;
  orbitSpeed: number; description: string; githubUrl: string;
  textureUrl: string; color: string; completionDate: string;
  imageUrl: string; readme: string; imagePosition?: string;
}

interface ProfileOrbit {
  id: string; name: string; size: number; orbitRadius: number;
  orbitSpeed: number; angleOffset: number; color: string;
  description: string; imageUrl: string; imagePosition?: string;
  links?: { name: string; url: string }[];
  skills?: Record<string, string[]>;
  email?: string;
}

interface BlogPost {
  id: string; title: string; url: string;
  publicationDate: string; excerpt: string; content: string;
}

interface BlogPanelData {
  id: string; name: string; color: string;
  description: string; imageUrl: string; imagePosition?: string;
  posts: BlogPost[];
}

// seciliProje'nin alabileceği tüm tipleri birleştirelim
type SeciliProjeData = Project | ProfileOrbit | BlogPanelData;

// --- TİP TANIMLAMALARI SONU ---

export default function Home() {
  const [seciliProje, setSeciliProje] = useState<SeciliProjeData | null>(null);
  const [gunesMenuAcik, setGunesMenuAcik] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'a') {
        setAdminMode(prevMode => !prevMode);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogPosts"));
        const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as BlogPost[];
        setBlogPosts(posts);
      } catch (error) {
        console.error("Firebase'den blog yazıları çekilirken hata:", error);
      }
    };
    getPosts();
  }, []);

  const odysseyData: ProfileOrbit = {
    id: 'odyssey', name: 'The Odyssey', color: '#C0C0C0',
    description: "Bu galaksi, tamamlanmış projelerden oluşan bir anı defteri. Bu gemi ise geleceğe yazılacak yeni anıların habercisi...",
    imageUrl: '/images/odyssey_image.png',
    // Diğer ProfileOrbit özelliklerini varsayılan değerlerle ekleyelim
    size: 0, orbitRadius: 0, orbitSpeed: 0, angleOffset: 0,
  };

  const handleGezegenClick = (projeData: Project) => {
    if (seciliProje && seciliProje.id === projeData.id) setSeciliProje(null);
    else { setSeciliProje(projeData); setGunesMenuAcik(false); }
  };

  const handleGunesClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setGunesMenuAcik(!gunesMenuAcik);
    setSeciliProje(null);
  };

  const handleUyduClick = (uyduData: ProfileOrbit) => {
    if (seciliProje && seciliProje.id === uyduData.id) setSeciliProje(null);
    else setSeciliProje(uyduData);
  };

  const handleKapat = () => {
    setSeciliProje(null);
    setGunesMenuAcik(false);
  };

  const handleYildizKumesiClick = () => {
    const blogPanelData: BlogPanelData = {
      ...blogData.panelInfo,
      posts: blogPosts,
    };
    setSeciliProje(blogPanelData);
    setGunesMenuAcik(false);
  };

  const enUzakYorunge = projects.length > 0 ? Math.max(...projects.map(p => p.orbitRadius)) : 0;
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
          <UzayGemisi 
  scale={0.5} 
  onClick={(event: ThreeEvent<MouseEvent>) => { 
    event.stopPropagation(); 
    setSeciliProje(odysseyData); 
  }} 
/>

          {gunesMenuAcik && profileOrbits.map((uydu) => {
            if (uydu.id === 'iletisim') {
              return <UzayIstasyonu key={uydu.id} istasyonData={uydu} onClick={handleUyduClick} />;
            } else if (uydu.id === 'profil') {
              return <Astronot key={uydu.id} astronotData={uydu} onClick={handleUyduClick} />;
            } else if (uydu.id === 'sosyal-medya') {
              return <HaberlesmeUydusu key={uydu.id} uyduData={uydu} onClick={handleUyduClick} />;
            } else if (uydu.id === 'yetenekler') {
              return <YeteneklerUydusu key={uydu.id} uyduData={uydu} onClick={handleUyduClick} />;
            } else {
              return <Uydu key={uydu.id} uyduData={uydu} onUyduClick={handleUyduClick} />;
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
      {adminMode && (
        <Link href="/admin/add-post" passHref legacyBehavior>
          <a style={{
            position: 'fixed', bottom: '20px', right: '20px',
            padding: '10px 20px', backgroundColor: '#f3a683',
            color: 'black', borderRadius: '8px',
            textDecoration: 'none', fontWeight: 'bold',
            zIndex: 100, cursor: 'pointer', animation: 'fadeIn 0.5s'
          }}>
            Yeni Yazı Ekle
          </a>
        </Link>
      )}
    </main>
  );
}
