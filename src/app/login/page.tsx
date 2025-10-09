// src/app/login/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../lib/firebase';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Giriş başarılı! Admin paneline yönlendiriliyorsun.');
      router.push('/admin/add-post');
    } catch (e) {
      console.error("Giriş hatası:", e);
      setError('E-posta veya şifre yanlış. Lütfen tekrar deneyin.');
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      color: 'white', 
      fontFamily: 'sans-serif' 
    }}>
      <div style={{ maxWidth: '500px', width: '100%' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>Admin Girişi</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label style={labelStyle} htmlFor="email">E-posta</label>
            <input
              style={inputStyle}
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={labelStyle} htmlFor="password">Şifre</label>
            <input
              style={inputStyle}
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: '#f87171', marginBottom: '1rem' }}>{error}</p>}
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
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;