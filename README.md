<div align="center">
  <h1>🌌 Emirin Galaksisi (3D Portfolio)</h1>
  <p><strong>Next.js, React Three Fiber ve Firebase ile geliştirilmiş interaktif 3D Uzay Temalı Portfolyo</strong></p>

  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React Three Fiber](https://img.shields.io/badge/React_Three_Fiber-3D-black?style=for-the-badge&logo=react)](https://docs.pmnd.rs/react-three-fiber/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Firebase](https://img.shields.io/badge/Firebase-Database-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
  
  <br />
  <a href="https://emirin-galaksisi.vercel.app"><strong>🪐 Canlı Demoyu İncele</strong></a>
</div>

<br />

## 🌟 Proje Hakkında

**Emirin Galaksisi**, klasik ve sıkıcı portfolyo web sitelerinin dışına çıkarak ziyaretçilere interaktif bir 3D uzay deneyimi sunmayı hedefleyen bir portfolyo projesidir. 

Bu evrende projeler **gezegenler**, yetenekler ve iletişim ağları ise **uydular** olarak temsil edilir. Kullanıcılar uzay boşluğunda farenin veya parmaklarının (mobil uyumlu) yardımıyla dolaşabilir, galaksiyi keşfedebilir ve Kaptan'ın seyir defterine (Blog) ulaşabilir.

> **Not:** 📸 *Ekran görüntüleri klasörünüzdeki `/docs/screenshots/` dizinine eklenecektir. (Buraya proje görsellerini ekleyebilirsiniz)*
> 
> *Örnek Görsel Yeri:* 
> <br/> 
> `<img src="https://via.placeholder.com/800x450.png?text=Proje+Ekran+Goruntusu+Gelecek" alt="Ana Ekran" width="100%">`

---

## 🚀 Özellikler

- 🌌 **Gerçek Zamanlı 3D Evren:** `Three.js` ve `React Three Fiber` kullanılarak yaratılan yüksek performanslı evren.
- 🪐 **Gezegenler ve Uydular Sistemi:** 
  - **Gezegenler:** Geliştirilen projeleri ve yazılımları temsil eder. Tıklandığında yörüngede kilitlenir.
  - **Uydular:** Sosyal medya, yetenekler ve iletişim yollarını temsil eder (Örn: İletişim Uydusu, Yetenekler Uydusu).
- 🛸 **Uzay Gemisi ve Pilot HUD:** Seyir defterine (Blog) geçerken pilot paneli arayüzü açılır.
- 🌠 **Görsel Efektler:** Işık hızı (Warp) modu, meteor yağmurları, yıldız kümeleri, nebula bulutsuları ve asteroit kuşakları. (`@react-three/postprocessing` ile Bloom & Vignette efektleri)
- 🎵 **Uzay Ambiyansı:** 3D deneyimi tamamlayan arka plan ses efektleri (SpaceAudio).
- 📡 **Gerçek Zamanlı Radar (Minimap):** Evren içindeki anlık konumunuzu ve gezegenleri gösteren 2D Minimap ekranı.
- 📝 **Dinamik Blog Yönetimi:** Firebase Firestore altyapısı ile anlık güncellenen blog/yazı sistemi (Admin Paneli destekli).

---

## 🛠️ Kullanılan Teknolojiler

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Kütüphane:** React 19
- **3D Render Motoru:** Three.js & React Three Fiber (R3F)
- **3D Yardımcılar:** `@react-three/drei`, `@react-three/postprocessing`, `maath`
- **Stil & UI:** Tailwind CSS v4, Framer Motion (Varsa)
- **Veritabanı:** Firebase
- **Dil:** TypeScript

---

## 💻 Kurulum ve Çalıştırma

Projeyi bilgisayarınızda yerel olarak çalıştırmak için aşağıdaki adımları izleyin:

### Gereksinimler
- Node.js (v18 veya üzeri)
- npm, yarn veya pnpm

### Adımlar

1. **Projeyi Klonlayın**
   ```bash
   git clone https://github.com/aydemir0/emirin-galaksisi.git
   ```

2. **Dizine Geçiş Yapın**
   ```bash
   cd emirin-galaksisi/portfolyo-galaksi
   ```

3. **Bağımlılıkları Yükleyin**
   ```bash
   npm install
   ```

4. **Çevre Değişkenlerini (Env) Ayarlayın**
   Ana dizinde bir `.env.local` dosyası oluşturun ve Firebase ayarlarınızı girin:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

5. **Geliştirme Sunucusunu Başlatın**
   ```bash
   npm run dev
   ```
   *Proje `http://localhost:3000` adresinde çalışacaktır.*

---

## 📁 Proje Yapısı

\`\`\`
emirin-galaksisi/
├── portfolyo-galaksi/          # Ana Web Uygulaması Dizini
│   ├── src/
│   │   ├── app/                # Next.js 15 App Router (Sayfalar)
│   │   ├── components/         # 3D R3F Modelleri ve UI Bileşenleri (Uydu, Gezegen vb.)
│   │   ├── data/               # Sabit veri dosyaları (Bloglar, Projeler, Yörüngeler)
│   │   └── lib/                # Firebase yapılandırma dosyaları
│   ├── public/                 # Görseller, müzikler ve statik dosyalar
│   ├── tailwind.config.js      # TailwindCSS ayarları
│   └── package.json            # Bağımlılıklar
└── .obsidian/                  # Proje planlama ve notları (Obsidian)
\`\`\`

---

## 👨‍🚀 Geliştirici

**Muhammed Emir Aydemir**  
*Full Stack Developer & 3D Web Enthusiast*

- **GitHub:** [@aydemir0](https://github.com/aydemir0)
- **LinkedIn:** [Profilinize Bağlantı Ekleyin](#)

---

<div align="center">
  <i>"Galaksi şimdilik huzurlu... Yeni sistemler inşa etmeye devam ediyoruz." 🚀</i>
</div>
