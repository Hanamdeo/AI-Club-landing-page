import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'lucide-react$': path.resolve(__dirname, 'node_modules/lucide-react/dist/esm/lucide-react.js'),
    };
    return config;
  },
};

export default nextConfig;
