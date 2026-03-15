import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure we don't use features that break Cloudflare environment
};

export default process.env.NODE_ENV === 'development' 
  ? nextConfig 
  : withPWA(nextConfig);
