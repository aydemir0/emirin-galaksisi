"use client";
import React from "react";
import { projects } from "../data/projects";

const Minimap = () => {
  return (
    <div style={{
      position: "fixed", bottom: "20px", right: "20px",
      width: "180px", height: "180px",
      borderRadius: "50%",
      border: "2px solid rgba(94, 234, 212, 0.5)",
      background: "radial-gradient(circle, rgba(15, 23, 42, 0.9) 0%, rgba(0, 0, 0, 0.9) 100%)",
      boxShadow: "0 0 20px rgba(94, 234, 212, 0.2)",
      zIndex: 90, display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden"
    }}>
      {/* Sun / Merkez */}
      <div style={{
        position: "absolute", width: "12px", height: "12px",
        background: "#facc15", borderRadius: "50%",
        boxShadow: "0 0 10px #facc15"
      }} />
      
      {/* Radar Çizgisi Animasyonu */}
      <div style={{
        position: "absolute", width: "50%", height: "50%", top: 0, left: "50%",
        transformOrigin: "bottom left",
        background: "linear-gradient(90deg, rgba(94,234,212,0.8) 0%, transparent 100%)",
        animation: "radarScan 4s linear infinite"
      }} />

      {/* Gezegen Yörüngeleri ve CSS Animasyonlu Noktalar */}
      {projects.map((proje, index) => {
        // 3D uzaydaki orbitSpeed ve radius değerlerini 2D CSS e scale ediyoruz
        const maxRadius3D = Math.max(...projects.map(p => p.orbitRadius));
        const cssRadius = (proje.orbitRadius / maxRadius3D) * 80; // max 80px
        const cssDuration = (Math.PI * 2) / proje.orbitSpeed; 

        return (
          <div key={proje.id} style={{
            position: "absolute",
            width: `${cssRadius * 2}px`, height: `${cssRadius * 2}px`,
            borderRadius: "50%", border: "1px dashed rgba(255,255,255,0.1)",
            animation: `spinRadar ${cssDuration}s linear infinite`,
            // 3D başlangıç açısını CSS e yansıt
            animationDelay: `-${proje.startingAngle || 0}s`
          }}>
            <div style={{
              position: "absolute", top: "-3px", left: "50%", transform: "translateX(-50%)",
              width: "6px", height: "6px", borderRadius: "50%",
              background: proje.color || "#ffffff",
              boxShadow: `0 0 5px ${proje.color || "#ffffff"}`
            }} />
          </div>
        );
      })}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes radarScan {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinRadar {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
};

export default Minimap;
