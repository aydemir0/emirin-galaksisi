import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Muhammed Emir Aydın | İnteraktif 3D Portfolyo",
  description: "Bilgisayar Mühendisliği öğrencisi Muhammed Emir Aydın'ın React Three Fiber ve Next.js ile geliştirdiği kişisel 3D portfolyo projesi. Projeleri, yetenekleri ve blog yazılarını keşfedin.",
  keywords: ["Muhammed Emir Aydın", 
    "Emir Aydın", 
    "Portfolyo", 
    "3D Portfolio", 
    "React Three Fiber", 
    "Next.js", 
    "Kütahya Dumlupınar Üniversitesi", 
    "Bilgisayar Mühendisliği", 
    "Yazılımcı Portfolyosu",
    "Geliştirici Blogu", // "blog" kelimesi için
    "Teknoloji Yazıları",
    "Okul Projeleri", 
    "Yapay Zeka Projeleri",
    "Web Geliştirme",
    "Frontend Geliştirici",
    "Backend Geliştirici",
    "Fullstack Geliştirici",
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Firebase",
    "MongoDB",
    "Express.js",
    "HTML5",
    "CSS3",
    "Sass",
    "Tailwind CSS",
    "Bootstrap",
    "GitHub", 
    "GitLab", 
    "Projelerim", 
    "Yeteneklerim", 
    "Deneyimlerim",
    "Üniversite Öğrencisi",
    "Stajyer",
    "Yazılım Mühendisliği",
    "Teknoloji Meraklısı",
    "Kodlama",
    "Programlama",
    "Yazılım Geliştirme",
    "Web Tasarımı",
    "Kariyer",
    "CV",
    "Özgeçmiş",
    "İş Başvurusu",
    "Freelance Geliştirici",
    "Danışmanlık",
    "Eğitim",
    "Teknoloji Haberleri",
    "Yapay Zeka Haberleri",
    "Makine Öğrenimi",
    "Derin Öğrenme",
    "Veri Bilimi",
    "Algoritmalar",             "Veri Yapıları",
    "Yazılım Testi",
    "Sürüm Kontrolü",  
    "İletişim",
    ],
  
  openGraph: {
    title: "Muhammed Emir Aydın | İnteraktif 3D Portfolyo",
    description: "Gezegenleri keşfedin, projeleri inceleyin ve uzayda bir yolculuğa çıkın.",
    url: 'https://emirin-galaksisi.vercel.app', // Siteni canlıya aldığındaki adresin
    siteName: "Emir'in Galaksisi",
    images: [
      {
        url: 'https://senin-site-adresin.com/og-image.png', // Paylaşım için özel bir resim
        width: 1200,
        height: 630,
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  // --- YENİ BÖLÜM SONU ---
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}