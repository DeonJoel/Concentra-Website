import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // 1. Proxy all API calls to the FastAPI backend
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:8000/api/:path*", 
      },
      // 2. Proxy all uploaded image requests to the FastAPI backend
      {
        source: "/public_uploads/:path*",
        destination: "http://127.0.0.1:8000/public_uploads/:path*", 
      }
    ];
  },
};

export default nextConfig;
