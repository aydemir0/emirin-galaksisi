"use client";

import { createPortal } from "react-dom";

// CloseIcon bileşeni
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ProjeDetaylari = ({ proje, onClose }) => {
  if (!proje) return null;

  return createPortal(
    // DIŞ ÇERÇEVE (Senin ekran görüntüsünde görünen kısım)
    <div 
      className="fixed inset-0 bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* İÇ KART (Senin ekran görüntüsünde eksik olan kısım) */}
      <div 
        className="relative bg-white text-gray-800 rounded-2xl shadow-xl max-w-lg w-full mx-4 p-8 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors">
          <CloseIcon />
        </button>

        <h2 className="text-3xl font-bold mb-4">{proje.name}</h2>
        
        <p className="text-lg mb-6 flex-grow">{proje.description}</p>

        <a 
          href={proje.githubUrl} 
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto bg-gray-800 hover:bg-black text-white font-bold py-3 px-4 rounded-lg text-center transition-colors text-xl"
        >
          GitHub'da Görüntüle
        </a>
      </div>
    </div>,
    document.body
  );
};

export default ProjeDetaylari;