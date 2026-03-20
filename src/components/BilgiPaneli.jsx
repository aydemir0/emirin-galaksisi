<<<<<<< HEAD


=======
// src/components/BilgiPaneli.jsx
/* eslint-disable react/prop-types */
>>>>>>> 44751a7 (feat: 3D galaxy major overhaul - NASA textures, Warp Drive effect, PilotHUD, and premium sidebar UI)
"use client";

import Image from "next/image";
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaReact, FaPython, FaFigma, FaGitAlt, FaDatabase } from 'react-icons/fa';
import { SiNextdotjs, SiFlutter, SiFirebase, SiDart, SiJavascript, SiCss3, SiHtml5 } from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';
import * as THREE from 'three';


const iconMap = {
  GitHub: <FaGithub />, LinkedIn: <FaLinkedin />, Instagram: <FaInstagram />, "X (Twitter)": <FaTwitter />,
  Flutter: <SiFlutter />, Dart: <SiDart />, React: <FaReact />, "Next.js": <SiNextdotjs />, JavaScript: <SiJavascript />,
  HTML5: <SiHtml5 />, CSS3: <SiCss3 />, Firebase: <SiFirebase />, Python: <FaPython />,
  "Microsoft SQL Server": <FaDatabase />, "Firestore": <SiFirebase />, "Git & GitHub": <FaGitAlt />,
  "VS Code": <VscCode />, Figma: <FaFigma />
};

