import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 🚀 Performance Optimizations
  compress: true, // Enable gzip compression

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'], // Modern formats for better compression
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Responsive sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60, // Cache images for 60 seconds minimum
  },

  // Experimental features for better performance
  experimental: {
    // Removed optimizeCss due to critters module dependency issue
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'], // Tree-shake Three.js libraries
  },
};

export default nextConfig;
