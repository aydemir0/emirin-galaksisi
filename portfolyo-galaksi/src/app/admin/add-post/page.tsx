// src/app/admin/add-post/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '../../../lib/firebase';
import { collection, addDoc } from "firebase/firestore"; 

const AddPostPage = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState(''); // Yazının tam içeriği için yeni state
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    
    const newPost = {
      id: `post-${Date.now()}`,
      title,
      url,
      publicationDate,
      excerpt,
      content, // Yeni içeriği de objeye ekliyoruz
    };

   try {
  await addDoc(collection(db, "blogPosts"), newPost);
  console.log("Döküman başarıyla veritabanına yazıldı.");
  alert('Yeni blog yazısı başarıyla veritabanına eklendi!');
    

      // Formu temizle
      setTitle('');
      setUrl('');
      setPublicationDate('');
      setExcerpt('');
      setContent(''); // Content state'ini de temizle
      router.push('/'); // Ana sayfaya yönlendir

    } catch (e) {
      console.error("Veritabanına yazılırken hata oluştu: ", e);
      alert('Bir hata oluştu, lütfen konsolu kontrol et.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#1f2937',
    border: '1px solid #4b5563',
    borderRadius: '5px',
    color: 'white',
    marginBottom: '1rem',
    fontFamily: 'inherit',
    fontSize: '1rem',
  };
  
  const labelStyle = {
    marginBottom: '0.5rem',
    display: 'block',
    color: '#d1d5db',
  };

  return (
    <div style={{ 
      backgroundColor: 'black', 
      minHeight: '100vh',
      padding: '5rem 2rem',
      color: 'white', 
      fontFamily: 'sans-serif' 
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
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
            <label style={labelStyle} htmlFor="url">Yazının URL&apos;si</label>
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
            <label style={labelStyle} htmlFor="excerpt">Kısa Açıklama (Önizleme)</label>
            <textarea
              style={{ ...inputStyle, height: '120px', resize: 'vertical' }}
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="content">Yazının Tam İçeriği (Markdown destekli)</label>
            <textarea
              style={{ ...inputStyle, height: '300px', resize: 'vertical' }}
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            style={{
              padding: '12px 24px',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1rem',
              width: '100%',
              marginTop: '1rem'
            }}
          >
            {loading ? 'Kaydediliyor...' : 'Yazıyı Kaydet'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPostPage;