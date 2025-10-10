// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Muhammed Emir Aydın | İnteraktif 3D Portfolyo",
  description: "Muhammed Emir Aydın'ın Next.js ve React Three Fiber ile oluşturulmuş interaktif 3D portfolyosu. Gezegenleri keşfedin, projeleri inceleyin ve uzayda bir yolculuğa çıkın.",
  keywords: ["Muhammed Emir Aydın", "Emir Aydın", "Portfolyo", "3D Portfolio", "React Three Fiber", "Next.js", "Kütahya Dumlupınar Üniversitesi", "Bilgisayar Mühendisliği", "Yazılımcı Portfolyosu", "Geliştirici Blogu", "Teknoloji Yazıları", "Okul Projeleri","Okul Projeleri", "Yapay Zeka Projeleri", "Web Geliştirme", "Frontend Geliştirici", "Backend Geliştirici", "Fullstack Geliştirici", "JavaScript", "TypeScript", "React", "Node.js", "Firebase", "MongoDB", "Express.js", "HTML5", "CSS3", "Sass", "Tailwind CSS", "Bootstrap", "GitHub", "GitLab", "Projelerim", "Yeteneklerim", "Deneyimlerim", "Üniversite Öğrencisi", "Stajyer", "Yazılım Mühendisliği", "Teknoloji Meraklısı", "Kodlama", "Programlama", "Yazılım Geliştirme", "Web Tasarımı", "Kariyer", "CV", "Özgeçmiş", "İş Başvurusu", "Freelance Geliştirici", "Danışmanlık", "Eğitim", "Teknoloji Haberleri", "Yapay Zeka Haberleri", "Makine Öğrenimi", "Derin Öğrenme", "Veri Bilimi", "Algoritmalar","Veri Yapıları", "Yazılım Testi", "Sürüm Kontrolü", "İletişim",],
  
  openGraph: {
    title: "Muhammed Emir Aydın | İnteraktif 3D Portfolyo",
    description: "Gezegenleri keşfedin, projeleri inceleyin ve uzayda bir yolculuğa çıkın.",
    url: 'https://emirin-galaksisi.vercel.app',
    siteName: "Emir'in Galaksisi",
    images: [
      {
        url: 'https://emirin-galaksisi.vercel.app/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },

  // --- GOOGLE DOĞRULAMA KODUN BURADA ---
  verification: {
    google: 'Fputwk0VeOiqU8y3DBm3fIT9SGEs45jqs_3OHAJ0aqY',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}