import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  // Added your new .94 IP address to the whitelist
  allowedDevOrigins: ['192.168.1.82','192.168.1.81'],
};

export default nextConfig;
