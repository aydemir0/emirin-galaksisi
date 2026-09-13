// src/data/blogs.js

export const blogData = {
  // Bu obje, panel açıldığında kullanılacak genel bilgileri içerir.
  panelInfo: {
    id: 'blog-kumesi',
    name: 'Yıldız Günlükleri',
    color: '#87CEEB', // Gökyüzü mavisi
    description: "Yazılım, teknoloji ve kişisel gelişim üzerine tuttuğum notlar ve makaleler. Her bir yıldız, yeni bir fikri temsil ediyor.",
    imageUrl: '/images/star_cluster.png', // Bu resmi daha sonra bulabiliriz
  },
  // Bu dizi, panelde listelenecek olan her bir blog yazısını temsil eder.
  posts: [
    {
      id: 'post-1',
      title: 'React Three Fiber ile İlk 3D Sahnemi Nasıl Oluşturdum?',
      url: '#',
      publicationDate: 'Eylül 2025',
      content: `## Başlangıç\n\nBu projenin ilk adımı sıfırdan bir uzay deneyimi oluşturmaktı.\n\n### Kurulum\n\n- Next.js\n- Three.js\n- React Three Fiber\n\nBu kütüphanelerle galaksinin temelini attım.`,
      excerpt: 'Bu yazıda, sıfırdan başlayarak interaktif bir 3D web deneyimi yaratmanın temel adımlarını ve karşılaştığım zorlukları anlatıyorum.'
    },
    {
      id: 'post-2',
      title: 'Flutter ve Firebase: Güçlü İkili',
      url: '#',
      publicationDate: 'Ağustos 2025',
      content: `### Neden Flutter?\n\nFlutter, tek bir kod tabanıyla hem iOS hem Android'e çıktı vermemizi sağlıyor. Firebase ise backend tarafında harikalar yaratıyor. Gerçek zamanlı veritabanı, kimlik doğrulama ve daha fazlasını dakikalar içinde entegre etmek muazzam bir his.`,
      excerpt: 'Firebase\'in backend gücünü Flutter\'ın esnek arayüzüyle birleştirerek nasıl hızlı ve ölçeklenebilir mobil uygulamalar geliştirebileceğimizi inceliyoruz.'
    },
    {
      id: 'post-3',
      title: 'Bir Mühendis Adayının Gözünden Stajın Önemi',
      url: '#',
      publicationDate: 'Temmuz 2025',
      content: `Staj demek, sadece ofiste bulunmak değil; gerçek hayat problemlerini gözlemlemektir. Üniversitede öğrendiğimiz teorik bilgilerin pratiğe dökülmesi ufkumu genişletti.`,
      excerpt: 'Teorik bilginin pratiğe döküldüğü staj süreçleri, kariyer yolculuğumuzun en kritik adımlarından biridir. Bu süreçteki deneyimlerim ve tavsiyelerim...'
    },
    {
      id: 'post-4',
      title: 'Modern Web Geliştirmede Next.js 15 ve App Router',
      url: '#',
      publicationDate: 'Ekim 2025',
      content: `Next.js, React dünyasını bambaşka bir seviyeye taşıyor. Özellikle App Router ve Server Components mimarisi, performansı inanılmaz derecede artırırken geliştirici deneyimini de basitleştiriyor.`,
      excerpt: 'Next.js 15 yenilikleri, Server Components ve web uygulamalarında performans optimizasyonu üzerine düşüncelerim.'
    },
    {
      id: 'post-5',
      title: 'Yapay Zeka ve Yazılımcının Geleceği',
      url: '#',
      publicationDate: 'Kasım 2025',
      content: `Yapay zeka araçları kod yazmayı kolaylaştırıyor mu, yoksa yazılımcıların yerini mi alacak? Aslında yapay zekayı bir "Junior Asistan" gibi kullanmak verimliliğimizi en üst düzeye çıkarıyor.`,
      excerpt: 'Kodlama sürecimizde AI asistanlarının rolü ve gelecekte bizi ne gibi yeniliklerin beklediğine dair bir bakış.'
    },
    {
      id: 'post-6',
      title: 'Clean Code: Neden Sürdürülebilir Kod Yazmalıyız?',
      url: '#',
      publicationDate: 'Aralık 2025',
      content: `Yazdığımız kod sadece bilgisayarlar için değil, onu sonradan okuyacak olan bizler ve takım arkadaşlarımız içindir. İsimlendirme standartları ve SOLID prensipleri hayat kurtarır.`,
      excerpt: 'Spagetti koddan kurtulmanın yolları, Clean Code prensipleri ve projenizi geleceğe taşımak için yapmanız gerekenler.'
    },
    {
      id: 'post-7',
      title: 'UI/UX Tasarım İlkelerinin Geliştiriciye Sağladığı Avantajlar',
      url: '#',
      publicationDate: 'Ocak 2026',
      content: `Bir uygulamanın sadece "çalışıyor" olması yetmez. Kullanıcının o uygulamayı severek kullanması gerekir. Geliştiricilerin Figma ve tasarım prensipleri bilmesi onları bir adım öne çıkarır.`,
      excerpt: 'Yazılımcı olarak tasarım yeteneklerinizi geliştirmenin kariyerinize olan inanılmaz katkıları.'
    },
    {
      id: 'post-8',
      title: 'Açık Kaynak (Open Source) Projelere Nasıl Katkı Sağlanır?',
      url: '#',
      publicationDate: 'Şubat 2026',
      content: `İlk Pull Request'inizi göndermek her zaman heyecan vericidir. Açık kaynak projelere katkıda bulunmak, global bir ekibin parçası gibi hissetmenizi sağlar ve inanılmaz tecrübe katar.`,
      excerpt: 'Açık kaynak dünyasına giriş rehberi, bir projenin sorunlarını (issues) bulma ve çözüm (PR) üretme yolları.'
    },
    {
      id: 'post-9',
      title: 'State Management Çemberinde React: Redux, Zustand veya Context?',
      url: '#',
      publicationDate: 'Mart 2026',
      content: `React projeleri büyüdükçe durum (state) yönetimi zorlaşır. Peki hangi aracı seçmeliyiz? Küçük projelerde Zustand, büyük ve kompleks yapılarda Redux hayat kurtarıyor.`,
      excerpt: 'React ekosistemindeki State Management araçlarının karşılaştırması ve projeye göre doğru araç seçimi.'
    },
    {
      id: 'post-10',
      title: 'NoSQL Veritabanı Mantığını Anlamak',
      url: '#',
      publicationDate: 'Nisan 2026',
      content: `Geleneksel ilişkisel veritabanlarının (SQL) yanında NoSQL'in (MongoDB, Firestore gibi) sunduğu esneklik, özellikle hızlı geliştirme süreçlerinde (Agile) çok büyük avantaj sağlıyor.`,
      excerpt: 'SQL ve NoSQL farkı nedir? Hangi durumda hangisini kullanmalıyız ve veri modelleme teknikleri nelerdir?'
    },
    {
      id: 'post-11',
      title: 'Kişisel Portfolyo Sitemin Uzay Temalı Gelişim Süreci',
      url: '#',
      publicationDate: 'Mayıs 2026',
      content: `Klasik, düz web sitelerinden sıkıldığım için Three.js kullanarak bu uzay temalı 3D projeyi geliştirdim. Hem teknik anlamda kendimi geliştirdim hem de hayal gücümü koda döktüm.`,
      excerpt: 'Emirin Galaksisi isimli bu portfolyo sitesinin arka planındaki tasarım kararları ve güncellemeler üzerine notlar.'
    }
  ]
};