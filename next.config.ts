import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

/** @type {import('next').NextConfig} */
 
module.exports = {
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/upload',
        permanent: true,  // Make it permanent (301 redirect)
      },
    ];
  },
}

export default nextConfig;
