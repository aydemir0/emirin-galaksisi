
"use client";

import React, { useState, useEffect, Suspense, lazy, useCallback } from "react";
import Link from "next/link";
import { OrbitControls, Preload, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { db } from "../lib/firebase";
import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { projects } from "../data/projects";
import { profileOrbits } from "../data/profileOrbits";
import { blogData } from "../data/blogs";
import CustomLoader from "./Loader";

// ✅ NORMAL IMPORTS: Kritik ve etkileşimli component'ler (kasma olmaması için)
import Gezegen from "../components/Gezegen";
import Gunes from "../components/Gunes";
import ArkaPlan from "../components/ArkaPlan";
import Uydu from "../components/Uydu";
import BilgiPaneli from "../components/BilgiPaneli"; // Çekmece panel - mutlaka hemen yüklenmeli
import PilotHUD from "../components/PilotHUD"; // Özel Uzay Gemisi HUD Arayüzü
import YildizKumesi from "../components/YildizKumesi";
import Astronot from "../components/Astronot"; // Güneş menüsü - hemen yüklenmeli
import UzayIstasyonu from "../components/UzayIstasyonu"; // Güneş menüsü - hemen yüklenmeli
import HaberlesmeUydusu from "../components/HaberlesmeUydusu"; // Güneş menüsü - hemen yüklenmeli
import YeteneklerUydusu from "../components/YeteneklerUydusu"; // Güneş menüsü - hemen yüklenmeli

// 🚀 LAZY LOADING: Sadece ağır ve kritik olmayan component'ler
const UzayGemisi = lazy(() => import("../components/UzayGemisi")); // Dekoratif, 7.85MB model

// Simple loading fallback component is no longer needed because we will use full-screen Loader from drei
const LoadingFallback = () => null;

interface CameraRigProps {
  isMobile: boolean;
  targetSelected: boolean;
  isWarping: boolean;
}

function CameraRig({ isMobile, targetSelected, isWarping }: CameraRigProps) {
  useFrame((state) => {
    const baseFov = isMobile ? 65 : 45; 
    let targetFov = targetSelected ? (isMobile ? 60 : 35) : baseFov;
    
    // WARP SPEED EFFECT (Sadece FOV değişimi ile yapıyoruz ki OrbitControls bozulmasın)
    if (isWarping) {
      targetFov = 140; // Çok geniş açı (Warp hissi)
    }
    
    const camera = state.camera as THREE.PerspectiveCamera;
    camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.05);
    camera.updateProjectionMatrix();
  });
  return null;
}

