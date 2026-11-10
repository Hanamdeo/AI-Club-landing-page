/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  async rewrites() {
    return [
      {
        source: '/favicon.ico',
        destination: '/icon.png',
      },
      {
        source: '/.well-known/appspecific/com.chrome.devtools.json',
        destination: '/api/chrome-devtools',
      },
    ];
  },
};

export default nextConfig;
