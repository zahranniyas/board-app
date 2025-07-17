import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  webpack(config: any) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    });

    return config;
  },
};

export default nextConfig;
