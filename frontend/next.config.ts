import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",  
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
