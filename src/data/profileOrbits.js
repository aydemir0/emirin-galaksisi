// src/data/profileOrbits.js

export const profileOrbits = [
  {
    id: "profil",
    name: "Hakkımda",
    size: 0.4, // Boyutu biraz büyüttüm, istersen değiştirebilirsin
    orbitRadius: 3.5,
    orbitSpeed: 0.2,
    angleOffset: 0, // YENİ: Başlangıç noktası (0 derece)
    color: "#a7c7e7",
    imageUrl: "/images/profil.jpg",
    description: "2004 yılında Ağrı'da doğdum ve lise de dahil olmak üzere  kadar eğitimimi tamamladım memleketimde tamamladım, teknolojiye ve yaratıcılığa olan tutkumla şekillendi. Şu anda Kütahya Dumlupınar Üniversitesi Bilgisayar Mühendisliği 3. sınıf öğrencisi olarak bu serüvene devam ediyorum. Benim için kodlama, sadece satırlardan oluşan bir meslek değil; kendini sürekli geliştirme sanatı ve iç dünyamdaki fikirleri dijital evrende var etme biçimidir. Bu portfolyodaki her bir proje, bu felsefenin bir yansımasıdır."
  },
  {
    id: "sosyal-medya",
    name: "Sosyal Medya",
    size: 0.4,
    orbitRadius: 3.5,
    orbitSpeed: 0.2,
    angleOffset: Math.PI / 2, // YENİ: Başlangıç noktası (90 derece)
    color: "#f3a683",
    description: "Profesyonel ve sosyal ağlarım üzerinden benimle bağlantı kurabilir, projelerimi daha yakından takip edebilirsiniz.",
    imageUrl: "/images/social_media_logo.png",
    links: [
  { name: "GitHub", url: "https://github.com/aydemir0" },
  { name: "X (Twitter)", url: "https://x.com/EmirAydn1698911" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/muhammed-emir-ayd%C4%B1n-305423200/" },
  { name: "Instagram", url: "https://www.instagram.com/aydineemir/" },
]
  },
  {
    id: "yetenekler",
    name: "Yetenekler",
    size: 0.4,
    orbitRadius: 3.5,
    orbitSpeed: 0.2,
    angleOffset: Math.PI, // YENİ: Başlangıç noktası (180 derece)
    color: "#e7d1a7",
    description: "Projelerimde kullandığım ve hakim olduğum teknolojiler ve araçlar.",
    imageUrl: "/images/skills_logo.png",
    skills: {
      "Mobil": ["Flutter", "Dart"],
      "Frontend": ["React", "Next.js", "JavaScript", "HTML5", "CSS3"],
      "Backend": ["Firebase", "Python (Temel)"],
      "Veritabanı": ["Firestore", "Microsoft SQL Server (Temel)"],
      "Araçlar": ["Git & GitHub", "VS Code", "Figma"]
    }
  },
  {
    id: "iletisim",
    name: "İletişim",
    size: 0.4,
    orbitRadius: 3.5,
    orbitSpeed: 0.2,
    angleOffset: (3 * Math.PI) / 2, // YENİ: Başlangıç noktası (270 derece)
    color: "#a7e7c4",
    description: "Benimle bir proje hakkında konuşmak veya sadece merhaba demek isterseniz, aşağıdaki e-posta adresinden bana ulaşabilirsiniz.",
    imageUrl: "/images/contact_logo.png",
    email: "muhammedeira@gmail.com"
  },
];