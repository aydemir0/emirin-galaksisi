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
      url: 'https://link-to-your-blog-post.com/post-1',
      publicationDate: 'Eylül 2025',
     //...
    content: `## Başlangıç\n\nBu projenin ilk adımı... \n\n### Kurulum\n\n- Next.js\n- Three.js`, // <-- SATIR SONUNA BU VİRGÜLÜ EKLE
    excerpt: 'Bu yazıda, sıfırdan başlayarak interaktif bir 3D web deneyimi yaratmanın temel adımlarını ve karşılaştığım zorlukları anlatıyorum.'
    },
    {
      id: 'post-2',
      title: 'Flutter ve Firebase: Güçlü İkili',
      url: 'https://link-to-your-blog-post.com/post-2',
      publicationDate: 'Ağustos 2025',
      excerpt: 'Firebase\'in backend gücünü Flutter\'ın esnek arayüzüyle birleştirerek nasıl hızlı ve ölçeklenebilir mobil uygulamalar geliştirebileceğimizi inceliyoruz.'
    },
    {
      id: 'post-3',
      title: 'Bir Mühendis Adayının Gözünden Stajın Önemi',
      url: 'https://link-to-your-blog-post.com/post-3',
      publicationDate: 'Temmuz 2025',
      excerpt: 'Teorik bilginin pratiğe döküldüğü staj süreçleri, kariyer yolculuğumuzun en kritik adımlarından biridir. Bu süreçteki deneyimlerim ve tavsiyelerim...'
    }
  ]
};