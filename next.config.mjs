/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {}, // <-- Agrega esta línea aquí
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      child_process: false,
    };
    return config;
  },
};

export default nextConfig;
