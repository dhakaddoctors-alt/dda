import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack compatibility: Ensure we don't have an empty turbopack object if wrapped
  // Next.js 15+ might expect specific turbopack keys if present
  output: 'standalone', // Optimized for Cloudflare/Docker
};

export default process.env.NODE_ENV === 'development' 
  ? nextConfig 
  : withPWA(nextConfig);
