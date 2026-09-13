import type { Metadata } from "next";
import "./globals.css"; // globals.css import'umuz kalmalı

export const metadata: Metadata = {
  title: "Emir'in Galaksisi",
  description: "Emir Aydın'ın 3D Portfolyosu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      {/* body etiketindeki className'i sildik */}
      <body>{children}</body> 
    </html>
  );
}