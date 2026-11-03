import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  // Combined list of all your possible home and office IPs
  allowedDevOrigins: ['192.168.1.82', '192.168.1.81', '192.168.0.5', '192.168.0.6', 'localhost'],
  
  async rewrites() {
    return [
      { source: "/api/:path*", destination: "http://127.0.0.1:8000/api/:path*" },
      { source: "/public_uploads/:path*", destination: "http://127.0.0.1:8000/public_uploads/:path*" }
    ];
  },
};

export default nextConfig;