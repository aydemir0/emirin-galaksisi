
"use client";
import Image from "next/image";

const profileData = {
    name: "Muhammed Emin Aydın",
    title: "Yazılım Mühendisi Adayı",
    bio: "Teknolojiye olan merakım ve problem çözme tutkum beni yazılım mühendisliği alanına yönlendirdi. Kullanıcı odaklı, estetik ve performanslı uygulamalar yaratmayı hedefliyorum.",
    imageUrl: "/images/profil.jpg",
    githubUrl: "https://github.com/aydemir0",
};

const ProfilKarti = ({ onClose }) => {
  return (
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50
    }} onClick={onClose}>
      <div style={{
        position: 'relative',
        backgroundColor: '#111827', 
        color: 'white',
        borderRadius: '1rem',
        boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        maxWidth: '28rem',
        width: '90%',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }} onClick={(e) => e.stopPropagation()}>
        
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '1.5rem' }}>
          &times;
        </button>
        
        <div style={{ position: 'relative', width: '8rem', height: '8rem', borderRadius: '9999px', overflow: 'hidden', border: '4px solid #374151' }}>
            <Image src={profileData.imageUrl} alt="Profil Fotoğrafı" layout="fill" objectFit="cover" />
        </div>
        
        <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'white' }}>{profileData.name}</h2>
            <p style={{ fontSize: '1.125rem', color: '#5eead4' }}>{profileData.title}</p>
        </div>

        <p style={{ color: '#d1d5db', lineHeight: '1.625', textAlign: 'center' }}>
            {profileData.bio}
        </p>

        <a href={profileData.githubUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', backgroundColor: '#2563eb', color: 'white', fontWeight: 'bold', padding: '0.75rem 1rem', borderRadius: '0.5rem', textAlign: 'center', textDecoration: 'none', transition: 'transform 0.2s', marginTop: '1rem' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
          GitHub Profilimi Görüntüle
        </a>
      </div>
    </div>
  );
};

export default ProfilKarti;
