/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaTimes } from 'react-icons/fa';

export default function PilotHUD({ data, onClose }) {
  const [typedText, setTypedText] = useState("");
  const [typingIndex, setTypedIndex] = useState(0);

  // Typewriter effect for the description
  useEffect(() => {
    if (typingIndex < data.description.length) {
      const timeout = setTimeout(() => {
        setTypedText(prev => prev + data.description.charAt(typingIndex));
        setTypedIndex(typingIndex + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [typingIndex, data.description]);

  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0, 20, 10, 0.7)',
      backdropFilter: 'blur(5px)',
      zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#10b981', fontFamily: "'Courier New', Courier, monospace",
      padding: '2rem', animation: 'fadeIn 0.5s ease-out'
    }}>
      {/* Sci-Fi HUD Borders */}
      <div style={{
        position: 'absolute', top: '2%', left: '2%', width: '50px', height: '50px',
        borderTop: '4px solid #10b981', borderLeft: '4px solid #10b981', boxShadow: '-5px -5px 15px rgba(16,185,129,0.5)'
      }}></div>
      <div style={{
        position: 'absolute', top: '2%', right: '2%', width: '50px', height: '50px',
        borderTop: '4px solid #10b981', borderRight: '4px solid #10b981', boxShadow: '5px -5px 15px rgba(16,185,129,0.5)'
      }}></div>
      <div style={{
        position: 'absolute', bottom: '2%', left: '2%', width: '50px', height: '50px',
        borderBottom: '4px solid #10b981', borderLeft: '4px solid #10b981', boxShadow: '-5px 5px 15px rgba(16,185,129,0.5)'
      }}></div>
      <div style={{
        position: 'absolute', bottom: '2%', right: '2%', width: '50px', height: '50px',
        borderBottom: '4px solid #10b981', borderRight: '4px solid #10b981', boxShadow: '5px 5px 15px rgba(16,185,129,0.5)'
      }}></div>

      {/* Close Button */}
      <button onClick={onClose} style={{
        position: 'absolute', top: '5%', right: '5%', background: 'transparent',
        border: '2px solid #10b981', color: '#10b981', width: '50px', height: '50px',
        borderRadius: '50%', cursor: 'pointer', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.3s', boxShadow: '0 0 10px #10b981'
      }} onMouseOver={e => { e.currentTarget.style.background = '#10b981'; e.currentTarget.style.color = '#000'; }} onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#10b981'; }}>
        <FaTimes />
      </button>

      <div style={{
        maxWidth: '800px', width: '100%', backgroundColor: 'rgba(0, 20, 10, 0.8)',
        border: '1px solid #10b981', borderRadius: '12px', padding: '3rem',
        boxShadow: '0 0 30px rgba(16, 185, 129, 0.2)', position: 'relative'
      }}>
        {/* Decorative Grid Line */}
        <div style={{ position: 'absolute', top: 0, left: '10%', width: '80%', height: '2px', background: 'linear-gradient(90deg, transparent, #10b981, transparent)', boxShadow: '0 0 10px #10b981' }}></div>
        
        <h1 style={{ textAlign: 'center', fontSize: '2.5rem', letterSpacing: '8px', textShadow: '0 0 15px #10b981', marginBottom: '2rem', borderBottom: '1px dotted #10b981', paddingBottom: '1rem', textTransform: 'uppercase' }}>
          {data.name}
        </h1>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {/* Main Info */}
          <div style={{ flex: '1 1 400px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#6ee7b7' }}>[SİSTEM MESAJI]</h3>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', minHeight: '150px', textShadow: '0 0 5px rgba(16,185,129,0.5)' }}>
              {typedText}
              <span style={{ animation: 'pulse 1s infinite' }}>_</span>
            </p>
            
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#6ee7b7' }}>[İLETİŞİM AĞI]</h3>
              <p style={{ fontSize: '1.2rem' }}>Erişim Sinyali: <a href={`mailto:${data.email}`} style={{ color: '#fff', textDecoration: 'none', borderBottom: '1px dashed #10b981', textShadow: '0 0 10px #fff' }}>{data.email}</a></p>
              
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem' }}>
                {data.links?.map(link => (
                  <a key={link.name} href={link.url} target="_blank" rel="noreferrer" style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem',
                    border: '1px solid #10b981', color: '#10b981', textDecoration: 'none', borderRadius: '8px',
                    transition: 'all 0.3s', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold'
                  }} onMouseOver={e => { e.currentTarget.style.background = 'rgba(16,185,129,0.2)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(16,185,129,0.5)'; }} onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}>
                    {link.name === 'GitHub' ? <FaGithub /> : link.name === 'LinkedIn' ? <FaLinkedin /> : null} {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Radar / Skills Side */}
          <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '1px dashed rgba(16,185,129,0.3)', paddingLeft: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#6ee7b7', textTransform: 'uppercase' }}>[Sistem Cephaneliği]</h3>
            {data.skills && Object.entries(data.skills).map(([category, skills]) => (
              <div key={category}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {(skills).map((skill, i) => (
                    <span key={skill} style={{
                      backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.4)',
                      padding: '0.3rem 0.8rem', borderRadius: '4px', fontSize: '0.9rem', color: '#a7f3d0'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Faux Radar Animation block */}
            <div style={{ marginTop: 'auto', width: '100%', height: '150px', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '50%', position: 'relative', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ position: 'absolute', width: '100%', height: '1px', background: 'rgba(16,185,129,0.4)' }}></div>
                <div style={{ position: 'absolute', width: '1px', height: '100%', background: 'rgba(16,185,129,0.4)' }}></div>
                <div style={{ position: 'absolute', width: '70%', height: '70%', border: '1px dashed rgba(16,185,129,0.3)', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', width: '50%', height: '50%', background: 'conic-gradient(rgba(16,185,129,0.6) 0deg, transparent 90deg)', borderRadius: '50%', animation: 'spin 2s linear infinite' }}></div>
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}} />
    </div>
  );
}
