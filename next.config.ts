import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  // Admin ve Login sayfalarını statik olarak dışa aktarmayı devre dışı bırakmak için
  // Bu, build sırasında Firebase bağlantısı gerektiren sayfaların atlanmasını sağlar.
  // Normalde bu, next.config.js'de `output: 'export'` kullanıldığında yapılır.
  // Ancak burada `standalone` kullanıldığı için, hatayı çözmek için başka bir yol deneyeceğiz.
  // Firebase hatası, ortam değişkenlerinin (NEXT_PUBLIC_FIREBASE_API_KEY vb.) ayarlanmamasından kaynaklanıyor.
  // Bu ortamda bu değişkenleri ayarlayamayız. Bu yüzden, sadece `/` sayfasını çalıştırmaya odaklanacağız.
  // `/login` ve `/admin` sayfalarını atlamak için `next.config.ts`'ye bir şey ekleyemeyiz.
  // Bu nedenle, sadece `/` sayfasını çalıştırmak için `npm run dev` kullanacağız ve portu dışarıya açacağız.
};
export default nextConfig;
