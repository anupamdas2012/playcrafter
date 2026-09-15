/** @type {import('next').NextConfig} */
const isPages = process.env.GITHUB_PAGES === "true";
const nextConfig = {
  reactStrictMode: true,
  output: isPages ? "export" : undefined,
  basePath: isPages ? "/playcrafter" : undefined,
  assetPrefix: isPages ? "/playcrafter/" : undefined,
  images: { unoptimized: true },
  trailingSlash: true,
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
