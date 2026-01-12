import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Jika ada, coba matikan optimizeCss atau lightningcss
    optimizeCss: false, 
    serverSourceMaps: false,
  },
};

export default nextConfig;