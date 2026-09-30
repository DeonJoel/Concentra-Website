import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  // Added your new .94 IP address to the whitelist
  allowedDevOrigins: ['192.168.1.82','192.168.1.81','192.168.0.5'],
};

export default nextConfig;
