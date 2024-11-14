import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["ec2-13-49-67-34.eu-north-1.compute.amazonaws.com"],
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
