import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emir'in Galaksisi | İnteraktif 3D Portfolyo",
  description: "Muhammed Emir Aydın'ın Next.js ve React Three Fiber ile oluşturulmuş interaktif 3D portfolyosu. Gezegenleri keşfedin ve projeleri inceleyin.",
  keywords: ["Muhammed Emir Aydın", "3D Portfolio", "React Three Fiber", "Next.js", "Developer Portfolio", "Yazılımcı Portfolyosu"],
  
  // --- YENİ EKLENEN BÖLÜM ---
  openGraph: {
    title: "Emir'in Galaksisi | İnteraktif 3D Portfolyo",
    description: "Gezegenleri keşfedin, projeleri inceleyin ve uzayda bir yolculuğa çıkın.",
    url: 'https://senin-site-adresin.com', // Siteni canlıya aldığındaki adresin
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