const BilgiPaneli = ({ proje, onClose }) => {
  const [expandedPostId, setExpandedPostId] = useState(null);

  const handleToggleExpand = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  if (!proje) {
    return null;
  }

  if (proje.loading) {
    return (
      <div style={{
        height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.9))',
        borderLeft: `2px solid ${proje.color || 'rgba(255, 255, 255, 0.1)'}`,
        color: 'white'
      }}>
        Yükleniyor...
      </div>
    );
  }

  const animasyonStili = (delay) => ({ animation: `fadeInUp 0.5s ${delay}s both ease-out` });

  return (
    <div style={{
      height: '100%', width: '100%',
      background: 'linear-gradient(to bottom right, rgba(10, 15, 30, 0.98), rgba(20, 25, 45, 0.95))',
      borderLeft: `2px solid ${proje.color || '#5eead4'}`,
      boxShadow: `-10px 0 30px rgba(0, 0, 0, 0.5), inset 2px 0 15px ${proje.color || 'rgba(94, 234, 212, 0.2)'}`,
      transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      overflow: 'hidden'
    }}>
      <div style={{ padding: '2.5rem 3rem', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', color: '#e2e8f0', position: 'relative' }}>

        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '2px',
          background: `linear-gradient(to right, transparent, ${proje.color || '#00ffff'}, transparent)`,
          boxShadow: `0 0 10px ${proje.color || '#00ffff'}`,
          animation: 'scanline 1s ease-out', animationDelay: '0.3s',
        }} />

        <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', cursor: 'pointer', fontSize: '1.5rem', zIndex: 10, transition: 'all 0.2s', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }} onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'scale(1.1)'; }} onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.transform = 'scale(1)'; }}>&times;</button>

        {proje.imageUrl && (
          <div style={{
            position: 'relative', width: '100%',
            height: proje.id === 'profil' ? '20rem' : '14rem',
            marginBottom: '2rem', borderRadius: '1rem',
            overflow: 'hidden', backgroundColor: 'rgba(0, 0, 0, 0.4)',
            border: `1px solid rgba(255, 255, 255, 0.1)`,
            boxShadow: `0 10px 30px rgba(0,0,0,0.5)`,
            animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both'
          }}>
            <Image
              src={proje.imageUrl}
              alt={`${proje.name} Logosu`}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center 25%' }}
            />
          </div>
        )}

        <div style={{ ...animasyonStili(0.2), paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ fontSize: '2.8rem', fontWeight: '800', letterSpacing: '-0.02em', lineHeight: 1.1, color: '#ffffff', textShadow: `0 0 20px ${proje.color || 'rgba(255,255,255,0.5)'}` }}>{proje.name}</h2>
          {proje.completionDate && <p style={{ fontSize: '1.1rem', color: proje.color || '#5eead4', fontWeight: '500', marginTop: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{proje.completionDate}</p>}
        </div>

        <p style={{ color: '#cbd5e1', fontSize: '1.15rem', lineHeight: '1.8', marginTop: '1.5rem', fontWeight: '400', ...animasyonStili(0.3) }}>{proje.description}</p>
        <hr style={{ borderColor: 'rgba(255,255,255,0.05)', margin: '2.5rem 0', ...animasyonStili(0.4) }} />

        <div style={{ ...animasyonStili(0.5) }}>

          {proje.posts && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {proje.posts.map(post => (
                <div
                  key={post.id}
                  style={{
                    padding: '0.1rem', backgroundColor: 'rgba(0,0,0,0.2)',
                    borderRadius: '0.5rem', border: '0.1px solid rgba(255, 255, 255, 0.1)', marginBottom: '3rem'
                  }}
                >
                  <h4 style={{ margin: 0, fontWeight: 'bold', fontSize: '1.5rem', color: proje.color || '#87CEEB' }}>{post.title}</h4>
                  <p style={{ fontSize: '1rem', color: '#94a3b8', margin: '0.25rem 0' }}>{post.publicationDate}</p>
                  <p style={{ fontSize: '1.2rem', color: '#d1d5db', margin: '0.5rem 0 0 0', lineHeight: '1,5' }}>{post.excerpt}</p>

                  <button
                    onClick={() => handleToggleExpand(post.id)}
                    style={{ background: 'none', border: 'none', color: '#5eead4', cursor: 'pointer', padding: '0.5rem 0', marginTop: '0.5rem' }}
                  >
                    {expandedPostId === post.id ? 'Kapat' : 'Devamını Oku...'}
                  </button>

                  {expandedPostId === post.id && (

                    <div className="prose prose-invert max-w-none" style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #334155' }}>
                      <ReactMarkdown>
                        {post.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {proje.readme && <div style={{ marginBottom: '2.5rem' }}> <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'white', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Proje Notları</h3> <code style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)', color: '#d1d5db', padding: '1.5rem', borderRadius: '0.75rem', whiteSpace: 'pre-wrap', fontSize: '0.95rem', fontFamily: 'monospace', lineHeight: '1.6', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)' }}> {proje.readme} </code> </div>}
          
          {proje.links && <div style={{ marginBottom: '2.5rem' }}> <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'white', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Bağlantılar</h3> <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '2rem' }}> {proje.links.map(link => <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" title={link.name} style={{ color: '#94a3b8', transition: 'all 0.2s', padding: '0.5rem', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.03)' }} onMouseOver={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(-3px)' }} onMouseOut={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'; e.currentTarget.style.transform = 'translateY(0)' }}> {iconMap[link.name] || link.name} </a>)} </div> </div>}
          
          {proje.skills && <div style={{ marginBottom: '5rem' }}> <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'white', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Kullanılan Teknolojiler</h3> <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}> {Object.entries(proje.skills).map(([category, skills]) => <div key={category}> <h4 style={{ fontWeight: '600', color: '#94a3b8', marginBottom: '0.75rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>{category}</h4> <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}> {skills.map(skill => <div key={skill} title={skill} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', color: '#f8fafc', backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.6rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 4px 6px rgba(0,0,0,0.2)', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}> {iconMap[skill]}<span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{skill}</span> </div>)} </div> </div>)} </div> </div>}
          
          {proje.email && <div style={{ marginBottom: '1.5rem' }}> <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'white', marginBottom: '1rem', textTransform: 'uppercase' }}>E-Posta</h3> <a href={`mailto:${proje.email}`} style={{ color: proje.color || '#5eead4', textDecoration: 'none', fontWeight: 'bold', borderBottom: `2px solid ${proje.color || '#5eead4'}`, paddingBottom: '2px' }}>{proje.email}</a> </div>}
        </div>

        <div style={{ flexGrow: 1, ...animasyonStili(0.6) }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '2rem', paddingBottom: '2rem' }}>
          {proje.liveUrl && <div style={{ ...animasyonStili(0.6) }}><a href={proje.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', fontWeight: 'bold', padding: '1.2rem', borderRadius: '0.75rem', textAlign: 'center', textDecoration: 'none', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)', border: '1px solid rgba(255,255,255,0.1)' }} onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.5)' }} onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)' }}>🚀 Canlı Siteyi Başlat</a></div>}
          {proje.githubUrl && <div style={{ ...animasyonStili(0.7) }}><a href={proje.githubUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', background: 'rgba(255,255,255,0.05)', color: '#f8fafc', fontWeight: 'bold', padding: '1.2rem', borderRadius: '0.75rem', textAlign: 'center', textDecoration: 'none', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', border: '1px solid rgba(255,255,255,0.1)' }} onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }} onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}><FaGithub style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle', fontSize: '1.2rem' }}/> GitHub'da İncele</a></div>}
        </div>
      </div>
    </div>
  );
}
export default BilgiPaneli;
