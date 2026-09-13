"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import { projects } from "../data/projects";
import Gezegen from "../components/Gezegen";
import Gunes from "../components/Gunes";
import ArkaPlan from "../components/ArkaPlan";

// ==================================================================
// ProjeDetaylari BİLEŞENİ
// ==================================================================
const ProjeDetaylari = ({ proje }: { proje: any }) => { // TypeScript için tip ekledik
  if (!proje) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 px-4">
        <p className="text-xl text-center">Detayları görmek için bir gezegen seçin.</p>
      </div>
    );
  }

  const CheckIcon = () => (
    <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
  );

  return (
    <div className="p-6 md:p-8 h-full overflow-y-auto bg-gray-200 text-gray-800 animate-slideInFromRight">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">{proje.name}</h2>
      <p className="text-sm text-blue-600 font-semibold mb-6">{proje.completionDate}</p>
      <p className="text-base md:text-lg mb-8 leading-relaxed text-gray-700">{proje.description}</p>
      
      {proje.features && proje.features.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-black mb-4">Öne Çıkan Özellikler</h3>
          <ul className="space-y-3">
            {proje.features.map((feature: string, index: number) => ( // TypeScript için tip ekledik
              <li key={index} className="flex items-start">
                <CheckIcon />
                <span className="ml-3 text-gray-800">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {proje.technologies && proje.technologies.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-black mb-3">Kullanılan Teknolojiler</h3>
          <div className="flex flex-wrap gap-2">
            {proje.technologies.map((tech: string) => ( // TypeScript için tip ekledik
              <span key={tech} className="bg-gray-300 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      <a 
        href={proje.githubUrl} 
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-gray-800 hover:bg-black text-white font-bold py-3 px-4 rounded-lg text-center transition-colors text-lg mt-auto"
      >
        GitHub'da Görüntüle
      </a>
    </div>
  );
};
// ==================================================================


export default function Home() {
  const [seciliProje, setSeciliProje] = useState(null);

  const handleGezegenClick = (projeData: any) => { // TypeScript için tip ekledik
    setSeciliProje(projeData);
  };

  return (
    <main className="h-screen w-screen flex bg-black">
      
      <div className="w-3/4 h-full">
        <Canvas 
          className="h-full w-full"
          camera={{ position: [0, 5, 15], fov: 45 }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[0, 0, 0]} intensity={150} />
          <OrbitControls />
          <ArkaPlan />
          <Gunes />
          {projects.map((proje) => (
            <Gezegen
              key={proje.id}
              {...proje}
              onGezegenClick={(projeData: any, event: any) => { // TypeScript için tip ekledik
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

      <div className="w-1/4 h-full border-l border-gray-700">
        <ProjeDetaylari proje={seciliProje} />
      </div>

    </main>
  );
}