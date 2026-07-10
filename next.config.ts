import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  // Added your new .42 IP address to the whitelist
  allowedDevOrigins: ['192.168.1.191', '192.168.1.42'],
};

export default nextConfig;