// --- TİP TANIMLAMALARI ---
interface Project {
  id: string; name: string; size: number; orbitRadius: number;
  orbitSpeed: number; description: string; githubUrl: string;
  liveUrl?: string;
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

type SeciliProjeData = Project | ProfileOrbit | BlogPanelData;

export default function Home() {
  const [seciliProje, setSeciliProje] = useState<SeciliProjeData | null>(null);
  const [gunesMenuAcik, setGunesMenuAcik] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [warpMode, setWarpMode] = useState(false);


  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'a') setAdminMode(prev => !prev);
    };
    window.addEventListener('keydown', handleKeyDown);
    
    // Check if mobile on mount and resize
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);


  useEffect(() => {
    const getPosts = async () => {
      try {
        // 🚀 Lazy import Firebase Firestore functions
        const { collection, getDocs } = await import("firebase/firestore");
        const querySnapshot = await getDocs(collection(db, "blogPosts"));
        const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as BlogPost[];
        setBlogPosts(posts);
      } catch (error) {
        console.error("Firebase Hatası:", error);
      }
    };
    getPosts();
  }, []);

  const odysseyData: ProfileOrbit = {
    id: 'odyssey', name: 'Kaptan Köşkü', color: '#10b981',
    description: "Kaptan'ın Günlüğü: Yıldız tarihi 2026. Galaksi şimdilik huzurlu. Aydemir yazılım evreninin derinliklerini keşfederek yeni sistemler inşa etmeye devam ediyor. Benimle bu frekanstan (İletişim) bağlantı kurabilirsin!",
    imageUrl: '/images/astronot.png', // Eğer astronot.png varsa güzel olur
    size: 0, orbitRadius: 0, orbitSpeed: 0, angleOffset: 0,
    email: "muhammedeira@gmail.com",
    links: [
      { name: "LinkedIn", url: "https://linkedin.com/in/you" },
      { name: "GitHub", url: "https://github.com/aydemir0" }
    ],
    skills: {
      "Kaptan'ın Cephaneliği": ["React", "Next.js", "Three.js", "Flutter", "Python"]
    }
  };

  const handleGezegenClick = useCallback((projeData: Project) => {
    setSeciliProje(projeData);
    setGunesMenuAcik(false);
  }, []);

  const handleGunesClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setGunesMenuAcik(!gunesMenuAcik);
    setSeciliProje(null);
  }, [gunesMenuAcik]);

  const handleUyduClick = useCallback((uyduData: ProfileOrbit) => {
    setSeciliProje(uyduData);
  }, []);

  const handleKapat = useCallback(() => {
    setSeciliProje(null);
    setGunesMenuAcik(false);
  }, []);

  const handleYildizKumesiClick = useCallback(() => {
    // Firebase'den gelen bloglarla lokaldeki blogları birleştiriyoruz
    const mergedPosts = [...blogData.posts, ...blogPosts];
    const blogPanelData: BlogPanelData = { ...blogData.panelInfo, posts: mergedPosts };
    setSeciliProje(blogPanelData);
    setGunesMenuAcik(false);
  }, [blogPosts]);

  const guvenliMesafe = (projects.length > 0 ? Math.max(...projects.map(p => p.orbitRadius)) : 0) + 4;
  const yildizKumesiPozisyonu: [number, number, number] = [Math.cos(Math.PI / 4) * -guvenliMesafe, 0, Math.sin(Math.PI / 4) * guvenliMesafe];

  return (
    <main style={{ height: '100vh', width: '100vw', backgroundColor: 'black', position: 'relative', overflow: 'hidden' }}>


      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Canvas
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
          gl={{
            powerPreference: "high-performance",
            antialias: true,
            stencil: false,
            depth: true
          }}
          camera={{ position: [0, 5, isMobile ? 25 : 15], fov: isMobile ? 65 : 45 }}
        >
          <CameraRig isMobile={isMobile} targetSelected={!!seciliProje} isWarping={warpMode} />
          <Suspense fallback={<CustomLoader />}>
            <ambientLight intensity={0.5} />
            <pointLight position={[0, 0, 0]} intensity={150} castShadow={false} />
            <OrbitControls enableDamping={true} />
            <ArkaPlan onClick={handleKapat} />
            
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={warpMode ? 10 : 1} />
            
            <YildizKumesi position={yildizKumesiPozisyonu} onClick={handleYildizKumesiClick} />


            <group visible={!gunesMenuAcik}>
              {projects.map(proje => (
                <group key={`yorunge-${proje.id}`} rotation-x={-Math.PI / 2}>
                  <points>
                    <ringGeometry args={[proje.orbitRadius - 0.01, proje.orbitRadius + 0.01, 64]} />
                    <pointsMaterial
                      color={proje.color}
                      size={0.02}
                      transparent
                      opacity={0.4}
                      sizeAttenuation={true}
                    />
                  </points>
                </group>
              ))}
              {projects.map((proje) => (
                <Gezegen key={proje.id} gezegenData={proje} onGezegenClick={handleGezegenClick} />
              ))}
            </group>

            <Gunes onClick={handleGunesClick} isActive={gunesMenuAcik} />

            <UzayGemisi scale={0.5} onClick={(event: ThreeEvent<MouseEvent>) => {
              event.stopPropagation();
              setGunesMenuAcik(false);
              setSeciliProje(null);
              setWarpMode(true);
              
              // 2.5 saniye warp motoru çalışır, sonra paneli açar
              setTimeout(() => {
                setWarpMode(false);
                setSeciliProje(odysseyData);
              }, 2500);
            }} />

            <group visible={gunesMenuAcik}>
              {profileOrbits.map((uydu) => {
                if (uydu.id === 'iletisim') return <UzayIstasyonu key={uydu.id} istasyonData={uydu} onClick={handleUyduClick} />;
                if (uydu.id === 'profil') return <Astronot key={uydu.id} astronotData={uydu} onClick={handleUyduClick} />;
                if (uydu.id === 'sosyal-medya') return <HaberlesmeUydusu key={uydu.id} uyduData={uydu} onClick={handleUyduClick} />;
                if (uydu.id === 'yetenekler') return <YeteneklerUydusu key={uydu.id} uyduData={uydu} onClick={handleUyduClick} />;
                return <Uydu key={uydu.id} uyduData={uydu} onUyduClick={handleUyduClick} />;
              })}
            </group>

            <EffectComposer>
              <Bloom intensity={1.2} luminanceThreshold={0.4} luminanceSmoothing={0.7} mipmapBlur />
            </EffectComposer>

            {/* Force shader compilation to prevent first-click stutter */}
            <Preload all />
          </Suspense>
        </Canvas>
      </div>

      {/* Odyssey Özel Kaptan Köşkü Arayüzü */}
      {seciliProje?.id === 'odyssey' && (
        <PilotHUD data={seciliProje} onClose={handleKapat} />
      )}

      {/* Standart Yandan Açılır Paneller (Gezegenler ve Uydular için) */}
      <div style={{
        position: 'absolute', top: 0, right: 0, height: '100%',
        width: seciliProje && seciliProje.id !== 'odyssey' ? (isMobile ? '100%' : '33.33%') : '0%',
        zIndex: 10, transition: 'width 0.5s ease-in-out',
        backgroundColor: 'rgba(15, 23, 42, 0.98)',
        borderLeft: seciliProje && seciliProje.id !== 'odyssey' ? '1px solid rgba(51, 65, 85, 1)' : 'none',
        overflow: 'hidden', pointerEvents: seciliProje && seciliProje.id !== 'odyssey' ? 'auto' : 'none'
      }}>
        {seciliProje && seciliProje.id !== 'odyssey' && <BilgiPaneli proje={seciliProje} onClose={handleKapat} />}
      </div>

      {adminMode && (
        <Link href="/admin/add-post" passHref legacyBehavior>
          <a style={{
            position: 'fixed', bottom: '20px', right: '20px',
            padding: '10px 20px', backgroundColor: '#f3a683',
            color: 'black', borderRadius: '8px', zIndex: 100, fontWeight: 'bold'
          }}>Yeni Yazı Ekle</a>
        </Link>
      )}
    </main>
  );
}
