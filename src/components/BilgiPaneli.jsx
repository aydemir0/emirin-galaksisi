// src/components/BilgiPaneli.jsx
"use client";

import Image from "next/image";
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaReact, FaPython, FaFigma, FaGitAlt, FaDatabase } from 'react-icons/fa';
import { SiNextdotjs, SiFlutter, SiFirebase, SiDart, SiJavascript, SiCss3, SiHtml5 } from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';

const iconMap = {
  GitHub: <FaGithub />, LinkedIn: <FaLinkedin />, Instagram: <FaInstagram />, "X (Twitter)": <FaTwitter />,
  Flutter: <SiFlutter />, Dart: <SiDart />, React: <FaReact />, "Next.js": <SiNextdotjs />, JavaScript: <SiJavascript />,
  HTML5: <SiHtml5 />, CSS3: <SiCss3 />, Firebase: <SiFirebase />, Python: <FaPython />,
  "Microsoft SQL Server": <FaDatabase />, "Firestore": <SiFirebase />, "Git & GitHub": <FaGitAlt />,
  "VS Code": <VscCode />, Figma: <FaFigma />
};

const BilgiPaneli = ({ proje, onClose }) => {
  if (!proje) {
    return null;
  }
  
  const animasyonStili = (delay) => ({ animation: `fadeInUp 0.5s ${delay}s both ease-out` });

  return (
    <div style={{
      height: '100%', width: '33.33%',
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))',
      backdropFilter: 'blur(12px)',
      borderLeft: `2px solid ${proje.color || 'rgba(255, 255, 255, 0.1)'}`, 
      transition: 'width 0.5s ease-in-out',
      overflow: 'hidden' // Scan line'ın taşmasını engellemek için önemli
    }}>
      <div style={{ padding: '2rem 2.5rem', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', color: '#cbd5e1', position: 'relative' }}>
        
        {/* --- YENİ EKLENEN SCAN LINE EFEKTİ --- */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '2px',
          background: `linear-gradient(to right, transparent, ${proje.color || '#00ffff'}, transparent)`,
          boxShadow: `0 0 10px ${proje.color || '#00ffff'}`,
          animation: 'scanline 1s ease-out',
          animationDelay: '0.3s',
        }} />
        {/* --- YENİ EFEKT SONU --- */}
        
        <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '2rem', zIndex: 10 }}>&times;</button>
        
        {proje.imageUrl && (
          <div style={{ 
            position: 'relative', width: '100%', 
            height: proje.id === 'profil' ? '20rem' : '12rem', 
            marginBottom: '1.5rem', borderRadius: '0.75rem', 
            overflow: 'hidden', backgroundColor: 'rgba(30, 41, 59, 0.5)', 
            animation: 'fadeIn 0.5s 0.1s both' 
          }}>
            <Image 
              src={proje.imageUrl} 
              alt={`${proje.name} Logosu`} 
              fill
              style={{ objectFit: 'cover', objectPosition: proje.imagePosition || 'center center' }}
            />
          </div>
        )}
        
        <div style={animasyonStili(0.2)}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', lineHeight: 1.2, color: proje.color }}>{proje.name}</h2>
          {proje.completionDate && <p style={{ color: '#5eead4', fontWeight: '600', marginTop: '0.5rem' }}>{proje.completionDate}</p>}
        </div>
        
        <p style={{ color: '#e2e8f0', fontSize: '1.1rem', lineHeight: '1.75', marginTop: '1.5rem', ...animasyonStili(0.3) }}>{proje.description}</p>
        <hr style={{ borderColor: '#334155', margin: '2rem 0', ...animasyonStili(0.4) }} />

        <div style={{...animasyonStili(0.5)}}>
          {proje.readme && <div style={{ marginBottom: '1.5rem' }}> <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'white', marginBottom: '1rem' }}>README.md</h3> <code style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.3)', color: '#d1d5db', padding: '1.5rem', borderRadius: '0.75rem', whiteSpace: 'pre-wrap', fontSize: '0.9rem', fontFamily: 'monospace' }}> {proje.readme} </code> </div>}
          
          {proje.links && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'white', marginBottom: '1rem' }}>Linkler</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '1.8rem' }}>
                {proje.links.map(link => (
                  <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" title={link.name} style={{color: '#94a3b8', transition: 'color 0.2s, transform 0.2s'}} onMouseOver={e => {e.currentTarget.style.color='white'; e.currentTarget.style.transform='scale(1.1)'}} onMouseOut={e => {e.currentTarget.style.color='#94a3b8'; e.currentTarget.style.transform='scale(1)'}}>
                    {iconMap[link.name] || link.name}
                  </a>
                ))}
              </div>
            </div>
          )}
          
          {proje.skills && <div style={{ marginBottom: '1.5rem' }}> <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'white', marginBottom: '1rem' }}>Teknolojiler</h3> <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}> {Object.entries(proje.skills).map(([category, skills]) => <div key={category}> <h4 style={{ fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>{category}</h4> <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}> {skills.map(skill => <div key={skill} title={skill} style={{ fontSize: '1.5rem', color: '#94a3b8' }}> {iconMap[skill] || skill} </div>)} </div> </div>)} </div> </div>}
          {proje.email && <div style={{ marginBottom: '1.5rem' }}> <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'white', marginBottom: '1rem' }}>E-Posta</h3> <a href={`mailto:${proje.email}`} style={{color: '#5eead4', textDecoration: 'underline'}}>{proje.email}</a> </div>}
        </div>
        
        <div style={{ flexGrow: 1, ...animasyonStili(0.6) }}></div>
        {proje.githubUrl && <div style={animasyonStili(0.6)}><a href={proje.githubUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', backgroundColor: '#2563eb', color: 'white', fontWeight: 'bold', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center', textDecoration: 'none', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>GitHub'da Görüntüle</a></div>}
      </div>
    </div>
  );
};

export default BilgiPaneli;