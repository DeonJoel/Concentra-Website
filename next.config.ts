import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  // Added your new .94 IP address to the whitelist
  allowedDevOrigins: ['192.168.1.94'],
};

export default nextConfig;
