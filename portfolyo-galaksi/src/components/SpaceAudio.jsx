"use client";

import React, { useState, useEffect, useRef } from "react";

export default function SpaceAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const oscillatorsRef = useRef([]);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!isPlaying) {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      
      // Create a massive, deep space drone
      const freqs = [55, 110, 164.81, 220, 329.63]; // A1, A2, E3, A3, E4
      
      freqs.forEach(freq => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        // Add subtle detune for a chorusing/spacey effect
        osc.detune.setValueAtTime(Math.random() * 10 - 5, ctx.currentTime);
        
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 2); // Fade in
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        
        oscillatorsRef.current.push({ osc, gain });
      });
      setIsPlaying(true);
    } else {
      const ctx = audioCtxRef.current;
      oscillatorsRef.current.forEach(({ osc, gain }) => {
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
        setTimeout(() => osc.stop(), 1000);
      });
      oscillatorsRef.current = [];
      setIsPlaying(false);
    }
  };

  return (
    <button 
      onClick={toggleAudio}
      style={{
        position: "fixed", bottom: "20px", left: "20px", zIndex: 100,
        background: "rgba(15, 23, 42, 0.8)", border: "1px solid #5eead4",
        color: "#5eead4", padding: "10px 15px", borderRadius: "8px",
        cursor: "pointer", fontWeight: "bold", backdropFilter: "blur(4px)",
        boxShadow: isPlaying ? "0 0 15px #5eead4" : "none",
        transition: "all 0.3s"
      }}
    >
      {isPlaying ? "🎵 AMBİYANS: AÇIK" : "🔇 AMBİYANS: KAPALI"}
    </button>
  );
}
