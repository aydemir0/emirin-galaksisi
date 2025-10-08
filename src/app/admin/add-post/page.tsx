// src/app/admin/add-post/page.tsx
"use client";

import { useState } from 'react';

const AddPostPage = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [excerpt, setExcerpt] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Sayfanın yeniden yüklenmesini engelle
    
    const newPost = {
      id: `post-${Date.now()}`, // Geçici, benzersiz bir ID oluştur
      title,
      url,
      publicationDate,
      excerpt,
    };

    // Şimdilik sadece konsola yazdırıyoruz.
    // Gelecekte burası veritabanına gönderme kodunu içerecek.
    console.log("Yeni Blog Yazısı Oluşturuldu:", newPost);
    alert('Yeni blog yazısı konsola yazdırıldı! F12 ile kontrol et.');

    // Formu temizle
    setTitle('');
    setUrl('');
    setPublicationDate('');
    setExcerpt('');
  };

  // Basit stil objeleri
  const inputStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#1f2937',
    border: '1px solid #4b5563',
    borderRadius: '5px',
    color: 'white',
    marginBottom: '1rem',
  };
  
  const labelStyle = {
    marginBottom: '0.5rem',
    display: 'block',
    color: '#d1d5db',
  };

  return (
    <div style={{ maxWidth: '700px', margin: '5rem auto', color: 'white', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Yeni Blog Yazısı Ekle</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={labelStyle} htmlFor="title">Başlık</label>
          <input
            style={inputStyle}
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="url">Yazı URL'si</label>
          <input
            style={inputStyle}
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="date">Yayın Tarihi</label>
          <input
            style={inputStyle}
            id="date"
            type="text"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
            placeholder="Örn: Ekim 2025"
            required
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="excerpt">Kısa Açıklama (Excerpt)</label>
          <textarea
            style={{ ...inputStyle, height: '120px' }}
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
          />
        </div>
        <button 
          type="submit"
          style={{
            padding: '12px 24px',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem',
            width: '100%'
          }}
        >
          Yazıyı Kaydet
        </button>
      </form>
    </div>
  );
};

export default AddPostPage;