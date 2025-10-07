import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emir'in Galaksisi",
  description: "Emir Aydın'ın İnteraktif Portfolyosu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}