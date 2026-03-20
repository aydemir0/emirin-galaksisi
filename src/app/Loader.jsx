"use client";
import { useProgress, Html } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        width: '100vw', height: '100vh', backgroundColor: '#000', color: '#5eead4', fontFamily: 'sans-serif', zIndex: 1000
      }}>
        <div style={{
          width: '50px', height: '50px', borderRadius: '50%', border: '4px solid transparent',
          borderTopColor: '#5eead4', borderRightColor: '#5eead4',
          animation: 'spin 1s linear infinite', marginBottom: '20px', boxShadow: '0 0 15px #5eead4'
        }} />
        <h2 style={{ marginBottom: '20px', letterSpacing: '3px', fontWeight: 'bold', textShadow: '0 0 10px #5eead4', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
          GALAKSİ YÜKLENİYOR
        </h2>
        <div style={{
          width: '250px', height: '6px', backgroundColor: 'rgba(30, 41, 59, 0.5)', borderRadius: '3px', overflow: 'hidden', boxShadow: '0 0 10px rgba(94, 234, 212, 0.2)'
        }}>
          <div style={{
            width: `${progress}%`, height: '100%', backgroundColor: '#5eead4', transition: 'width 0.3s ease', boxShadow: '0 0 10px #5eead4'
          }} />
        </div>
        <p style={{ marginTop: '15px', fontSize: '16px', fontWeight: 'bold', opacity: 0.8 }}>%{Math.round(progress)}</p>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        `}} />
      </div>
    </Html>
  );
};

export default Loader;