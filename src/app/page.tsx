"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Ring } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import { ThreeEvent } from '@react-three/fiber';

// Components
import Gezegen from '@/components/Gezegen';
import Gunes from '@/components/Gunes';
import BilgiPaneli from '@/components/BilgiPaneli';
import ArkaPlan from '@/components/ArkaPlan';
import UzayGemisi from '@/components/UzayGemisi';
import YildizKumesi from '@/components/YildizKumesi';
import UzayIstasyonu from '@/components/UzayIstasyonu';
import Astronot from '@/components/Astronot';
import HaberlesmeUydusu from '@/components/HaberlesmeUydusu';
import YeteneklerUydusu from '@/components/YeteneklerUydusu';
import Uydu from '@/components/Uydu';

// Data
import { projects, profileOrbits, blogData } from '@/data/data';

// Types
import { Project, ProfileOrbit, BlogPost, BlogPanelData } from '@/types/types';

export default function Home() {
  const [seciliProje, setSeciliProje] = useState<Project | ProfileOrbit | BlogPanelData | null>(null);
  const [gunesMenuAcik, setGunesMenuAcik] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    if (typeof window !== 'undefined' && db) {
      const getPosts = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "blogPosts"));
          const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as BlogPost[];
          setBlogPosts(posts);
        } catch (error) {
          console.error("Firebase'den blog yazıları çekilirken hata:", error);
        } finally {
          setLoading(false);
        }
      };
      getPosts();
    } else {
      setLoading(false);
    }
  }, []);

  const odysseyData: ProfileOrbit = {
    id: 'odyssey', name: 'The Odyssey', color: '#C0C0C0',
    description: "Bu galaksi, tamamlanmış projelerden oluşan bir anı defteri. Bu gemi ise geleceğe yazılacak yeni anıların habercisi...",
    imageUrl: '/images/odyssey_image.png',
    size: 0, orbitRadius: 0, orbitSpeed: 0, angleOffset: 0,
  };

  const handleGezegenClick = (projeData: Project) => {
    if (seciliProje && seciliProje.id === projeData.id) {
        setSeciliProje(null);
    } else {
        setSeciliProje(projeData);
        setGunesMenuAcik(false);
    }
  };

  const handleGunesClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setGunesMenuAcik(prev => !prev);
    setSeciliProje(null);
  };

  const handleUyduClick = (uyduData: ProfileOrbit) => {
    if (seciliProje && seciliProje.id === uyduData.id) {
        setSeciliProje(null);
    } else {
        setSeciliProje(uyduData);
    }
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

  // Performance Optimization: Memoize the planet and orbit components
  const planets = useMemo(() => {
    if (gunesMenuAcik) return null;
    return projects.map((proje) => (
      <React.Fragment key={proje.id}>
        <Ring args={[proje.orbitRadius - 0.02, proje.orbitRadius + 0.02, 128]} rotation-x={-Math.PI / 2}>
          <meshBasicMaterial color={proje.color} transparent opacity={0.25} />
        </Ring>
        <Gezegen gezegenData={proje} onGezegenClick={handleGezegenClick} />
      </React.Fragment>
    ));
  }, [gunesMenuAcik, projects]);

  const sunSatellites = useMemo(() => {
    if (!gunesMenuAcik) return null;
    return profileOrbits.map((uydu) => {
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
    });
  }, [gunesMenuAcik, profileOrbits]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'black', color: 'white' }}>
        Yükleniyor...
      </div>
    );
  }

  return (
    <main style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'row', backgroundColor: 'black' }}>
      <div style={{ flex: 1, height: '100%', position: 'relative' }}>
        <Canvas camera={{ position: [0, 5, 15], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[0, 0, 0]} intensity={150} />
          <OrbitControls />
          <ArkaPlan onClick={handleKapat} />
          <YildizKumesi position={yildizKumesiPozisyonu} onClick={handleYildizKumesiClick} />
          
          <Gunes onClick={handleGunesClick} isActive={gunesMenuAcik} />
          <UzayGemisi 
            scale={0.5} 
            onClick={(event: ThreeEvent<MouseEvent>) => { 
              event.stopPropagation(); 
              setSeciliProje(odysseyData); 
            }} 
          />
          {planets}
          {sunSatellites}
          <EffectComposer>
            <Bloom intensity={1.2} luminanceThreshold={0.4} />
          </EffectComposer>
        </Canvas>
      </div>
      <div style={{
        width: seciliProje ? (isMobile ? '100%' : '33.33%') : '0%',
        height: '100%',
        transition: 'width 0.5s ease-in-out',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        overflow: 'hidden',
        position: isMobile && seciliProje ? 'absolute' : 'relative',
        right: 0,
        top: 0,
        zIndex: 10
      }}>
        <BilgiPaneli proje={seciliProje} onClose={handleKapat} />
      </div>
    </main>
  );
}
